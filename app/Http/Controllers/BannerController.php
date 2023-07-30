<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class BannerController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $banners = Banner::all();

        return Inertia::render('banner/ReadBanner', [
            'banners' => $banners,
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
        return Inertia::render('banner/CreateBanner', [
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
            'deskripsi' => 'nullable',
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $gambarPath = null;
        if ($request->hasFile('gambar')) {
            $gambar = $request->file('gambar');
            $gambarPath = 'images/banner/' . time() . '.' . $gambar->getClientOriginalExtension();
            $gambar->move(public_path('images/banner'), $gambarPath);
        }

        \App\Models\Banner::create([
            'nama' => $request->nama,
            'deskripsi' => $request->deskripsi,
            'gambar' => $gambarPath,
        ]);

        return redirect()->route('banners.index')->with('success', 'Banner created successfully.');
    }

    /**
     * edit
     *
     * @param  mixed $post
     * @return void
     */
    public function edit(Banner $banner)
    {
        $user = auth()->user();
        return inertia('banner/UpdateBanner', [
            'banners' => $banner,
            'user' => $user,
        ]);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Banner  $banner
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Banner $banner)
    {

        $request->validate([
            'nama' => 'required',
            'deskripsi' => 'nullable',
            'gambar' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Validate that the uploaded file is an image and within certain size limits
        ]);

        // Update fields
        $banner->nama = $request->nama;
        $banner->deskripsi = $request->deskripsi;

        if ($request->hasFile('gambar')) {
            // Delete old image if it exists
            if ($banner->gambar && file_exists(public_path($banner->gambar))) {
                unlink(public_path($banner->gambar));
            }

            // Upload new image
            $gambar = $request->file('gambar');
            $gambarPath = 'images/banner/' . time() . '.' . $gambar->getClientOriginalExtension();
            $gambar->move(public_path('images/banner'), $gambarPath);
            $banner->gambar = $gambarPath;
        }

        // Save the updated Barang
        $banner->save();

        return redirect()->route('banners.index')->with('success', 'Banner updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Banner  $banner
     * @return \Illuminate\Http\Response
     */
    public function destroy(Banner $banner)
    {
        // Hapus gambar terlebih dahulu jika ada
        if ($banner->gambar && file_exists(public_path($banner->gambar))) {
            unlink(public_path($banner->gambar));
        }

        $banner->delete();

        return redirect()->route('banners.index')->with('success', 'Banner deleted successfully.');
    }
}
