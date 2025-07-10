LLM Rules for Multi-Tenant CMS with Next.js & Vercel Platforms Starter Kit

This rules document provides foundational LLM strategies and system architecture for building a multi-tenant content management system using Next.js and the Vercel Platforms Starter Kit. It ensures that all content generation, routing, theming, and data isolation operate within a scalable, secure, and tenant-aware model.

⸻

🧩 Prompt Engineering Templates Inside the CMS

Overview

Prompt engineering templates are reusable prompt blueprints stored per tenant and used to enable brand-consistent, scalable, and user-friendly content generation.

Capabilities
	•	Generate tenant-specific content (e.g., product copy, SEO, blog posts)
	•	Power no-code UI tools for non-technical content creators
	•	Enable automation for repetitive content tasks
	•	Provide consistent tone and structure for all generated content

Template Structure

{
  "title": "Product Description Generator",
  "prompt": "Write a product description for '{{productName}}' in the tone of {{tenantBrandTone}}. Focus on {{featureHighlights}} and appeal to {{targetAudience}}."
}

Integration Workflow
	•	Users select or input key data into form fields
	•	Serverless function /api/generate-content receives template ID and variables
	•	Template is resolved and executed in the context of the active tenant

Schema (Example using Prisma)

model PromptTemplate {
  id         String   @id @default(cuid())
  tenantId   String
  name       String
  prompt     String
  variables  String[]
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

LLM UI Use Case

<Form onSubmit={handleGenerate}>
  <Select name="template" options={availableTemplates} />
  <Input name="productName" />
  <Input name="targetAudience" />
  <Button type="submit">Generate</Button>
</Form>

Guardrails
	•	Prompt previews and moderation workflows
	•	Per-tenant storage and isolation
	•	Usage monitoring and rate limiting

⸻

🛠 Tenant-Aware Content Generation Rules

Rule 1: Contextual Generation

Every LLM call must receive a tenantSlug or tenantId for context.

Prompt Example

Generate a blog post about '{{topic}}' for the tenant '{{tenantSlug}}' using their brand tone and product voice.

Rule 2: Theming by Tenant

Dynamically apply themes based on tenant metadata.

Prompt Example

Create a Tailwind-compatible theme file using {{primaryColor}}, {{fontFamily}}, and {{borderRadius}} for tenant '{{tenantSlug}}'.


⸻

🔐 Data Isolation and Privacy

Rule

All content and interactions must be scoped by tenantId in database and API requests.

⸻

📈 SEO and Metadata Generation

Rule

SEO tags and descriptions must reflect the unique voice and target keywords of each tenant.

Prompt Example

Generate Open Graph meta tags for a service page targeting '{{seoKeyword}}' for tenant '{{tenantSlug}}'.


⸻

🌐 Serverless Function Handler: /api/generate-content

This API route processes LLM generation requests based on a template and tenant context.

Input Example

{
  "tenantSlug": "my-brand",
  "templateId": "product-desc-2024",
  "variables": {
    "productName": "Calming Tea",
    "targetAudience": "Wellness-focused millennials"
  }
}

Behavior
	1.	Resolves tenantId using slug
	2.	Loads the tenant’s template
	3.	Substitutes input variables into the prompt
	4.	Calls OpenAI (or other provider) with prompt and system message
	5.	Returns structured result (Markdown, HTML, JSON, etc.)

Security
	•	Verify tenant ownership of template
	•	Rate limit by tenant or user token

⸻

🌍 Edge Middleware Routing with Tenant Inference

Purpose

Detect the tenant based on domain or path and inject tenant context globally.

Example (in middleware.ts)

import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host')
  const subdomain = hostname?.split('.')[0]

  const res = NextResponse.next()
  res.headers.set('x-tenant-slug', subdomain || 'default')
  return res
}

Use in App

Access tenant context inside server components or API routes via headers:

const tenantSlug = req.headers.get('x-tenant-slug')