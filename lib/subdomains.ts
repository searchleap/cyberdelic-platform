// Tenant/Subdomain utilities - will be enhanced with Prisma in Task 1.2

export function isValidIcon(str: string) {
  if (str.length > 10) {
    return false;
  }

  try {
    // Primary validation: Check if the string contains at least one emoji character
    // This regex pattern matches most emoji Unicode ranges
    const emojiPattern = /[\p{Emoji}]/u;
    if (emojiPattern.test(str)) {
      return true;
    }
  } catch (error) {
    // If the regex fails (e.g., in environments that don't support Unicode property escapes),
    // fall back to a simpler validation
    console.warn(
      'Emoji regex validation failed, using fallback validation',
      error
    );
  }

  // Fallback validation: Check if the string is within a reasonable length
  // This is less secure but better than no validation
  return str.length >= 1 && str.length <= 10;
}

export function isValidSubdomain(subdomain: string): boolean {
  // Basic subdomain validation
  const pattern = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;
  return pattern.test(subdomain.toLowerCase());
}

export function sanitizeSubdomain(subdomain: string): string {
  return subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
}

// Placeholder types - will be replaced with Prisma types in Task 1.2
type TenantData = {
  id: string;
  slug: string;
  name: string;
  emoji?: string;
  createdAt: Date;
};

// Placeholder functions - will be replaced with Prisma queries in Task 1.2
export async function getTenantBySlug(slug: string): Promise<TenantData | null> {
  // This will be replaced with Prisma query in Task 1.2
  // Example: return prisma.tenant.findUnique({ where: { slug } })
  return null;
}

export async function getAllTenants(): Promise<TenantData[]> {
  // This will be replaced with Prisma query in Task 1.2
  // Example: return prisma.tenant.findMany()
  return [];
}
