'use client';

import { TabsContent } from '@/components/ui/tabs';
import CancelSubButton from './(partials)/cancel-sub';
import { Button } from '@/components/ui/button';
import Services from './(partials)/services';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';

type UserData = {
    sub_id: string | null;
    user_id: string;
};

export default function Settings() {
    const supabase = createClient();
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
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
    });
    return (
        <TabsContent value="settings">
            <div className="p-6 bg-zinc-900 text-white rounded-lg shadow">
                <h2 className="text-xl text-center font-semibold mb-4">
                    Settings
                </h2>
                <div className="flex items-center justify-center mb-10">
                    <Separator className="max-w-2/3" />
                </div>
                <div className="flex flex-col gap-2 space-y-4 px-4 md:px-20 text-center">
                    <h3 className="text-md font-semibold">Subscription</h3>
                    <p className='text-muted-foreground text-sm'>This is where you can manage your subscription</p>
                    {userData && userData.sub_id !== null ? (
                        <CancelSubButton
                            subscriptionId={userData.sub_id}
                            userId={userData.user_id}
                        />
                    ) : (
                        <a href="/subscribe">
                            <button className="bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200 cursor-pointer text-white font-bold py-2 px-4 rounded-lg w-full disabled:opacity-50">
                                Upgrade to PRO
                            </button>
                        </a>
                    )}
                    <div className="flex items-center justify-center">
                        <Separator className="max-w-2/3" />
                    </div>
                     <h3 className="text-md font-semibold">Blocking Services</h3>
                    <p className='text-muted-foreground text-sm'>This is where you add the services you want to block</p>
                    <Services />
                    <div className="flex items-center justify-center">
                        <Separator className="max-w-2/3" />
                    </div>
                </div>
            </div>
        </TabsContent>
    );
}
