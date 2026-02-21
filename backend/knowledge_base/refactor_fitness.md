# Refactor Fitness

**Status:** Active Development (v0.1.7)
**Role:** Solo Full-Stack Developer & Product Owner
**Live:** https://d24fd2bsaghv71.cloudfront.net

## What It Is
Refactor Fitness is a cross-platform fitness and nutrition tracking app built for busy professionals who want to incorporate 1-2 short workouts into their day and track nutrition against personalized targets. Nick designed, built, and deployed the entire application — frontend, backend, infrastructure, and CI/CD — as a solo project.

## Why Nick Built It
Nick is a "Quantified Self" enthusiast who manually tracks nutrition and workouts. Existing apps were either too complex (bodybuilder-focused) or too simple (no macro tracking). Refactor Fitness scratches his own itch while serving as a demonstration of his ability to ship a full production application end-to-end using modern cloud-native architecture.

## Key Features
- **Nutrition Logging:** Manual entry, USDA food database search (8,100+ foods), barcode scanning, photo-based logging with S3 storage, saved meals and favorites. Tracks calories, protein, carbs, fat, sugar, sodium, and water.
- **Workout Management:** Strength training with sets/reps/weight tracking, cardio logging (bike, run, walk) with MET-based calorie estimation, workout templates assignable to days of the week, personal record detection with estimated 1RM (Brzycki formula).
- **Fasting Tracking:** Start/end fasts with target duration, real-time elapsed/remaining display.
- **Progress Analytics:** Weight tracking with trend charts, progress photos with tags (front/side/back), personal record history, weekly/monthly macro summaries.
- **Goal System:** Min/max ranges for each macro (not just single targets), BMR calculation, activity-level-adjusted targets, alcohol/drink limits per week.

## Technical Architecture

### Frontend
- **Flutter/Dart** — cross-platform (web, iOS, Android) from a single codebase
- **State Management:** Provider pattern (ChangeNotifier) with 5 domain providers
- **Offline-First:** Hive (NoSQL) for local storage with 11 typed data boxes. All writes go to local first, then sync to cloud asynchronously. The UI is never blocked by network calls.
- **Sync Engine:** Background SyncService with exponential backoff retry (30s → 1m → 2m → 5m, max 5 attempts), conflict resolution via last-write-wins with timestamps.

### Backend
- **8 AWS Lambda functions** (Node.js 20.x / TypeScript) handling auth, users, nutrition, workouts, templates, food search, progress, and fasting
- **API Gateway HTTP API v2** with JWT authorization via Cognito
- **DynamoDB single-table design** (on-demand billing) — all user data in one table with composite PK/SK keys (`USER#{userId}` / `{EntityType}#{date}#{id}`)
- **S3** for photo storage with presigned URLs (15-minute expiry for security)
- **Cognito** for authentication using SRP protocol (password never transmitted over the network)
- **CloudFront CDN** for web app delivery and APK downloads

### Infrastructure
- **Terraform** for all AWS infrastructure as code (modular: cognito, dynamodb, s3-hosting, s3-storage, lambda, api-gateway)
- **Automated deployment scripts:** single command deploys APK + web + Lambda + git tag
- **Security:** Encrypted token storage per platform (Keychain on iOS, EncryptedSharedPreferences on Android, in-memory only on web to prevent XSS), CORS restricted to CloudFront domain, sanitized error messages, least-privilege IAM roles

## Architecture Decisions & Trade-offs
- **Offline-first over cloud-first:** Users get instant UI response. Cloud sync is background. This adds complexity (sync status tracking, conflict resolution) but dramatically improves UX.
- **Single-table DynamoDB over relational DB:** Eliminates join overhead, enables single-digit-ms reads, and costs near-zero at low scale. Trade-off: query patterns must be designed upfront.
- **Flutter over React Native:** Dart's strong typing and Flutter's widget composition model made solo development faster. Web performance is acceptable for a data-entry app.
- **Hive over SQLite:** Hive's type-safe adapters with code generation reduce boilerplate. Trade-off: no relational queries, but the app's access patterns are all key-value.
- **SRP authentication:** Password never leaves the device — more secure than standard username/password flows.

## What This Project Demonstrates About Nick
- **Full-stack execution:** Designed and shipped frontend (Flutter/Dart), backend (TypeScript/Lambda), infrastructure (Terraform), and CI/CD — solo.
- **Product thinking:** Built for a real user need, not just a tech demo. Features like min/max macro ranges, saved meals, and workout templates reflect actual fitness tracking experience.
- **Cloud-native architecture:** Production-grade AWS deployment with proper auth, offline sync, CDN, IaC, and security hardening.
- **Iterative delivery:** 7 releases to date, each addressing real user feedback (security audit, legal compliance, UX improvements).
- **Cost discipline:** Total infrastructure cost is ~$15-25/month for a full production app with auth, storage, CDN, and 8 Lambda functions.

## Current Status & Roadmap
- **Deployed:** Web app live, Android APK available for download
- **Recent (v0.1.7):** Legal compliance — privacy policy, terms of service, health disclaimer, age gate, account deletion
- **Next:** Paywall/subscription system, comprehensive CI/CD pipeline, monitoring dashboards, advanced analytics
