<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    use HasFactory;

    protected $table = 'foods';  

    protected $fillable = [
        'name',
        'food_category_id',
        'price',
        'quantity',
        'unit_id',
    ];

    public function foodCategory()
    {
        return $this->belongsTo(FoodCategory::class);
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

}
