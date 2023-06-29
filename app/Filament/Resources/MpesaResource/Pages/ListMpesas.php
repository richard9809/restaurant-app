<?php

namespace App\Filament\Resources\MpesaResource\Pages;

use App\Filament\Resources\MpesaResource;
use App\Models\Mpesa;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListMpesas extends ListRecords
{
    protected static string $resource = MpesaResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    protected function getTableQuery(): Builder
    {
        $query = Mpesa::query()
            ->latest();
        
        return $query;
    }
}
