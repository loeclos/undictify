// app/blog/[slug]/page.tsx
import { getPostContent, getPostSlugs } from '@/lib/posts';
import BoltLogo from '@/components/bolt-logo';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { CalendarDays } from 'lucide-react';
import { format } from 'date-fns';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostSlugs().map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await getPostContent(slug);
  return {
    title: frontmatter?.title || 'Blog Post',
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const { htmlContent, frontmatter } = await getPostContent(slug);

  if (!frontmatter) return notFound();

  return (
    <main className="font-serif flex justify-center px-4 py-12 relative">
      <BoltLogo />
      <article className="w-full max-w-3xl space-y-6">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {frontmatter.title}
          </h1>
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={frontmatter.date}>
              {format(new Date(frontmatter.date), 'MMMM d, yyyy')}
            </time>
          </div>
        </header>

        <Separator />

        {/* Content */}
        <div
          className="prose prose-gray dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-primary prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </main>
  );
}