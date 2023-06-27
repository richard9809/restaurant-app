<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        "order_id",
        "payment_type",
        "mpesa_id",
        "amount",
        "change"
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function mpesa()
    {
        return $this->belongsTo(Mpesa::class);
    }
}
