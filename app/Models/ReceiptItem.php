<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReceiptItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'receipt_id',
        'inventory_id',
        'inventory_quantity',
        'food_id',
        'food_quantity',
    ];

    public function receipt()
    {
        return $this->belongsTo(Receipt::class);
    }

    public function inventory()
    {
        return $this->belongsTo(Inventory::class);
    }

    public function food()
    {
        return $this->belongsTo(Food::class);
    }
}
