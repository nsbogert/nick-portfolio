# Guardrail WA

**Status:** Concept / Idea Phase
**Founder:** Nick Bogert
**Focus:** B2B AI Compliance & Regulatory Risk Mitigation

## Mission
To provide a "Universal Compliance Layer" for businesses deploying AI, ensuring they meet the highest regulatory bars (starting with the 2026 Washington State AI laws) through active technical enforcement rather than just paperwork.

## The Problem
As of early 2026, Washington State has enacted some of the strictest AI regulations in the US (e.g., MHMDA). Businesses face high litigation exposure ($25,000+ per interaction) for non-compliance, particularly regarding:
- Consumer Health Data privacy.
- Mandatory 3-hour disclosure requirements.
- Standalone "Clear Affirmative Act" consent.

## The Solution: Compliance-as-a-Service (CaaS)
A high-leverage "Regulatory Wrapper" or proxy that sits between a company's internal applications and LLM providers (OpenAI, Anthropic, etc.).

### Key Features
- **Real-time MHMDA Scrubber:** Python/Java logic to identify and redact health-related keywords or PII before data reaches the LLM.
- **Standalone Disclosure UI:** A drop-in UI component (Flutter) that ensures "Clear Affirmative Act" compliance without bundling consent into generic Terms of Service.
- **Audit-as-a-Service:** Automated, high-fidelity audit logs stored in DynamoDB, providing a "Legal Guarantee" and "Audit Certificate" for the General Counsel.
- **Highest Bar Logic:** A single platform that complies with the strictest known laws, ensuring universal compliance across less-regulated regions.

## Business Model
- **Target Audience:** General Counsel, CEOs, and Operations Leads (selling to the risk-mitigators, not just the engineers).
- **Pricing:** Credit-based / Value-based billing.
- **Markup Strategy:** 3x-5x markup on LLM token costs to cover compute, scrubbing, and cyber liability insurance.
- **Go-to-Market:** "Geographic Specialist" strategy, focusing on Seattle first with "Local Lawyer" endorsements to build a trust moat.

## Proposed Architecture (AWS)
- **Frontend Dashboard:** Flutter/Dart for real-time scrubbing logs and telemetry.
- **API Layer:** AWS API Gateway + Lambda (Python/Java) for the proxy logic.
- **Security:** AWS Secrets Manager for secure client API key storage.
- **Persistence:** 
  - **DynamoDB:** Telemetry ledger and audit logs.
  - **S3:** Long-term archival of compliance certificates.
- **Processing:** Lightweight NLP or Regex for real-time scrubbing.

## Strategic Positioning
- **Platform Risk Mitigation:** Unlike giants (OpenAI) who may have conflicting global requirements, Guardrail WA is a specialized, local expert that can move faster and provide specific legal guarantees.
- **Audit Moat:** While companies like Cloudflare provide general security, Guardrail WA provides the specific "Audit Trail" required by legal teams to avoid state fines.
