<?php

namespace App\Policies;

use App\Models\Table;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TablePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user)
    {
        return $user->hasRole(['System Admin', 'Admin']);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Table $table)
    {
        return $user->hasRole(['System Admin', 'Admin']);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user)
    {
        return $user->hasRole(['System Admin', 'Admin']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Table $table)
    {
        return $user->hasRole(['System Admin', 'Admin']);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Table $table)
    {
        return $user->hasRole(['System Admin', 'Admin']);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Table $table)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Table $table)
    {
        //
    }
}
