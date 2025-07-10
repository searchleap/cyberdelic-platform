# Cyberdelic Platform

Multi-tenant CMS platform with LLM integration for brand-specific content generation.

## 🎯 Overview

The Cyberdelic Platform enables multi-tenant content generation using large language models (LLMs) through a scalable, brand-aware CMS interface. Each tenant can create, manage, and generate content using reusable prompt templates while ensuring complete data isolation and routing fidelity.

**Built with**: Next.js + Vercel Platforms Starter Kit + Prisma + OpenAI

## ✨ Key Features

- 🏢 **Multi-tenant Architecture**: Complete isolation with subdomain-based routing
- 🤖 **LLM Content Generation**: Brand-aware content creation via prompt templates
- 🎨 **Dynamic Theming**: Tenant-specific branding and visual identity
- 📝 **Template Management**: Reusable prompt blueprints with variable substitution
- 🔒 **Secure & Isolated**: Per-tenant data scoping and access control
- 📊 **Usage Analytics**: Monitoring and rate limiting per tenant

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/searchleap/cyberdelic-platform.git
cd cyberdelic-platform

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Configure your database and API keys

# Setup database
npx prisma db push
npx prisma db seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the platform in action.

## 📋 Project Status

**Current Phase**: Foundation & Infrastructure (Epic 1)

### ✅ Completed
- Project architecture and implementation roadmap
- Detailed task breakdown for Epic 1
- GitHub repository setup with comprehensive documentation

### 🚧 In Progress
- Next.js project initialization with Vercel Platforms Starter Kit
- Database schema design with Prisma ORM
- Edge middleware for tenant detection and routing

### 📅 Upcoming
- LLM integration gateway for content generation
- Prompt template management system
- Content generation UI with React components

## 🏗️ Architecture

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│   Edge Middleware   │────│  Tenant Resolution  │────│    Route Handler    │
│   (middleware.ts)   │    │      Layer          │    │                     │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
           │                          │                          │
           ▼                          ▼                          ▼
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│  Template Engine    │────│   LLM Gateway API   │────│   Content Gen UI    │
│  (CRUD + Variables) │    │ (/api/generate)     │    │   (React Forms)     │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
           │                          │                          │
           ▼                          ▼                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Database Layer (Prisma + PostgreSQL)              │
│   - Tenants    - PromptTemplates    - GeneratedContent    - UsageLogs       │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 📚 Documentation

### 📁 Core Documents
- [**Implementation Roadmap**](./docs/progress/project_architecture_plan.md) - Complete project plan with 7 epics
- [**Epic 1 Tasks**](./docs/progress/epic_1_foundation_tasks.md) - Detailed foundation task breakdown
- [**Product Requirements**](./README.md) - Original PRD and feature specifications
- [**LLM Rules**](./.memex/rules.md) - Architectural principles and LLM integration rules

### 🔄 Development Progress
- [**Changelog**](./CHANGELOG.md) - Time-ordered progress tracking
- [**Documentation Index**](./docs/README.md) - Complete documentation structure

## 🛠️ Tech Stack

**Frontend**
- Next.js 14+ (App Router)
- React Server Components
- Tailwind CSS
- TypeScript

**Backend** 
- Serverless API routes
- Edge middleware for tenant routing
- Prisma ORM with PostgreSQL
- OpenAI API integration

**Infrastructure**
- Vercel hosting and deployment
- Vercel PostgreSQL database
- GitHub for version control
- Playwright for E2E testing

## 🎯 Success Criteria

- ✅ Each tenant generates content reflecting their brand tone
- ✅ Prompt templates are easily editable and reusable
- ✅ Non-technical users can generate content in < 2 minutes
- ✅ Complete data isolation between tenants
- ✅ System handles multiple concurrent tenants
- ✅ Content generation API responds within 10 seconds

## 🔗 Related Links

- **Repository**: https://github.com/searchleap/cyberdelic-platform
- **Issues & Tasks**: [GitHub Issues](https://github.com/searchleap/cyberdelic-platform/issues)
- **Documentation**: [/docs](./docs/)
- **Changelog**: [CHANGELOG.md](./CHANGELOG.md)

## 🤝 Contributing

This project follows a structured development approach:

1. **Plan first, code second** - Generate implementation roadmaps before coding
2. **Atomic commits** - Commit after each logically complete step
3. **Conventional commits** - Use `feat:`, `fix:`, `docs:` format
4. **Quality gates** - 80%+ test coverage, linting, and type safety

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Built with [Memex](https://memex.tech)** - AI-powered development assistant