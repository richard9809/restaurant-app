<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\FoodCollection;
use App\Http\Resources\TableCollection;
use App\Models\Food;
use App\Models\FoodCategory;
use App\Models\Table;
use Illuminate\Http\Request;

class GetController extends Controller
{
    public function getTables(Request $request)
    {
        $tables = Table::orderBy('name')->get(['id', 'name']);
        return new TableCollection($tables);
    }

    public function categories(Request $request)
    {
        $categories = FoodCategory::orderBy('name')->get(['id', 'name']);
        return new CategoryCollection($categories);
    }

    // public function getFoods(Request $request)
    // {
    //     $foods = Food::orderBy('name')->get(['id', 'name', 'price', 'quantity', 'unit_id', 'food_category_id', 'image']);
    //     return new FoodCollection($foods);
    // }

    public function getFoods(Request $request)
    {
        $category = $request->query('category');

        if ($category) {
            $foods = Food::whereHas('foodCategory', function ($query) use ($category) {
                $query->where('food_category_id', $category);
            })->orderBy('name')->get(['id', 'name', 'price', 'quantity', 'unit_id', 'food_category_id', 'image']);
        }
        else {
            $foods = Food::orderBy('name')->get(['id', 'name', 'price', 'quantity', 'unit_id', 'food_category_id', 'image']);
        }

        return new FoodCollection($foods);
    }

            
}
