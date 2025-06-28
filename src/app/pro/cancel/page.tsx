import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function CancelPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 font-sans">
            <XCircle className="text-red-500 w-16 h-16 mb-6" />
            <h1 className="text-3xl font-bold mb-2 text-center">
                Subscription Unsuccessful
            </h1>
            <p className="text-muted-foreground mb-8 text-center max-w-md">
                Unfortunately, your subscription attempt was not successful.
            </p>
            <div className="flex gap-4">
                <Link href="/subscribe">
                    <Button size="lg" className="px-8">
                        Try Again
                    </Button>
                </Link>
                <Link href="/">
                    <Button size="lg" variant="outline" className="px-8">
                        Go to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}