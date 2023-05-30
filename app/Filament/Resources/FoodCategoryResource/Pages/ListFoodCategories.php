<?php

namespace App\Filament\Resources\FoodCategoryResource\Pages;

use App\Filament\Resources\FoodCategoryResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListFoodCategories extends ListRecords
{
    protected static string $resource = FoodCategoryResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
