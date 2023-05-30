<?php

namespace App\Filament\Resources\FoodResource\Pages;

use App\Filament\Resources\FoodResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditFood extends EditRecord
{
    protected static string $resource = FoodResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function getSavedNotificationTitle(): ?string
    {
        return 'Food Updated';
    }
}
