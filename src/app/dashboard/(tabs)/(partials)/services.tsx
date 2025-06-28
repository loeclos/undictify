import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import UnblockQuizDialog from './UnblockQuizDialog';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState, useId, useCallback } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

type ServiceType = {
    user_id: string;
    id: string;
    name: string;
    icon: string;
    username: string;
    email: string;
    last_password: string;
    disabled: boolean;
};

function Service({
    service,
    refreshServices,
}: {
    service: ServiceType;
    refreshServices: () => void;
}) {
    const [quizOpen, setQuizOpen] = useState(false);
    const supabase = createClient();

    const handleDisableService = async () => {
        console.log(service);
        const { data, error } = await supabase
            .from('user_data')
            .select('services')
            .eq('user_id', service.user_id)
            .single();
        console.log(data);
        if (error) {
            console.error('Error fetching user_data:', error.message);
            return;
        }
        const services = data.services.map((s: ServiceType) =>
            s.id === service.id ? { ...s, disabled: true } : s
        );
        console.log(services);
        const { error: updateError } = await supabase
            .from('user_data')
            .update({ services })
            .eq('user_id', service.user_id);
        if (updateError) {
            console.error('Error updating services:', updateError.message);
        }
        refreshServices();
    };

    const handleEnableService = async () => {
        console.log(service);
        const { data, error } = await supabase
            .from('user_data')
            .select('services')
            .eq('user_id', service.user_id)
            .single();
        console.log(data);
        if (error) {
            console.error('Error fetching user_data:', error.message);
            return;
        }
        const services = data.services.map((s: ServiceType) =>
            s.id === service.id ? { ...s, disabled: false } : s
        );
        console.log(services);
        const { error: updateError } = await supabase
            .from('user_data')
            .update({ services })
            .eq('user_id', service.user_id);
        if (updateError) {
            console.error('Error updating services:', updateError.message);
        }
        refreshServices();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex items-center justify-between hover:bg-muted/50 cursor-pointer p-4 transition-colors duration-200 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <Image
                            src={`/${service.icon}.png`}
                            alt={service.name}
                            width={36}
                            height={36}
                            className="flex h-9 w-9 items-center justify-center bg-transparent rounded"
                        ></Image>

                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {service.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {service.username}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="text-xs text-muted-foreground">
                            {service.email.slice(0, 5)}**********
                        </p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(670px,80vh)] sm:max-w-xl [&>button:last-child]:hidden font-sans">
                <ScrollArea className="flex max-h-full flex-col overflow-hidden">
                    <div className="overflow-y-auto">
                        <DialogHeader className="contents space-y-0 text-left">
                            <DialogTitle className="px-6 pt-6 text-lg font-serif font-bold text-green-600 tracking-widest uppercase text-center">
                                [{service.name}]
                            </DialogTitle>
                            <DialogDescription asChild>
                                <div className="p-6">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                            <div>
                                                <p className="text-xs text-gray-400 font-mono">
                                                    ID:{' '}
                                                    <span className="select-all">
                                                        {service.id.slice(0, 8)}
                                                        ****
                                                    </span>
                                                </p>
                                                <p className="text-xs text-gray-400 font-mono mt-1">
                                                    USER:{' '}
                                                    <span className="font-semibold text-green-500">
                                                        {service.username}
                                                    </span>
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 font-mono">
                                                    EMAIL:{' '}
                                                    <span className="font-semibold text-green-500">
                                                        {service.email}
                                                    </span>
                                                </p>
                                                <p className="text-xs text-yellow-700 font-mono mt-2">
                                                    STATUS:{' '}
                                                    <span
                                                        className={
                                                            service.disabled
                                                                ? 'text-red-600'
                                                                : 'text-green-600'
                                                        }
                                                    >
                                                        {service.disabled
                                                            ? 'DISABLED'
                                                            : 'ACTIVE'}
                                                    </span>
                                                </p>
                                            </div>
                                            <UnblockQuizDialog
                                                isOpen={quizOpen}
                                                onClose={() => {
                                                    setQuizOpen(false);
                                                }}
                                                onDisable={handleDisableService}
                                            />
                                        </div>
                                        <div className="flex flex-row w-full gap-2 p-2">
                                            {service.disabled ? (
                                                <Button
                                                    onClick={
                                                        handleEnableService
                                                    }
                                                    className="flex-1 border-1 border-green-500 hover:bg-green-600/20 cursor-pointer text-white border-dashed bg-green-800/20"
                                                >
                                                    Enable blocking
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={
                                                        () => setQuizOpen(true)
                                                    }
                                                    className="flex-1 border-1 border-red-500 hover:bg-red-600/20 cursor-pointer text-white border-dashed bg-red-800/20"
                                                >
                                                    Disable blocking
                                                </Button>
                                            )}
                                            <DialogClose asChild>
                                                <Button
                                                    className="flex-1 cursor-pointer"
                                                    variant="secondary"
                                                >
                                                    Cancel
                                                </Button>
                                            </DialogClose>
                                        </div>
                                        <div className="w-full border-t border-dashed border-muted mt-4 pt-2 text-xs text-muted-foreground font-mono text-left">
                                            <span>
                                                ACCESS LOG:{' '}
                                                {new Date().toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

export default function Services() {
    const supabase = createClient();
    const [userServices, setUserServices] = useState<ServiceType[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchUserServices = useCallback(async () => {
        const { data } = await supabase
            .from('user_data')
            .select('services')
            .single();
        if (data?.services) {
            setUserServices(data.services);
        }
        setLoading(false);
        console.log(data);
    }, []);

    useEffect(() => {
        fetchUserServices();
    }, [supabase, fetchUserServices]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200 cursor-pointer text-white font-bold py-2 px-4 rounded-lg w-full disabled:opacity-50">
                    Show Services
                </button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden font-sans">
                <ScrollArea className="flex max-h-full flex-col overflow-hidden">
                    <div className="overflow-y-auto">
                        <DialogHeader className="contents space-y-0 text-left">
                            <DialogTitle className="px-6 pt-6 text-base">
                                Services
                            </DialogTitle>
                            <DialogDescription asChild>
                                <div className="p-6">
                                    <div className="[&_strong]:text-foreground space-y-4 [&_strong]:font-semibold">
                                        {loading ? (
                                            <div className="space-y-4">
                                                {[1, 2].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center justify-between animate-pulse bg-muted/50 p-4 rounded-2xl"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="h-9 w-9 bg-gray-300 rounded-xl" />
                                                            <div className="space-y-2">
                                                                <div className="h-4 w-24 bg-gray-300 rounded" />
                                                                <div className="h-3 w-16 bg-gray-200 rounded" />
                                                            </div>
                                                        </div>
                                                        <div className="h-3 w-20 bg-gray-200 rounded" />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : userServices != null &&
                                          userServices.length != 0 ? (
                                            userServices.map((service) => (
                                                <Service
                                                    key={service.id}
                                                    service={service}
                                                    refreshServices={
                                                        fetchUserServices
                                                    }
                                                />
                                            ))
                                        ) : (
                                            <p className="text-xs text-gray-400 font-mono mt-1">
                                                No services found. Please{' '}
                                                <Link
                                                    className="underline hover:opacity-80 transition-opacity duration-200"
                                                    href={'/blog'}
                                                >
                                                    add
                                                </Link>{' '}
                                                a service.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                </ScrollArea>

                <DialogFooter className="flex flex-row gap-2 items-center w-full border-t px-6 py-4">
                    <Button
                        onClick={() => {
                            setLoading(true);
                            fetchUserServices();
                        }}
                        className="flex-1 w-full"
                        type="button"
                        variant="outline"
                    >
                        Refresh
                    </Button>
                    <DialogClose asChild>
                        <AddServices />
                    </DialogClose>
                    <DialogClose asChild>
                        <Button className="flex-1 w-full" type="button">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function AddServices() {
    const id = useId();

    // Form state
    const [platform, setPlatform] = useState('instagram');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    // Handle adding the service
    async function handleServiceAdd(newService: Omit<ServiceType, 'user_id'>) {
        const supabase = createClient();
        const { data, error } = await supabase
            .from('user_data')
            .select('services, pro_user, user_id')
            .single();

        if (error || !data?.user_id) {
            console.error('Error fetching user_data:', error?.message);
            return;
        }

        const services: ServiceType[] = data.services || [];
        const proUser: boolean = data.pro_user || false;
        const userId: string = data.user_id;

        // Only check for duplicates if not pro user
        if (!proUser) {
            const duplicate = services.some(
                (s) =>
                    s.email === newService.email && s.name === newService.name
            );
            if (duplicate) {
                toast.error(
                    'This email is already used for this platform. Upgrade to Pro to add duplicates.'
                );
                return;
            }
        }

        const updatedServices = [
            ...services,
            {
                ...newService,
                user_id: userId,
            },
        ];

        const { error: updateError } = await supabase
            .from('user_data')
            .update({ services: updatedServices })
            .eq('user_id', userId);

        if (updateError) {
            console.error('Error updating services:', updateError.message);
        } else {
            console.log('Service added successfully!');
            setEmail('');
            setName('');
            setPassword('');
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await handleServiceAdd({
            id: uuidv4(),
            name: platform.toLocaleUpperCase(),
            icon: platform.toLowerCase(),
            username: name,
            email,
            last_password: password,
            disabled: false,
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="flex-1 w-full uppercase tracking-widest font-bold bg-black text-green-400 hover:bg-green-900/30"
                    type="button"
                    variant="outline"
                >
                    ADD NEW SERVICE
                </Button>
            </DialogTrigger>
            <DialogContent className="font-mono bg-black shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-green-500 uppercase tracking-widest text-center">
                        [ADD NEW SERVICE]
                    </DialogTitle>
                    <DialogDescription className="text-xs text-green-300 text-center">
                        Fill in the details to add a new service.
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 mt-4" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label
                            htmlFor={`${id}-platform`}
                            className="uppercase text-green-400"
                        >
                            Platform
                        </Label>
                        <Select
                            defaultValue={platform}
                            onValueChange={setPlatform}
                        >
                            <SelectTrigger
                                id={`${id}-platform`}
                                className="bg-black border-green-700 text-green-400 placeholder-green-700 w-full"
                            >
                                <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-green-700 text-green-400 font-mono">
                                <SelectGroup>
                                    <SelectItem value="instagram">
                                        Instagram
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label
                            htmlFor={`${id}-email`}
                            className="uppercase text-green-400"
                        >
                            Email
                        </Label>
                        <Input
                            required
                            id={`${id}-email`}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@email.com"
                            className="bg-black border-green-700 text-green-400 placeholder-green-700"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label
                            htmlFor={`${id}-name`}
                            className="uppercase text-green-400"
                        >
                            Name
                        </Label>
                        <Input
                            required
                            id={`${id}-name`}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            className="bg-black border-green-700 text-green-400 placeholder-green-700"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label
                            htmlFor={`${id}-password`}
                            className="uppercase text-green-400"
                        >
                            Password
                        </Label>
                        <Input
                            required
                            id={`${id}-password`}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••••"
                            autoComplete="current-password"
                            className="bg-black border-green-700 text-green-400 placeholder-green-700"
                        />
                    </div>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="border-green-700 text-green-400 hover:bg-green-900/30"
                            >
                                Abort
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="bg-green-800 hover:bg-green-700 text-black font-bold tracking-widest uppercase"
                        >
                            Add Service
                        </Button>
                    </DialogFooter>
                </form>
                <div className="mt-4 text-xs text-green-700 text-center border-t border-green-700 pt-2">
                    [LOG {new Date().toLocaleTimeString()}] Awaiting input...
                </div>
            </DialogContent>
        </Dialog>
    );
}
