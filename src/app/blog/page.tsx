'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Clock, Calendar, Tag, Grid3X3, List, LayoutGrid } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/app/(components)/navbar/navbar';
import Footer from '@/app/(components)/footer/footer';
import Image from 'next/image';

const navItems = [
    { id: 'home', text: 'Home', url: '/' },
    { id: 'blog', text: 'Blog', url: '/blog' },
    { id: 'dashboard', text: 'Dashboard', url: '/dashboard' },
];

// Mock blog data without author information
const mockPosts = [
    {
        id: 1,
        title: "Breaking Free from Digital Addiction: A Modern Approach",
        excerpt: "Discover how to reclaim your time and attention in an increasingly connected world. Learn practical strategies for digital wellness.",
        publishedAt: "2025-01-15",
        readingTime: "8 min read",
        category: "Digital Wellness",
        tags: ["mindfulness", "productivity", "wellness"],
        image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2"
    },
    {
        id: 2,
        title: "The Psychology Behind Social Media Scrolling",
        excerpt: "Understanding the mechanisms that keep us hooked to our devices and how to break free from endless scrolling patterns.",
        publishedAt: "2025-01-12",
        readingTime: "12 min read",
        category: "Psychology",
        tags: ["psychology", "social media", "behavior"],
        image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2"
    },
    {
        id: 3,
        title: "Building Healthy Digital Habits",
        excerpt: "Practical tips and techniques for creating sustainable digital habits that support your well-being and productivity.",
        publishedAt: "2025-01-10",
        readingTime: "6 min read",
        category: "Lifestyle",
        tags: ["habits", "productivity", "wellness"],
        image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2"
    },
    {
        id: 4,
        title: "Mindful Technology Use in the Modern Age",
        excerpt: "How to maintain a healthy relationship with technology while staying connected and productive in today's digital world.",
        publishedAt: "2025-01-08",
        readingTime: "10 min read",
        category: "Mindfulness",
        tags: ["mindfulness", "technology", "balance"],
        image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2"
    },
    {
        id: 5,
        title: "The Science of Digital Detox",
        excerpt: "Research-backed insights into the benefits of taking breaks from digital devices and how to implement effective detox strategies.",
        publishedAt: "2025-01-05",
        readingTime: "15 min read",
        category: "Research",
        tags: ["research", "detox", "health"],
        image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2"
    },
    {
        id: 6,
        title: "Creating Screen-Free Zones in Your Home",
        excerpt: "Design strategies for establishing technology-free spaces that promote relaxation, connection, and mindful living.",
        publishedAt: "2025-01-03",
        readingTime: "7 min read",
        category: "Home Design",
        tags: ["home", "design", "wellness"],
        image: "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2"
    }
];

const categories = ["All", "Digital Wellness", "Psychology", "Lifestyle", "Mindfulness", "Research", "Home Design"];

function BlogPostSkeleton({ isListView = false }: { isListView?: boolean }) {
    if (isListView) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 py-6 px-4 -mx-4"
            >
                <div className="flex-shrink-0">
                    <Skeleton className="w-24 h-20 bg-neutral-800 rounded-lg" />
                </div>
                <div className="flex-1 space-y-2">
                    <Skeleton className="w-3/4 h-5 bg-neutral-800" />
                    <Skeleton className="w-1/3 h-4 bg-neutral-800" />
                    <Skeleton className="w-full h-4 bg-neutral-800" />
                    <Skeleton className="w-5/6 h-4 bg-neutral-800" />
                    <div className="flex gap-2 pt-1">
                        <Skeleton className="w-16 h-5 bg-neutral-800 rounded-full" />
                        <Skeleton className="w-20 h-5 bg-neutral-800 rounded-full" />
                        <Skeleton className="w-14 h-5 bg-neutral-800 rounded-full" />
                    </div>
                    </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="overflow-hidden border-neutral-800 bg-neutral-950">
                <div className="aspect-video">
                    <Skeleton className="w-full h-full bg-neutral-800" />
                </div>
                <CardHeader className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-4 h-4 bg-neutral-800" />
                        <Skeleton className="w-20 h-4 bg-neutral-800" />
                    </div>
                    <Skeleton className="w-full h-8 bg-neutral-800" />
                    <Skeleton className="w-full h-16 bg-neutral-800" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-16 h-4 bg-neutral-800" />
                        <Skeleton className="w-16 h-4 bg-neutral-800" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="w-16 h-6 bg-neutral-800 rounded-full" />
                        <Skeleton className="w-20 h-6 bg-neutral-800 rounded-full" />
                    </div>
                </CardHeader>
            </Card>
        </motion.div>
    );
}

