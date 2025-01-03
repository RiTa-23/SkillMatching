<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;

class CompanyController extends Controller
{
    public function getCompanies()
    {
        $companies = Company::all();
        return response()->json($companies, 200);
    }
}
