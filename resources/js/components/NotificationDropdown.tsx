import { useState } from 'react';
import { Bell, Check, Info, AlertTriangle, AlertCircle } from 'lucide-react';
import { usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface NotificationItem {
    id: string;
    data: {
        title: string;
        message: string;
        target_url?: string;
        type?: 'info' | 'warning' | 'danger' | 'critical';
    };
    created_at: string;
}

export function NotificationDropdown() {
    const { notifications } = usePage<{ notifications?: { count: number, items: NotificationItem[] } }>().props;
    const [open, setOpen] = useState(false);

    if (!notifications) return null;

    const { count, items } = notifications;

    const handleMarkAsRead = (id: string, targetUrl?: string) => {
        router.get(route('notifications.markAsRead', { id }));
        setOpen(false);
    };

    const handleMarkAllAsRead = () => {
        router.post(route('notifications.markAllRead'), {}, {
            preserveScroll: true,
            onSuccess: () => setOpen(false)
        });
    };

    const getIcon = (type?: string) => {
        switch (type) {
            case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
            case 'danger': return <AlertCircle className="h-4 w-4 text-red-500" />;
            case 'critical': return <AlertCircle className="h-4 w-4 text-rose-600 animate-pulse" />;
            default: return <Info className="h-4 w-4 text-blue-500" />;
        }
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    {count > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 bg-red-500 text-white text-[10px] font-bold">
                            {count > 9 ? '9+' : count}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <DropdownMenuLabel className="p-0 font-semibold text-base">Notifikasi</DropdownMenuLabel>
                    {count > 0 && (
                        <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead} className="h-auto p-0 text-xs text-muted-foreground hover:text-primary">
                            <Check className="h-3 w-3 mr-1" />
                            Tandai semua dibaca
                        </Button>
                    )}
                </div>
                <div className="h-80 overflow-y-auto">
                    {!items || (Array.isArray(items) ? items.length : Object.keys(items).length) === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                            <Bell className="h-8 w-8 mb-2 opacity-20" />
                            <p className="text-sm">Belum ada notifikasi baru</p>
                        </div>
                    ) : (
                        <div className="py-1">
                            {(Array.isArray(items) ? items : Object.values(items)).map((notif: any) => (
                                <DropdownMenuItem 
                                    key={notif.id} 
                                    className="px-4 py-3 cursor-pointer items-start gap-3 hover:bg-muted/50"
                                    onClick={() => handleMarkAsRead(notif.id, notif.data.target_url)}
                                >
                                    <div className="mt-0.5 bg-muted rounded-full p-1.5 shrink-0">
                                        {getIcon(notif.data.type)}
                                    </div>
                                    <div className="flex flex-col gap-1 overflow-hidden">
                                        <p className="text-sm font-semibold truncate leading-none">{notif.data.title}</p>
                                        <p className="text-xs text-muted-foreground line-clamp-2">{notif.data.message}</p>
                                        <span className="text-[10px] text-muted-foreground/70">{notif.created_at}</span>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
