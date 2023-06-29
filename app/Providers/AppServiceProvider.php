<?php

namespace App\Providers;

use auth;
use Filament\Facades\Filament;
use Filament\Navigation\UserMenuItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;
use App\Filament\Resources\UserResource;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::unguard();

        Filament::serving(function () {
            Filament::registerUserMenuItems([
                // 'account' => UserMenuItem::make()
                //             ->label('My Profile')
                //             ->url(UserResource::getUrl('edit', ['record' => auth()->user()])),
                UserMenuItem::make()
                    ->label('Manage Users')
                    ->url(UserResource::getUrl())
                    ->icon('heroicon-s-users'),
            ]);
        });
    }
}
