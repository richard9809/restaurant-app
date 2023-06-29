<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MpesaResource\Pages;
use App\Filament\Resources\MpesaResource\RelationManagers;
use App\Models\Mpesa;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class MpesaResource extends Resource
{
    protected static ?string $model = Mpesa::class;

    protected static ?string $navigationIcon = 'heroicon-o-credit-card';

    protected static ?string $navigationGroup = 'Sales & Payments';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Toggle::make('paid')
                    ->required(),
                Forms\Components\TextInput::make('FirstName')
                    ->maxLength(255),
                Forms\Components\TextInput::make('MiddleName')
                    ->maxLength(255),
                Forms\Components\TextInput::make('LastName')
                    ->maxLength(255),
                Forms\Components\TextInput::make('TransactionType')
                    ->maxLength(255),
                Forms\Components\TextInput::make('TransID')
                    ->maxLength(255),
                Forms\Components\TextInput::make('TransTime')
                    ->maxLength(255),
                Forms\Components\TextInput::make('BusinessShortCode')
                    ->maxLength(255),
                Forms\Components\TextInput::make('BillRefNumber')
                    ->maxLength(255),
                Forms\Components\TextInput::make('InvoiceNumber')
                    ->maxLength(255),
                Forms\Components\TextInput::make('ThirdPartyTransID')
                    ->maxLength(255),
                Forms\Components\TextInput::make('MSISDN')
                    ->maxLength(255),
                Forms\Components\TextInput::make('TransAmount')
                    ->maxLength(12),
                Forms\Components\TextInput::make('OrgAccountBalance')
                    ->maxLength(12),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\IconColumn::make('paid')
                    ->boolean(),
                Tables\Columns\TextColumn::make('FirstName'),
                Tables\Columns\TextColumn::make('TransID'),
                Tables\Columns\TextColumn::make('MSISDN'),
                Tables\Columns\TextColumn::make('TransAmount')
                    ->money('KES', shouldConvert: true),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime(),
            ])
            ->filters([
                Filter::make('paid')
                    ->label('Unpaid')
                    ->query(fn (Builder $query): Builder => $query->where('paid', false)),
                Filter::make('created_at')
                    ->form([
                        DatePicker::make('created_from'),
                        DatePicker::make('created_until'),
                    ])
                    ->query(function (Builder $query, array $data): Builder{
                        return $query
                            ->when(
                                $data['created_from'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '>=', $date),
                            )
                            ->when(
                                $data['created_until'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '<=', $date),
                            );

                    }),
            ])
            ->actions([
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
            'index' => Pages\ListMpesas::route('/'),
            'create' => Pages\CreateMpesa::route('/create'),
            'edit' => Pages\EditMpesa::route('/{record}/edit'),
        ];
    }    
}
