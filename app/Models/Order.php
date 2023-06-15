<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'table_id',
        'employee_id',
        'total',
    ];

    public function table()
    {
        return $this->belongsTo(Table::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

}
