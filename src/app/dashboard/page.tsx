import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard: React.FC = () => {
    return (
        <div className="min-h-screen p-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold  text-white mb-6">
                    Dashboard
                </h1>
                <Tabs defaultValue="streaks" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="streaks">Streaks</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="streaks">
                        <div className="p-6 bg-zinc-900 rounded-lg shadow">
                            <h2 className="text-xl font-semibold  text-white mb-4">
                                Streaks Overview
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-700">
                                        Weekly Stats
                                    </h3>
                                    <div className="h-48 bg-gray-200 rounded mt-2" />
                                    <p className="text-sm text-gray-500 mt-2">
                                        Placeholder for weekly graph
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-700">
                                        Monthly Stats
                                    </h3>
                                    <div className="h-48 bg-gray-200 rounded mt-2" />
                                    <p className="text-sm text-gray-500 mt-2">
                                        Placeholder for monthly graph
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-medium text-gray-700">
                                        Yearly Stats
                                    </h3>
                                    <div className="h-48 bg-gray-200 rounded mt-2" />
                                    <p className="text-sm text-gray-500 mt-2">
                                        Placeholder for yearly graph
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="settings">
                        <div className="p-6 bg-white rounded-lg shadow">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Settings
                            </h2>
                            <p className="text-gray-500">
                                Settings content to be added
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Dashboard;
