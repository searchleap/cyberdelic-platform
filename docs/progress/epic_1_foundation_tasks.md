# Epic 1: Foundation & Infrastructure - Detailed Task Breakdown

## 🎯 Epic Goal
Establish project foundation with tenant-aware routing and database schemas

## 📋 Task List

### Task 1.1: Initialize Next.js Project with Vercel Platforms Starter Kit
**Priority**: P0 (Blocking)
**Estimated Time**: 2-3 hours
**Dependencies**: None

#### Subtasks:
1. **1.1.1**: Clone/fork Vercel Platforms Starter Kit
   - Research latest version of the starter kit
   - Fork the repository or download the template
   - Review the existing structure and features

2. **1.1.2**: Adapt starter kit for CMS requirements
   - Remove unnecessary demo components
   - Preserve multi-tenant routing infrastructure
   - Update package.json with project-specific details

3. **1.1.3**: Setup development environment
   - Install dependencies with `uv` package manager
   - Configure TypeScript settings
   - Setup ESLint and Prettier configurations
   - Create .env.local template

4. **1.1.4**: Initialize Git repository and connect to GitHub
   - Initialize local git repository
   - Connect to remote GitHub repository
   - Setup branch protection rules
   - Create initial commit

**Acceptance Criteria**:
- [x] Next.js project boots successfully in development
- [x] TypeScript compilation works without errors
- [x] Basic multi-tenant routing is functional
- [x] Git repository is connected and synced

**Test Hooks**:
```bash
# Verify development server starts
npm run dev

# Verify TypeScript compilation
npm run build

# Verify linting passes
npm run lint
```

---

### Task 1.2: Setup Database Schemas with Prisma
**Priority**: P0 (Blocking)
**Estimated Time**: 3-4 hours
**Dependencies**: Task 1.1

#### Subtasks:
1. **1.2.1**: Install and configure Prisma
   - Install Prisma CLI and client
   - Initialize Prisma configuration
   - Setup PostgreSQL connection string
   - Configure database URL for development and production

2. **1.2.2**: Design core database schema
   - Create Tenant model (extends existing if present)
   - Create PromptTemplate model
   - Create GeneratedContent model
   - Create UsageLog model for tracking
   - Define relationships and constraints

3. **1.2.3**: Create and run initial migration
   - Generate first migration file
   - Run migration against development database
   - Verify schema creation
   - Generate Prisma client

4. **1.2.4**: Setup database seeding
   - Create seed script for development data
   - Add sample tenants and templates
   - Document seeding process

**Schema Definition**:
```prisma
// prisma/schema.prisma

model Tenant {
  id           String @id @default(cuid())
  slug         String @unique
  name         String
  description  String?
  brandStyle   Json?  // Colors, fonts, tone
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  // Relations
  promptTemplates PromptTemplate[]
  generatedContent GeneratedContent[]
  usageLogs       UsageLog[]
}

model PromptTemplate {
  id          String   @id @default(cuid())
  tenantId    String
  name        String
  description String?
  prompt      String   // Template with variables like {{productName}}
  variables   String[] // List of variable names
  category    String?  // e.g., "product", "seo", "blog"
  isDefault   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  tenant              Tenant @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  generatedContent    GeneratedContent[]
}

model GeneratedContent {
  id               String @id @default(cuid())
  tenantId         String
  templateId       String
  variables        Json   // Input variables used
  prompt           String // Resolved prompt sent to LLM
  content          String // Generated content
  status           String @default("draft") // draft, published, archived
  metadata         Json?  // Additional metadata
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  
  // Relations
  tenant           Tenant @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  template         PromptTemplate @relation(fields: [templateId], references: [id])
}

model UsageLog {
  id           String @id @default(cuid())
  tenantId     String
  action       String // "generate", "template_create", etc.
  details      Json?
  createdAt    DateTime @default(now())
  
  // Relations
  tenant       Tenant @relation(fields: [tenantId], references: [id], onDelete: Cascade)
}
```

**Acceptance Criteria**:
- [x] Prisma is configured and connected to PostgreSQL
- [x] All models are created with proper relationships
- [x] Migration runs successfully
- [x] Prisma client generates without errors
- [x] Seed data populates correctly

**Test Hooks**:
```bash
# Verify Prisma client generation
npx prisma generate

# Verify database connection
npx prisma db push

# Run seed script
npx prisma db seed

# Test basic queries
npm run test:db
```

---

### Task 1.3: Implement Edge Middleware for Tenant Detection
**Priority**: P0 (Blocking)
**Estimated Time**: 2-3 hours
**Dependencies**: Task 1.1

#### Subtasks:
1. **1.3.1**: Create middleware.ts file
   - Setup Next.js 13+ middleware structure
   - Implement hostname parsing logic
   - Handle subdomain extraction
   - Add fallback for localhost development

