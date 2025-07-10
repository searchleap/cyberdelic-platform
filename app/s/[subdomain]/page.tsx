import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTenantBySlug } from '@/lib/subdomains';
import { protocol, rootDomain } from '@/lib/utils';

export async function generateMetadata({
  params
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const tenantData = await getTenantBySlug(subdomain);

  if (!tenantData) {
    return {
      title: rootDomain
    };
  }

  return {
    title: `${tenantData.name} | ${rootDomain}`,
    description: `Tenant page for ${tenantData.name}`
  };
}

export default async function TenantPage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const tenantData = await getTenantBySlug(subdomain);

  if (!tenantData) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="absolute top-4 right-4">
        <Link
          href={`${protocol}://${rootDomain}`}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {rootDomain}
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-9xl mb-6">{tenantData.emoji || '🏢'}</div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome to {tenantData.name}
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Your multi-tenant CMS platform
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Tenant: <code className="bg-gray-100 px-2 py-1 rounded">{tenantData.slug}</code>
          </div>
          
          {/* Placeholder for future CMS features */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
              <p className="text-gray-600 mb-4">
                This tenant page will soon feature:
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-600">
                <li>• AI-powered content generation</li>
                <li>• Custom prompt templates</li>
                <li>• Brand-specific theming</li>
                <li>• Content management dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
