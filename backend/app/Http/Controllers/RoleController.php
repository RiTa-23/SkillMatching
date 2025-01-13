<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{
    public function getRole()
    {
    return Role::select('role_id', 'role_name')->get();
    }
}
