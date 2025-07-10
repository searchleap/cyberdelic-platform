📄 Product Requirements Document (PRD)

Project Title: Multi-Tenant CMS with LLM Integration
Platform: Next.js with Vercel Platforms Starter Kit
Stakeholder: Paul Owen
Primary Goal: Enable multi-tenant content generation using LLMs via a scalable, brand-aware CMS UI.

⸻

1. 🧭 Objective

Build a multi-tenant CMS platform that integrates large language models (LLMs) to support dynamic, brand-specific content generation. Each tenant can create, manage, and preview content through reusable prompt templates while ensuring data isolation and routing fidelity.

⸻

2. 🧱 Features & Functional Scope

2.1 Tenant-Aware Prompt Templates
	•	Reusable prompt blueprints stored per tenant
	•	Tokens/variables like {{productName}}, {{audience}}, etc.
	•	Editable through an admin UI
	•	Stored in database with schema support

2.2 LLM Content Generator UI
	•	Form-based interface to select template and enter variables
	•	“Generate” button triggers API call to /api/generate-content
	•	Output preview (Markdown or HTML rendered)
	•	Manual post-editing option before saving

2.3 Serverless Function API (/api/generate-content)
	•	Accepts template ID and dynamic values
	•	Fetches and resolves prompt
	•	Calls LLM with tenant context
	•	Returns structured response

2.4 Edge Middleware Tenant Inference
	•	Automatically detects tenantSlug from subdomain or path
	•	Injects tenant context into headers
	•	Accessible across routes and API

2.5 Prompt Template Library
	•	Default templates included for:
	•	SEO metadata
	•	Product descriptions
	•	Blog generation
	•	FAQs
	•	Open Graph tags
	•	Tenant can clone/customize defaults

2.6 Tenant Theming and Branding
	•	Tailwind-compatible theme generator
	•	Tenant metadata used to apply fonts, colors, radius
	•	Used during prompt execution

2.7 Role-Based Access & Moderation (Phase 2)
	•	Admins create/edit templates
	•	Writers can only use them
	•	Moderation queue for AI-generated drafts

2.8 Activity Logs & Rate Limits (Phase 2)
	•	Log usage per tenant and user
	•	Protect system from overuse or abuse

⸻

3. 🧮 Data Models (Simplified)

PromptTemplate

model PromptTemplate {
  id         String   @id @default(cuid())
  tenantId   String
  name       String
  prompt     String
  variables  String[]
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

Tenant (Assumed from Platforms Starter Kit)

model Tenant {
  id         String @id @default(cuid())
  slug       String @unique
  name       String
  brandStyle Json
}


⸻

4. 📐 Technical Architecture
	•	Frontend: Next.js App Router, React Server Components
	•	Middleware: middleware.ts for edge tenant detection
	•	Backend API: /api/generate-content as LLM gateway
	•	Database: Prisma with PostgreSQL for prompt and tenant storage
	•	LLM Provider: OpenAI or similar, via server-side fetch
	•	Deployment: Vercel

⸻

5. 🔒 Security & Isolation
	•	All content generation is scoped by tenantSlug
	•	Templates and generated data stored per tenantId
	•	Middleware ensures all tenant-specific data is sandboxed
	•	Optional: JWT or token-based auth for API calls

⸻

6. 🚧 MVP Deliverables

Day 1 Goals:
	•	Tenant resolution via middleware
	•	Prompt template schema and CRUD
	•	Prompt-driven content generator UI
	•	/api/generate-content endpoint with LLM integration
	•	Basic template library

Future Enhancements:
	•	Prompt versioning
	•	Richer branding model (tone, voice examples)
	•	Content moderation queue
	•	Analytics + generation logs

⸻

7. 🧪 Success Criteria
	•	✅ Each tenant can generate content that reflects their brand tone
	•	✅ Prompt templates are easily editable and reusable
	•	✅ Middleware reliably injects tenant context
	•	✅ Non-technical users can generate usable content in < 2 min
	•	✅ All data is isolated per tenant

⸻

8. ⏳ Timeline (Suggested)
	•	Week 1–2: Prompt UI, API endpoint, middleware routing
	•	Week 3: Prompt template CRUD, theming scaffolds
	•	Week 4: Seed default prompt templates, brand-aware generation
	•	Week 5+: UX polish, logging, moderation, RBAC

⸻

9. 📎 Dependencies
	•	Vercel Platforms Starter Kit (Next.js)
	•	OpenAI API (or provider)
	•	Prisma ORM
	•	Tailwind CSS
	•	Auth (custom or third-party like Clerk/Auth0)

⸻