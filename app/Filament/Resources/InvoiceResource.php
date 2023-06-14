<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InvoiceResource\Pages;
use App\Filament\Resources\InvoiceResource\RelationManagers;
use App\Models\Food;
use App\Models\Inventory;
use App\Models\Invoice;
use Filament\Forms;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class InvoiceResource extends Resource
{
    protected static ?string $model = Invoice::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Group::make()
                    ->schema([
                        Card::make()
                            ->schema([
                                TextInput::make('invoice_number')
                                    ->default('INV-'.date('Y-m-d').'-'.rand(1000, 9999))
                                    ->required()
                                    ->unique(ignoreRecord: true),
                                DatePicker::make('invoice_date')
                                    ->default(now())
                                    ->format('Y-m-d')
                                    ->required(),
                            ])
                            ->columns(2),

                        Card::make()
                            ->schema([
                                Repeater::make('items')
                                    ->relationship()
                                    ->schema([
                                            Select::make('inventory_id')
                                            ->label('Inventory Name')
                                            ->options(
                                                Inventory::query()
                                                    ->orderBy('name')
                                                    ->pluck('name', 'id')
                                                    ->toArray()
                                            )
                                            ->searchable()
                                            ->preload()
                                            ->required(),
                                        TextInput::make('quantity')
                                            ->label('Quantity')
                                            ->minValue(1)
                                            ->numeric()
                                            ->required(),
                                    ])
                                    ->collapsible()
                                    ->createItemButtonLabel('Add Another Food Item')
                                    ->columns(2),
                            ])
                    ])
                    ->columnSpan('full')
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('invoice_number')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->sortable()
                    ->dateTime(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->sortable()
                    ->dateTime(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }
    
    public static function getRelations(): array
    {
        return [
            //
        ];
    }
    
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListInvoices::route('/'),
            'create' => Pages\CreateInvoice::route('/create'),
            'view' => Pages\ViewInvoice::route('/{record}'),
            'edit' => Pages\EditInvoice::route('/{record}/edit'),
        ];
    }    
}
