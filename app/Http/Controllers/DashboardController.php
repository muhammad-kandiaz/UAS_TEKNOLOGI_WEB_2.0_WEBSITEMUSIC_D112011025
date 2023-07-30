<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Banner;

class DashboardController extends Controller
{
    public function index()
    {
        // Get the authenticated user
        $user = auth()->user();
        $banners = Banner::all();

        // Pass the user object to the 'Dashboard' view and render it using Inertia
        return Inertia::render('Dashboard', ['user' => $user, 'banners' => $banners,]);
    }
}
