// app/blog/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/posts';

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ChevronRightIcon } from 'lucide-react';

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="font-serif max-w-3xl mx-auto p-6 sm:p-8 relative">
      {/* Bolt Logo */}
      <div className="fixed top-6 right-6 z-50">
        <Link 
          href="https://bolt.new" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 group"
        >
          <Image
            src="/white_circle_360x360.png"
            alt="Powered by Bolt"
            width={48}
            height={48}
            className="rounded-full group-hover:animate-spin transition-transform duration-200"
            style={{ animationDuration: '2s' }}
          />
        </Link>
      </div>

      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Undictify Blog
        </h1>
        <Separator className="mt-4" />
      </header>

      <ul className="space-y-8">
        {posts.map(({ slug, frontmatter }) => (
          <li key={slug}>
            <Card className="hover:shadow-lg rounded-3xl transition-shadow duration-300 dark:bg-neutral-950">
              <CardHeader>
                <CardTitle>
                  <Link
                    href={`/blog/${slug}`}
                    className="text-lg sm:text-xl font-semibold text-zinc-300 hover:underline focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded"
                  >
                    {frontmatter.title}
                  </Link>
                </CardTitle>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <CalendarIcon className="w-4 h-4" aria-hidden="true" />
                  <time dateTime={frontmatter.date}>{frontmatter.date}</time>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-gray-700 dark:text-gray-300 line-clamp-3">
                  {frontmatter.summary}
                </CardDescription>
              </CardContent>

              <CardFooter className="pt-0">
                <Link 
                  href={`/blog/${slug}`}
                  className="gap-1"
                  aria-label={`Read full post: ${frontmatter.title}`}
                >
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                  >
                    <span>
                      Read more
                      <ChevronRightIcon className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}