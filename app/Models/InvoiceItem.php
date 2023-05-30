<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    use HasFactory;

    protected $fillable = ['invoice_id', 'food_id', 'received_quantity', 'quantity'];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function food()
    {
        return $this->belongsTo(Food::class);
    }
}
