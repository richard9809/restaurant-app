<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_number' => $this->order_number,
            'table_name' => $this->table->name,
            'employee_name' => $this->employee->name,
            'total' => $this->total,
            'paid' => $this->paid,
            'created_at' => $this->created_at->format('H:i:s'),
            'order_items' => $this->orderItems->map(function ($item) {
                return [
                    'id' => $item->id,
                    'food_id' => $item->food_id,
                    'image' => $item->food->image,
                    'food_name' => $item->food->name,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'sub_total' => $item->sub_total,
                ];
            }),
        ];
    }
}
