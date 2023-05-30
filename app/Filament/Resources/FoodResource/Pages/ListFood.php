<?php

namespace App\Filament\Resources\FoodResource\Pages;

use App\Filament\Resources\FoodResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListFood extends ListRecords
{
    protected static string $resource = FoodResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
