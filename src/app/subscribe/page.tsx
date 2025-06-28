'use client';

import SubscribeButton from '@/components/subscribe-button/subscribe-button';
import { CircleCheck, XCircle } from 'lucide-react';


export default function SubscribePage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 font-serif">
            <div className="max-w-4xl w-full mx-auto">
                <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
                    Choose Your Plan
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Free Plan */}
                    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl shadow-2xl p-8 flex flex-col border border-zinc-700">
                        <h2 className="text-2xl font-semibold text-white mb-2">Free</h2>
                        <p className="text-zinc-400 mb-6">Get started with the basics</p>
                        <div className="mb-8">
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <CircleCheck className="w-6 h-6 text-zinc-400 mr-3" />
                                    <span className="text-zinc-200 tracking-wide">All blocking features</span>
                                </li>
                                <li className="flex items-center">
                                    <XCircle className="w-6 h-6 text-zinc-400 mr-3" />
                                    <span className="text-zinc-200 tracking-wide">Free coffee</span>
                                </li>
                                <li className="flex items-center">
                                    <XCircle className="w-6 h-6 text-zinc-400 mr-3" />
                                    <span className="text-zinc-200 tracking-wide">Donuts deliverd daily</span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-auto">
                            <span className="text-3xl font-bold text-white">$0</span>
                            <span className="text-zinc-400 ml-2">/month</span>
                        </div>
                    </div>
                    {/* Pro Plan */}
                    <div className="bg-gradient-to-br from-white to-zinc-100 rounded-3xl shadow-2xl p-8 flex flex-col border-2 border-zinc-900 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-zinc-900 text-white text-xs px-3 py-1 rounded-bl-2xl font-bold shadow-lg">
                            Most Popular
                        </div>
                        <h2 className="text-2xl font-semibold text-zinc-900 mb-2">Pro</h2>
                        <p className="text-zinc-600 mb-6">Unlock all features</p>
                        <div className="mb-8">
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <CircleCheck className="w-6 h-6 text-zinc-900 mr-3" />
                                    <span className="text-zinc-800 tracking-wide font-semibold">All blocking features</span>
                                </li>
                                <li className="flex items-center">
                                    <CircleCheck className="w-6 h-6 text-zinc-900 mr-3" />
                                    <span className="text-zinc-800 tracking-wide font-semibold">Bragging rights</span>
                                </li>
                                <li className="flex items-center">
                                    <XCircle className="w-6 h-6 text-zinc-900 mr-3" />
                                    <span className="text-zinc-800 tracking-wide font-semibold">Free Coffee</span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-auto flex items-center gap-4">
                            <span className="text-3xl font-bold text-zinc-900">$2</span>
                            <span className="text-zinc-600">/month</span>
                        </div>
                        <div className="mt-6">
                            <SubscribeButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

