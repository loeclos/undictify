// app/blog/page.tsx
import Link from 'next/link';
import BoltLogo from '@/components/bolt-logo';
import { getAllPosts } from '@/lib/posts';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ChevronRightIcon } from 'lucide-react';

export default function BlogIndexPage() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
            </div>
            <main className="font-serif max-w-3xl mx-auto p-6 sm:p-8 relative">
                <BoltLogo />
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Undictify Blog
                    </h1>
                    <Separator className="mt-4" />
                </header>

                <ul className="space-y-8">
                    {posts.map(({ slug, frontmatter }) => (
                        <li key={slug}>
                            <Card className="hover:shadow-lg rounded-3xl transition-shadow duration-300 dark:bg-neutral-950/30 backdrop-blur-2xl">
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
                                        <CalendarIcon
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                        />
                                        <time dateTime={frontmatter.date}>
                                            {frontmatter.date}
                                        </time>
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
                                                <ChevronRightIcon
                                                    className="w-4 h-4"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