function BlogPostCard({ post, isLoading = false, isListView = false }: { post: any; isLoading?: boolean; isListView?: boolean }) {
    if (isLoading) {
        return <BlogPostSkeleton isListView={isListView} />;
    }

    if (isListView) {
        return (
            <motion.article
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="group flex gap-4 py-6 hover:bg-neutral-950/50 transition-colors duration-300 rounded-lg px-4 -mx-4"
            >
                <div className="flex-shrink-0 self-start">
                    <div className="w-24 h-20 overflow-hidden rounded-lg">
                            <Image
                                src={post.image}
                                alt={post.title}
                                width={96}
                                height={80}
                                className="w-full h-full object-cover"
                            />
                    </div>
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white group-hover:text-neutral-200 transition-colors line-clamp-2 leading-tight">
                            {post.title}
                        </h3>
                        
                        <p className="text-neutral-500 text-sm">
                            Published on {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                                month: 'long', 
                                day: 'numeric', 
                                year: 'numeric' 
                            })}
                        </p>
                        
                        <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">
                            {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 pt-1">
                            {post.tags.map((tag: string) => (
                                <Badge 
                                    key={tag} 
                                    variant="outline" 
                                    className="text-xs border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.article>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            layout
            className="h-full"
        >
            <Card className="group overflow-hidden border-neutral-800 bg-neutral-950 hover:border-neutral-700 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 h-full flex flex-col">
                <div className="aspect-video overflow-hidden">
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={800}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <CardHeader className="space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-neutral-400" />
                        <Badge variant="secondary" className="bg-neutral-800 text-neutral-300 hover:bg-neutral-700">
                            {post.category}
                        </Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white group-hover:text-neutral-200 transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                    
                    <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                            })}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readingTime}
                        </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-auto">
                        {post.tags.map((tag: string) => (
                            <Badge 
                                key={tag} 
                                variant="outline" 
                                className="text-xs border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardHeader>
            </Card>
        </motion.div>
    );
}

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('list');
    const postsPerPage = 6;

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Filter posts based on search and category
    const filteredPosts = mockPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Pagination
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

    return (
        <>
            <Navbar links={navItems} />
            <div className="min-h-screen bg-black text-white flex flex-col">
                <main className="flex-1 container mx-auto px-6 py-24">
                    {/* Header */}
                    <div className="text-center pt-20 mb-16 font-sans">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            Undcitfy Blog
                            <span className="block text-neutral-400 text-2xl md:text-3xl font-normal mt-2">
                                Insights & Stories
                            </span>
                        </h1>
                        <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            Discover articles, research, and practical guides to help you build a healthier relationship with technology.
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-12 space-y-6 font-mono">
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                            <Input
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-500 focus:border-neutral-600"
                            />
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setCurrentPage(1);
                                    }}
                                    className={`${
                                        selectedCategory === category
                                            ? "bg-white text-black hover:bg-neutral-200"
                                            : "border-neutral-700 text-neutral-300 hover:border-neutral-600 hover:text-white hover:bg-neutral-900"
                                    } transition-all duration-200`}
                                >
                                    <Filter className="w-3 h-3 mr-1" />
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* View Mode Tabs */}
                    <Tabs value={viewMode} onValueChange={setViewMode} className="w-full font-serif">
                        <div className="flex justify-center mb-8">
                            <TabsList className="bg-neutral-900 border border-neutral-800">
                                <TabsTrigger 
                                    value="list" 
                                    className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white flex items-center gap-2"
                                >
                                    <List className="w-4 h-4" />
                                    List View
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="grid" 
                                    className="data-[state=active]:bg-neutral-800 data-[state=active]:text-white flex items-center gap-2"
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                    Grid View
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="list" className="mt-0">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-4xl mx-auto"
                            >
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-white mb-6">Latest Stories</h2>
                                </div>
                                <AnimatePresence mode="wait">
                                    {isLoading ? (
                                        <div className="space-y-6">
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <BlogPostSkeleton key={index} isListView={true} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            {paginatedPosts.map((post) => (
                                                <BlogPostCard key={post.id} post={post} isListView={true} />
                                            ))}
                                        </div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="grid" className="mt-0">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
                            >
                                <AnimatePresence mode="wait">
                                    {isLoading ? (
                                        Array.from({ length: 6 }).map((_, index) => (
                                            <BlogPostSkeleton key={index} isListView={false} />
                                        ))
                                    ) : (
                                        paginatedPosts.map((post) => (
                                            <BlogPostCard key={post.id} post={post} isListView={false} />
                                        ))
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </TabsContent>
                    </Tabs>

                    {/* Pagination */}
                    {!isLoading && filteredPosts.length > postsPerPage && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex justify-center items-center gap-2 mt-12"
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="border-neutral-700 text-neutral-300 hover:border-neutral-600 hover:text-white hover:bg-neutral-900"
                            >
                                Previous
                            </Button>
                            
                            <div className="flex gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 ${
                                            currentPage === page
                                                ? "bg-white text-black hover:bg-neutral-200"
                                                : "border-neutral-700 text-neutral-300 hover:border-neutral-600 hover:text-white hover:bg-neutral-900"
                                        }`}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                            
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="border-neutral-700 text-neutral-300 hover:border-neutral-600 hover:text-white hover:bg-neutral-900"
                            >
                                Next
                            </Button>
                        </motion.div>
                    )}

                    {/* No Results */}
                    {!isLoading && filteredPosts.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-16"
                        >
                            <div className="text-neutral-400 text-lg mb-4">No articles found</div>
                            <p className="text-neutral-500 text-sm">
                                Try adjusting your search terms or category filter.
                            </p>
                        </motion.div>
                    )}
                </main>
                <Footer />
            </div>
        </>
    );
}