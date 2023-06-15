<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('
            CREATE OR REPLACE TRIGGER trg_delete_to_deduct_food_quantity_on__order
            AFTER DELETE ON order_items 
            FOR EACH ROW 
            BEGIN 
                UPDATE foods 
                SET quantity = quantity + OLD.quantity 
                WHERE id = OLD.food_id; 
            END;
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trg_delete_to_deduct_food_quantity_on__order');
    }
};
