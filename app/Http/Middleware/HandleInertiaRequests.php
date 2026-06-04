<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role,
                ] : null
            ],
            'cartCount' => $request->user() ? \App\Features\Cart\Cart::where('user_id', $request->user()->id)->first()?->items()->count() ?? 0 : 0,
            'notifications' => $request->user() ? [
                'count' => $request->user()->unreadNotifications()->count(),
                'items' => $request->user()->unreadNotifications()->take(10)->get()->map(function($notif) {
                    return [
                        'id' => $notif->id,
                        'data' => $notif->data,
                        'created_at' => $notif->created_at->diffForHumans(),
                    ];
                })->values()->toArray()
            ] : null,
            'sidebarOpen' => !$request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'message' => fn() => $request->session()->get('message'),
            ],
        ];
    }
}
