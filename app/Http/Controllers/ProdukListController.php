<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Barang;

class ProdukListController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $barangs = Barang::all();

        return Inertia::render('ProdukList', [
            'barangs' => $barangs,
            'user' => $user,
        ]);
    }
}
