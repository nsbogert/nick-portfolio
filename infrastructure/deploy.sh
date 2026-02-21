#!/bin/bash
set -euo pipefail

# Nick Portfolio - Build & Deploy Script
# Usage: ./deploy.sh [--skip-frontend] [--skip-backend]

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
FRONTEND_DIR="$PROJECT_DIR/frontend"
INFRA_DIR="$SCRIPT_DIR"

SKIP_FRONTEND=false
SKIP_BACKEND=false

for arg in "$@"; do
  case $arg in
    --skip-frontend) SKIP_FRONTEND=true ;;
    --skip-backend) SKIP_BACKEND=true ;;
  esac
done

# ---- Copy knowledge base files to Lambda package ----
echo "📦 Copying knowledge base to Lambda..."
mkdir -p "$PROJECT_DIR/backend/chat/knowledge_base"
cp "$PROJECT_DIR/backend/knowledge_base/"*.md "$PROJECT_DIR/backend/chat/knowledge_base/"
# Explicitly exclude network_map.md
rm -f "$PROJECT_DIR/backend/chat/knowledge_base/network_map.md"

# ---- Build & Deploy Backend ----
if [ "$SKIP_BACKEND" = false ]; then
  echo "🔧 Building and deploying SAM stack..."
  cd "$INFRA_DIR"
  sam build --template template.yaml
  sam deploy
fi

# ---- Get stack outputs ----
echo "📋 Getting stack outputs..."
STACK_NAME="nick-portfolio"
BUCKET=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='SiteBucketName'].OutputValue" --output text)
CF_DOMAIN=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='CloudFrontURL'].OutputValue" --output text)
CF_DIST_ID=$(aws cloudfront list-distributions \
  --query "DistributionList.Items[?Comment=='Nick Bogert Portfolio'].Id" --output text)

echo "  Bucket: $BUCKET"
echo "  URL: $CF_DOMAIN"

# ---- Build & Deploy Frontend ----
if [ "$SKIP_FRONTEND" = false ]; then
  echo "🏗️  Building frontend..."
  cd "$FRONTEND_DIR"

  # Get API URL for the frontend
  API_URL=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" \
    --query "Stacks[0].Outputs[?OutputKey=='ApiEndpoint'].OutputValue" --output text)

  VITE_API_URL="" npm run build

  echo "☁️  Syncing to S3..."
  aws s3 sync dist/ "s3://$BUCKET/" --delete

  echo "🔄 Invalidating CloudFront cache..."
  aws cloudfront create-invalidation --distribution-id "$CF_DIST_ID" --paths "/*" > /dev/null

  echo ""
  echo "✅ Deployment complete!"
  echo "   $CF_DOMAIN"
fi
