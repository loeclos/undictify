import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 font-sans">
            <CheckCircle2 className="text-green-500 w-16 h-16 mb-6" />
            <h1 className="text-3xl font-bold mb-2 text-center">
                Subscription Successful!
            </h1>
            <p className="text-muted-foreground mb-8 text-center max-w-md">
                Thank you for subscribing to Pro. You now have access to all premium features.
            </p>
            <Link href="/dashboard">
                <Button size="lg" className="px-8">
                    Explore new possibilities
                </Button>
            </Link>
        </div>
    );
}