<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Food;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /** @var \App\Models\Employee $employee */
        $employee = Request::user();

        if ($employee->role == 'cashier') {
            // Cashiers can view all orders
            $orders = Order::orderBy('id', 'desc')->paginate(10);
        } elseif ($employee->role == 'waiter') {
            // Waiters can view their own orders
            $orders = $employee->orders()->orderBy('id', 'desc')->paginate(10);
        } else {
            // Handle other user roles or unauthorized access
            // For example, you can throw an exception or return an empty response
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return OrderResource::collection($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $data = $request->validated();

        $employee = Request::user();

        $order = Order::create([
            'order_number' => $data['order_number'],
            'table_id' => $data['table_id'],
            'employee_id' => $employee->id,
            'total' => 0,
        ]);

        $items = $request->input('items');
        $total = 0;

        foreach ($items as $item) {
            $total += $item['quantity'] * Food::find($item['food_id'])->price;

            $order->orderItems()->create([
                'food_id' => $item['food_id'],
                'quantity' => $item['quantity'],
                'price' => Food::find($item['food_id'])->price,
                'sub_total' => $item['quantity'] * Food::find($item['food_id'])->price,
            ]);
        }
        $order->total = $total;
        $order->save();

        return response()->json(['message' => 'Order created successfully'], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->orderItems()->delete();
        $order->delete();

        return response()->json(['message' => 'Order deleted successfully'], 200); 
    }
}
