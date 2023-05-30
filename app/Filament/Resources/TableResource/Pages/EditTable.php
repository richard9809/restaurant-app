<?php

namespace App\Filament\Resources\TableResource\Pages;

use App\Filament\Resources\TableResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTable extends EditRecord
{
    protected static string $resource = TableResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function getSavedNotificationTitle(): ?string
    {
        return 'Table Updated';
    }
}
