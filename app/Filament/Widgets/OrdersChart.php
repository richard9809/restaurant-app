<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Illuminate\Support\Facades\Log;
use Leandrocfe\FilamentApexCharts\Widgets\ApexChartWidget;

class OrdersChart extends ApexChartWidget
{
    /**
     * Chart Id
     *
     * @var string
     */
    protected static string $chartId = 'ordersChart';

    /**
     * Widget Title
     *
     * @var string|null
     */
    protected static ?string $heading = 'OrdersChart';


    /**
     * Chart options (series, labels, types, size, animations...)
     * https://apexcharts.com/docs/options
     *
     * @return array
     */
    protected function getOptions(): array
    {
        // Get the order data from the Order model for the current year (replace this with your actual code)
        $currentYear = date('Y');
        $orderData = Order::whereYear('created_at', $currentYear)->get();

        // Prepare the series data and categories
        $seriesData = [];
        $categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        foreach ($categories as $monthAbbreviation) {
            $monthOrdersCount = $orderData->filter(function ($order) use ($monthAbbreviation) {
                return $order->created_at->format('M') === $monthAbbreviation;
            })->count();
            $seriesData[] = $monthOrdersCount;
        }

        return [
            'chart' => [
                'type' => 'bar',
                'height' => 300,
            ],
            'series' => [
                [
                    'name' => 'BasicBarChart',
                    'data' => $seriesData,
                ],
            ],
            'xaxis' => [
                'categories' => $categories,
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
            'colors' => ['#6366f1'],
            'plotOptions' => [
                'bar' => [
                    'borderRadius' => 3,
                    'horizontal' => true,
                ],
            ],
        ];
    }
}
