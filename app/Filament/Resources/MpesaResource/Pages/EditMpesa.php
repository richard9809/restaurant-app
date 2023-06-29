<?php

namespace App\Filament\Resources\MpesaResource\Pages;

use App\Filament\Resources\MpesaResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditMpesa extends EditRecord
{
    protected static string $resource = MpesaResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