2. **1.3.2**: Implement tenant resolution logic
   - Extract tenant slug from subdomain
   - Handle custom domains (future-proofing)
   - Add default tenant handling
   - Inject tenant context into headers

3. **1.3.3**: Add middleware configuration
   - Define routes that should use middleware
   - Exclude API routes that don't need tenant context
   - Configure matcher patterns

4. **1.3.4**: Handle edge cases and error scenarios
   - Invalid subdomains
   - Non-existent tenants
   - Localhost development patterns
   - Redirect logic for missing tenants

**Implementation**:
```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host')
  
  // Extract tenant slug from subdomain
  const tenantSlug = extractTenantSlug(hostname)
  
  // Clone the URL and add tenant info
  const response = NextResponse.next()
  
  // Inject tenant context into headers
  response.headers.set('x-tenant-slug', tenantSlug)
  response.headers.set('x-tenant-hostname', hostname || '')
  
  return response
}

function extractTenantSlug(hostname: string | null): string {
  if (!hostname) return 'default'
  
  // Handle localhost development
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return 'default'
  }
  
  // Extract subdomain (e.g., 'acme' from 'acme.myplatform.com')
  const parts = hostname.split('.')
  if (parts.length > 2) {
    return parts[0]
  }
  
  return 'default'
}

export const config = {
  matcher: [
    '/((?!api/|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

**Acceptance Criteria**:
- [x] Middleware correctly extracts tenant slug from subdomain
- [x] Tenant context is available in headers throughout app
- [x] Localhost development works with default tenant
- [x] Invalid hostnames are handled gracefully

**Test Hooks**:
```bash
# Test middleware with different hostnames
curl -H "Host: acme.localhost:3000" http://localhost:3000
curl -H "Host: demo.localhost:3000" http://localhost:3000

# Check headers in browser dev tools
# Verify x-tenant-slug header is present
```

---

### Task 1.4: Create Tenant Resolution Utilities
**Priority**: P1 (High)
**Estimated Time**: 2 hours
**Dependencies**: Task 1.2, Task 1.3

#### Subtasks:
1. **1.4.1**: Create tenant context utilities
   - Server-side tenant resolution from headers
   - Client-side tenant context provider
   - Utility functions for tenant-scoped queries

2. **1.4.2**: Implement tenant validation
   - Check if tenant exists in database
   - Handle non-existent tenants
   - Create default tenant if needed

3. **1.4.3**: Create tenant-scoped database helpers
   - Wrapper functions for Prisma queries
   - Automatic tenant ID injection
   - Type-safe tenant scoping

4. **1.4.4**: Add tenant metadata helpers
   - Get tenant branding information
   - Access tenant configuration
   - Theme generation utilities

**Implementation**:
```typescript
// lib/tenant.ts
import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function getCurrentTenant() {
  const headersList = headers()
  const tenantSlug = headersList.get('x-tenant-slug') || 'default'
  
  const tenant = await prisma.tenant.findUnique({
    where: { slug: tenantSlug }
  })
  
  if (!tenant) {
    throw new Error(`Tenant not found: ${tenantSlug}`)
  }
  
  return tenant
}

export async function getTenantTemplates(tenantId: string) {
  return prisma.promptTemplate.findMany({
    where: { tenantId }
  })
}

export function createTenantScopedQuery<T>(
  tenantId: string,
  baseQuery: any
): T {
  return {
    ...baseQuery,
    where: {
      ...baseQuery.where,
      tenantId
    }
  }
}
```

**Acceptance Criteria**:
- [x] Server components can resolve current tenant
- [x] Database queries are automatically tenant-scoped
- [x] Tenant validation works correctly
- [x] Utility functions handle edge cases

**Test Hooks**:
```typescript
// Test tenant resolution
const tenant = await getCurrentTenant()
expect(tenant.slug).toBe('expected-slug')

// Test tenant-scoped queries
const templates = await getTenantTemplates(tenant.id)
expect(templates.every(t => t.tenantId === tenant.id)).toBe(true)
```

---

## 🚀 Epic 1 Completion Criteria

- [x] Next.js development environment is fully functional
- [x] Database schema is designed and deployed
- [x] Tenant detection via middleware is working
- [x] Tenant resolution utilities are implemented and tested
- [x] All code is committed to GitHub with proper documentation
- [x] Basic multi-tenant routing demonstrates tenant isolation

## 📈 Success Metrics for Epic 1

1. **Development Setup Time**: < 30 minutes for new developers
2. **Middleware Performance**: < 5ms overhead per request
3. **Database Query Efficiency**: All queries properly scoped by tenant
4. **Code Coverage**: > 80% for utility functions

## 🔄 Next Steps

After Epic 1 completion:
1. Begin Epic 2: Prompt Template System
2. Create template CRUD operations
3. Implement variable substitution engine
4. Build default template library

---

**Created**: 2025-07-10
**Epic**: Foundation & Infrastructure
**Phase**: MVP Core (Week 1-3)