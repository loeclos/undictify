'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Clock, User, Calendar, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Navbar from '@/app/(components)/navbar/navbar';
import Footer from '@/app/(components)/footer/footer';
import Image from 'next/image';

const navItems = [
    { id: 'home', text: 'Home', url: '/' },
    { id: 'blog', text: 'Blog', url: '/blog' },
    { id: 'dashboard', text: 'Dashboard', url: '/dashboard' },
];

// Mock blog data
const mockPosts = [
    {
        id: 1,
        title: "Breaking Free from Digital Addiction: A Modern Approach",
        excerpt: "Discover how to reclaim your time and attention in an increasingly connected world. Learn practical strategies for digital wellness.",
        author: {
            name: "Sarah Chen",
            avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
        },
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
        author: {
            name: "Dr. Michael Torres",
            avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
        },
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
        author: {
            name: "Emma Rodriguez",
            avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
        },
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
        author: {
            name: "Alex Kim",
            avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
        },
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
        author: {
            name: "Dr. Lisa Park",
            avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
        },
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
        author: {
            name: "Jordan Williams",
            avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
        },
        publishedAt: "2025-01-03",
        readingTime: "7 min read",
        category: "Home Design",
        tags: ["home", "design", "wellness"],
        image: "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2"
    }
];

const categories = ["All", "Digital Wellness", "Psychology", "Lifestyle", "Mindfulness", "Research", "Home Design"];

function BlogPostSkeleton() {
    return (
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
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Skeleton className="w-8 h-8 rounded-full bg-neutral-800" />
                        <div className="space-y-1">
                            <Skeleton className="w-20 h-4 bg-neutral-800" />
                            <Skeleton className="w-16 h-3 bg-neutral-800" />
                        </div>
                    </div>
                    <Skeleton className="w-16 h-4 bg-neutral-800" />
                </div>
            </CardHeader>
        </Card>
    );
}

function BlogPostCard({ post, isLoading = false }: { post: any; isLoading?: boolean }) {
    if (isLoading) {
        return <BlogPostSkeleton />;
    }

    return (
        <Card className="group overflow-hidden border-neutral-800 bg-neutral-950 hover:border-neutral-700 transition-all duration-300 hover:shadow-lg hover:shadow-black/20">
            <div className="aspect-video overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <CardHeader className="space-y-4">
                <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-neutral-400" />
                    <Badge variant="secondary" className="bg-neutral-800 text-neutral-300 hover:bg-neutral-700">
                        {post.category}
                    </Badge>
                </div>
                
                <h3 className="text-xl font-semibold text-white group-hover:text-neutral-200 transition-colors line-clamp-2">
                    {post.title}
                </h3>
                
                <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                            <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                            />
                        </Avatar>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-white">{post.author.name}</p>
                            <div className="flex items-center gap-3 text-xs text-neutral-500">
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
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-1 pt-2">
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
    );
}

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
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
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
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
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            Digital Wellness
                            <span className="block text-neutral-400 text-2xl md:text-3xl font-normal mt-2">
                                Insights & Stories
                            </span>
                        </h1>
                        <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            Discover articles, research, and practical guides to help you build a healthier relationship with technology.
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-12 space-y-6">
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

                    {/* Blog Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {isLoading
                            ? Array.from({ length: 6 }).map((_, index) => (
                                <BlogPostSkeleton key={index} />
                            ))
                            : paginatedPosts.map((post) => (
                                <BlogPostCard key={post.id} post={post} />
                            ))
                        }
                    </div>

                    {/* Pagination */}
                    {!isLoading && filteredPosts.length > postsPerPage && (
                        <div className="flex justify-center items-center gap-2">
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
                        </div>
                    )}

                    {/* No Results */}
                    {!isLoading && filteredPosts.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-neutral-400 text-lg mb-4">No articles found</div>
                            <p className="text-neutral-500 text-sm">
                                Try adjusting your search terms or category filter.
                            </p>
                        </div>
                    )}
                </main>
                <Footer />
            </div>
        </>
    );
}