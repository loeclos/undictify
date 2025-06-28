'use client';
import { TabsContent } from '@/components/ui/tabs';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function Main() {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const supabase = createClient();
        const getUserData = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                console.log('Not logged in');
                return;
            }

            const { data, error } = await supabase
                .from('user_data')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (error) {
                console.error('Error fetching user_data:', error.message);
            } else {
                setUserData(data);
            }
        };

        getUserData();
    }, []);

    if (!userData)
        return (
            <TabsContent value="streaks">
                <div className="p-6 bg-zinc-900 rounded-lg shadow animate-pulse">
                    <div className="h-7 w-48 bg-gray-700 rounded mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="h-6 w-32 bg-gray-300 rounded mb-4" />
                            <div className="h-48 bg-gray-200 rounded mb-2" />
                            <div className="h-4 w-24 bg-gray-200 rounded" />
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="h-6 w-32 bg-gray-300 rounded mb-4" />
                            <div className="h-48 bg-gray-200 rounded mb-2" />
                            <div className="h-4 w-24 bg-gray-200 rounded" />
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="h-6 w-32 bg-gray-300 rounded mb-4" />
                            <div className="h-48 bg-gray-200 rounded mb-2" />
                            <div className="h-4 w-24 bg-gray-200 rounded" />
                        </div>
                    </div>
                </div>
            </TabsContent>
        );
    return (
        <TabsContent value="streaks">
            <div className="p-6 bg-zinc-900 text-white rounded-lg shadow">
                <h2 className="text-xl font-semibold  mb-4">
                    Welcome, {userData.user_name != '' ? userData.user_name : 'User'}.
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-800 p-4 rounded-lg">
                        <h3 className="text-lg font-medium">
                            Weekly Stats
                        </h3>
                        <div className="h-48 bg-zinc-700 rounded mt-2" />
                        <p className="text-sm mt-2">
                            Placeholder for weekly graph
                        </p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-lg">
                        <h3 className="text-lg font-medium">
                            Monthly Stats
                        </h3>
                        <div className="h-48 bg-zinc-700 rounded mt-2" />
                        <p className="text-sm mt-2">
                            Placeholder for monthly graph
                        </p>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-lg">
                        <h3 className="text-lg font-medium">
                            Yearly Stats
                        </h3>
                        <div className="h-48 bg-zinc-700 rounded mt-2" />
                        <p className="text-sm mt-2">
                            Placeholder for yearly graph
                        </p>
                    </div>
                </div>
            </div>
        </TabsContent>
    );
}
