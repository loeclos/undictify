import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Main from './(tabs)/main';
import Settings from './(tabs)/settings';

const Dashboard: React.FC = () => {
    return (
        <div className="min-h-screen p-6 font-serif">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold  text-white mb-6">
                    Dashboard
                </h1>
                <Tabs defaultValue="streaks" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="streaks">Streaks</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <Main />
                    <Settings />
                </Tabs>
            </div>
        </div>
    );
};

export default Dashboard;


