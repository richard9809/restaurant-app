<?php

namespace App\Filament\Resources\FoodResource\Pages;

use App\Filament\Resources\FoodResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateFood extends CreateRecord
{
    protected static string $resource = FoodResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function getCreatedNotificationTitle(): ?string
    {
        return 'Food Created';
    }
}
