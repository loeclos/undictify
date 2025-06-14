import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center py-12 px-8 font-mono">
            <Card className="w-full max-w-2xl shadow-xl bg-neutral-950 border border-neutral-800 backdrop-blur-lg">
                <CardHeader className='font-serif'>
                    <CardTitle className="text-3xl font-bold text-white mb-2">
                        Undictify: Privacy Policy
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                        Last updated: June 2025
                    </p>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[400px] pr-4 py-3 rounded-lg">
                        <section className="space-y-6 text-gray-600">
                            <div>
                                <h2 className="text-xl font-semibold text-zinc-300 mb-1">
                                    1. Data We Collect
                                </h2>
                                <p>
                                    Undictify may collect basic information such as your email address and usage data. We
                                    collect only what is necessary to operate and improve our services.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-zinc-300 mb-1">
                                    2. How We Use Your Data
                                </h2>
                                <p>
                                    We use your data to operate Undictify, provide support, improve features, and communicate
                                    with you about updates or issues related to the product.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-zinc-300 mb-1">
                                    3. No Third-Party Sharing
                                </h2>
                                <p>
                                    We do <strong>not</strong> sell, rent, or share your personal data with third parties for
                                    any purpose. Your data stays within Undictify, strictly for service-related use.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-zinc-300 mb-1">
                                    4. Security Measures
                                </h2>
                                <p>
                                    We use industry-standard security practices to protect your data from unauthorized
                                    access, misuse, or loss.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-zinc-300 mb-1">
                                    5. Changes to This Policy
                                </h2>
                                <p>
                                    We may update this Privacy Policy as needed. If we make significant changes, we will
                                    notify you within the app or via email. Continued use after changes means you accept
                                    the new terms.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-zinc-300 mb-1">
                                    6. Governing Law
                                </h2>
                                <p>
                                    This Privacy Policy is governed by the laws of the United States of America, regardless of
                                    your location.
                                </p>
                            </div>
                            {/* <div>
                                <h2 className="text-xl font-semibold text-zinc-300 mb-1">
                                    7. Contact Us
                                </h2>
                                <p>
                                    If you have questions or concerns about this policy, please contact us at{' '}
                                    <a
                                        href="mailto:support@example.com"
                                        className="text-indigo-700 underline"
                                    >
                                        support@example.com
                                    </a>
                                    .
                                </p>
                            </div> */}
                        </section>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}


// Add metadata export
export const metadata = {
    title: 'Privacy Policy | Undictify',
    description: 'Privacy Policy for Undictify - Your Digital Wellbeing Companion'
};