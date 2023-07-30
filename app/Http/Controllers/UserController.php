<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function showRegisterForm()
    {
        return inertia('Register');
    }

    public function register(Request $request)
    {
        // Lakukan validasi dan logika penyimpanan data registrasi di sini
    }

    public function showLoginForm()
    {
        return inertia('Login');
    }

    public function login(Request $request)
    {
        // Lakukan validasi dan logika autentikasi di sini
    }

    public function showDashboard()
    {
        return inertia('Dashboard');
    }
}
