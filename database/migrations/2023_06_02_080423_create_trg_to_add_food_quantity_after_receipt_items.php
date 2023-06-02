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
        CREATE OR REPLACE TRIGGER trg_to_add_food_quantity_after_receipt_items
        AFTER INSERT ON receipt_items 
        FOR EACH ROW 
        BEGIN 
            UPDATE foods 
            SET quantity = quantity + NEW.food_quantity 
            WHERE id = NEW.food_id; 
        END;
    ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trg_to_add_food_quantity_after_receipt_items');
    }
};
