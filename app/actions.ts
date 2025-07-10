'use server';

import { isValidIcon, isValidSubdomain, sanitizeSubdomain } from '@/lib/subdomains';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { rootDomain, protocol } from '@/lib/utils';

// Placeholder for tenant creation - will be enhanced with Prisma in Task 1.2
export async function createTenantAction(
  prevState: any,
  formData: FormData
) {
  const subdomain = formData.get('subdomain') as string;
  const icon = formData.get('icon') as string;
  const name = formData.get('name') as string || subdomain;

  if (!subdomain || !icon) {
    return { success: false, error: 'Subdomain and icon are required' };
  }

  if (!isValidIcon(icon)) {
    return {
      subdomain,
      icon,
      success: false,
      error: 'Please enter a valid emoji (maximum 10 characters)'
    };
  }

  if (!isValidSubdomain(subdomain)) {
    return {
      subdomain,
      icon,
      success: false,
      error:
        'Subdomain can only have lowercase letters, numbers, and hyphens. Please try again.'
    };
  }

  const sanitizedSubdomain = sanitizeSubdomain(subdomain);

  // This will be replaced with Prisma query in Task 1.2
  // const existingTenant = await prisma.tenant.findUnique({ where: { slug: sanitizedSubdomain } })
  // if (existingTenant) { ... }

  // Placeholder - will create tenant with Prisma in Task 1.2
  console.log('Creating tenant:', { slug: sanitizedSubdomain, name, icon });

  // For now, redirect to demonstrate routing works
  redirect(`${protocol}://${sanitizedSubdomain}.${rootDomain}`);
}

// Placeholder for tenant deletion - will be enhanced with Prisma in Task 1.2
export async function deleteTenantAction(
  prevState: any,
  formData: FormData
) {
  const subdomain = formData.get('subdomain');
  
  // This will be replaced with Prisma query in Task 1.2
  // await prisma.tenant.delete({ where: { slug: subdomain } })
  
  console.log('Deleting tenant:', subdomain);
  revalidatePath('/admin');
  return { success: 'Tenant deleted successfully' };
}
