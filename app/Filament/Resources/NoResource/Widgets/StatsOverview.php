<?php

namespace App\Filament\Resources\NoResource\Widgets;

use App\Models\Order;
use App\Models\Payment;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Card;

class StatsOverview extends BaseWidget
{
    protected function getCards(): array
    {
        $totalPayments = Payment::whereDate('created_at', today())->sum('amount');
        $totalCash = Payment::where('payment_type', 'cash')->whereDate('created_at', today())->sum('amount');
        $totalMpesa = Payment::where('payment_type', 'mpesa')->whereDate('created_at', today())->sum('amount');
        $totalPendingOrders = Order::where('paid', 0)->whereDate('created_at', today())->count();

        $formattedTotalPayments = "KSH " . number_format($totalPayments);
        $formattedTotalCash = "KSH " . number_format($totalCash);
        $formattedTotalMpesa = "KSH " . number_format($totalMpesa);
        
        return [
            Card::make('Total Payments', $formattedTotalPayments),
            Card::make('Cash Total', $formattedTotalCash),
            Card::make('Mpesa Total', $formattedTotalMpesa),
            Card::make('Pending Orders', $totalPendingOrders)
        ];
    }
}
