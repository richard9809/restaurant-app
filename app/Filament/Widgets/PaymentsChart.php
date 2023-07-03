<?php

namespace App\Filament\Widgets;

use App\Models\Payment;
use Illuminate\Support\Facades\Log;
use Leandrocfe\FilamentApexCharts\Widgets\ApexChartWidget;

class PaymentsChart extends ApexChartWidget
{
    /**
     * Chart Id
     *
     * @var string
     */
    protected static string $chartId = 'paymentsChart';

    /**
     * Widget Title
     *
     * @var string|null
     */
    protected static ?string $heading = 'PaymentsChart';

    /**
     * Chart options (series, labels, types, size, animations...)
     * https://apexcharts.com/docs/options
     *
     * @return array
     */
    protected function getOptions(): array
    {

        // Get the payment data for the current year
        $currentYear = date('Y');
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        $cashPayments = [];
        $mpesaPayments = [];
        $cashTotals = [];
        $mpesaTotals = [];

        foreach ($months as $month) {
            $cashPayments[] = Payment::where('payment_type', 'cash')->whereYear('created_at', $currentYear)->whereMonth('created_at', date('m', strtotime($month)))->pluck('amount')->sum();
            $mpesaPayments[] = Payment::where('payment_type', 'mpesa')->whereYear('created_at', $currentYear)->whereMonth('created_at', date('m', strtotime($month)))->pluck('amount')->sum();
            $cashTotals[] = array_sum($cashPayments);
            $mpesaTotals[] = array_sum($mpesaPayments);
        }

        return [
            'chart' => [
                'type' => 'line',
                'height' => 300,
            ],
            'series' => [
                [
                    'name' => 'Cash',
                    'data' => $cashPayments,
                ],
                [
                    'name' => 'Mpesa',
                    'data' => $mpesaPayments
                ]
            ],
            'xaxis' => [
                'categories' => $months,
                'labels' => [
                    'style' => [
                        'colors' => '#9ca3af',
                        'fontWeight' => 600,
                    ],
                ],
            ],
            'yaxis' => [
                'labels' => [
                    'style' => [
                        'colors' => '#9ca3af',
                        'fontWeight' => 600,
                    ],
                ],
            ],
            'colors' => ['#6366f1', '#f6ad55'],
            'stroke' => [
                'curve' => 'smooth',
            ],
            'annotations' => [
                'totalCash' => [
                    'x' => $months,
                    'y' => $cashTotals,
                    'borderColor' => '#6366f1',
                    'label' => [
                        'borderColor' => '#6366f1',
                        'text' => 'Total Cash',
                        'position' => 'top',
                    ],
                ],
                'totalMpesa' => [
                    'x' => $months,
                    'y' => $mpesaTotals,
                    'borderColor' => '#f6ad55',
                    'label' => [
                        'borderColor' => '#f6ad55',
                        'text' => 'Total Mpesa',
                        'position' => 'top',
                    ],
                ],
            ],
        ];
    }
}
