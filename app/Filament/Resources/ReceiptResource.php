<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ReceiptResource\Pages;
use App\Filament\Resources\ReceiptResource\RelationManagers;
use App\Models\Food;
use App\Models\Inventory;
use App\Models\Receipt;
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

class ReceiptResource extends Resource
{
    protected static ?string $model = Receipt::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
        ->schema([
            Group::make()
                ->schema([
                    Card::make()
                        ->schema([
                            TextInput::make('receipt_number')
                                ->default('RPT-'.date('Y-m-d').'-'.rand(1000, 9999))
                                ->required()
                                ->unique(ignoreRecord: true),
                            DatePicker::make('receipt_date')
                                ->default(now())
                                ->format('Y-m-d')
                                ->required(),
                        ])
                        ->columns(2),

                    Card::make()
                        ->schema([
                            Repeater::make('receipt_items')
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
                                        TextInput::make('inventory_quantity')
                                            ->label(' Inventory Quantity')
                                            ->minValue(1)
                                            ->numeric()
                                            ->required(),
                                        Select::make('food_id')
                                        ->label('Food Name')
                                        ->options(
                                            Food::query()
                                                ->orderBy('name')
                                                ->pluck('name', 'id')
                                                ->toArray()
                                        )
                                        ->searchable()
                                        ->preload()
                                        ->required(),
                                        TextInput::make('food_quantity')
                                        ->label(' Food Quantity')
                                        ->minValue(1)
                                        ->numeric()
                                        ->required(),
                                    ])
                                ->collapsible()
                                ->createItemButtonLabel('Add Another Receipt Item')
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
                Tables\Columns\TextColumn::make('receipt_number'),
                Tables\Columns\TextColumn::make('receipt_date')
                    ->date(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime(),
                Tables\Columns\TextColumn::make('updated_at')
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
            'index' => Pages\ListReceipts::route('/'),
            'create' => Pages\CreateReceipt::route('/create'),
            'view' => Pages\ViewReceipt::route('/{record}'),
            'edit' => Pages\EditReceipt::route('/{record}/edit'),
        ];
    }    
}
