<?php

namespace App\Filament\Resources\FoodCategoryResource\Pages;

use App\Filament\Resources\FoodCategoryResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditFoodCategory extends EditRecord
{
    protected static string $resource = FoodCategoryResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function getSavedNotificationTitle(): ?string
    {
        return 'Category Updated';
    }
}
