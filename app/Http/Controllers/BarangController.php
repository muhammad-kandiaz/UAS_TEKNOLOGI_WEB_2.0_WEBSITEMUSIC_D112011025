<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class BarangController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $barangs = Barang::all();

        return Inertia::render('barang/ReadBarang', [
            'barangs' => $barangs,
            'user' => $user,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $user = auth()->user();
        return Inertia::render('barang/CreateBarang', [
            'user' => $user,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'harga' => 'required',
            'deskripsi' => 'nullable',
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate that the uploaded file is an image and within certain size limits
        ]);

        $gambarPath = null;
        if ($request->hasFile('gambar')) {
            $gambar = $request->file('gambar');
            $gambarPath = 'images/barang/' . time() . '.' . $gambar->getClientOriginalExtension();
            $gambar->move(public_path('images/barang'), $gambarPath);
        }

        \App\Models\Barang::create([
            'nama' => $request->nama,
            'harga' => $request->harga,
            'deskripsi' => $request->deskripsi,
            'gambar' => $gambarPath,
        ]);

        return redirect()->route('barangs.index')->with('success', 'Barang created successfully.');
    }


    /**
     * edit
     *
     * @param  mixed $post
     * @return void
     */
    public function edit(Barang $barang)
    {
        $user = auth()->user();
        return inertia('barang/UpdateBarang', [
            'barangs' => $barang,
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Barang  $Barang
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Barang $barang)
    {
        $request->validate([
            'nama' => 'required',
            'harga' => 'required',
            'deskripsi' => 'nullable',
            'gambar' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Validate that the uploaded file is an image and within certain size limits
        ]);

        // Update fields
        $barang->nama = $request->nama;
        $barang->harga = $request->harga;
        $barang->deskripsi = $request->deskripsi;

        if ($request->hasFile('gambar')) {
            // Delete old image if it exists
            if ($barang->gambar && file_exists(public_path($barang->gambar))) {
                unlink(public_path($barang->gambar));
            }

            // Upload new image
            $gambar = $request->file('gambar');
            $gambarPath = 'images/barang/' . time() . '.' . $gambar->getClientOriginalExtension();
            $gambar->move(public_path('images/barang'), $gambarPath);
            $barang->gambar = $gambarPath;
        }

        // Save the updated Barang
        $barang->save();

        return redirect()->route('barangs.index')->with('success', 'Barang updated successfully.');
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Barang  $Barang
     * @return \Illuminate\Http\Response
     */
    public function destroy(Barang $barang)
    {
        // Hapus gambar terlebih dahulu jika ada
        if ($barang->gambar && file_exists(public_path($barang->gambar))) {
            unlink(public_path($barang->gambar));
        }

        // Hapus data Barang dari database
        $barang->delete();

        return redirect()->route('barangs.index')->with('success', 'Barang deleted successfully.');
    }
}
