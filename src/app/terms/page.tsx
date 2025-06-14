import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center py-12 px-8 font-mono">
            <Card className="w-full max-w-2xl shadow-xl bg-neutral-950 border border-neutral-800 backdrop-blur-lg">
                <CardHeader className='font-serif'>
                    <CardTitle className="text-3xl font-bold text-white mb-2">
                        Undictify: Terms & Conditions
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
                                    1. Acceptance of Terms
                                </h2>
                                <p>
                                    By accessing or using Undictify, you confirm
                                    that you have read, understood, and agree to
                                    be bound by these Terms. If you do not
                                    agree, please do not use our service.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-zinc-300 mb-1">
                                    2. User Responsibilities
                                </h2>
                                <p>
                                    You agree to use Undictify in a lawful and
                                    responsible manner. You must not use
                                    Undictify to engage in illegal, harmful, or
                                    abusive activities. You are responsible for
                                    your conduct and any data you provide.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-zinc-300 mb-1">
                                    3. Safety Notice
                                </h2>
                                <p>
                                    Some features of Undictify may involve
                                    content or tools that could potentially
                                    cause confusion, disruption, or misuse. When
                                    such features are present, we will clearly
                                    display a warning so you can make informed
                                    decisions before proceeding.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-zinc-300 mb-1">
                                    4. Disclaimer of Liability
                                </h2>
                                <p>
                                    Undictify is provided &quot;as is&quot; without
                                    warranties of any kind. We are not
                                    responsible or liable for any harm, loss,
                                    inconvenience, or damages—direct or
                                    indirect—resulting from your use of the
                                    product. You use Undictify at your own risk.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-zinc-300 mb-1">
                                    5. Modifications to the Terms
                                </h2>
                                <p>
                                    We may update these Terms from time to time.
                                    If we do, we&apos;ll notify users through the app
                                    or via email. Continuing to use Undictify
                                    after changes are made means you accept the
                                    revised Terms.
                                </p>
                            </div>
                            {/* <div>
                                <h2 className="text-xl font-semibold text-zinc-300 mb-1">
                                    6. Contact Us
                                </h2>
                                <p>
                                    If you have any questions about these Terms,
                                    please contact us at 
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
    description: 'Terms and Conditions for Undictify - Your Digital Wellbeing Companion'
};