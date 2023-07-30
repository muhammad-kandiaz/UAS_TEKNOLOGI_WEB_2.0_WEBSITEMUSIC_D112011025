import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import Navbar from '../../Components/Navbar';
import SideNavbar from '../../Components/SideNavbar';
import Footer from '../../Components/Footer';
import { Inertia } from '@inertiajs/inertia';

const ReadBanner = ({ user, barangs, session }) => {

    const deletePost = async (id) => {
        await Inertia.delete(`/barangs/${id}`);
        // You may want to reload the page or update the banner list after deleting.
        // For example, you can use Inertia.reload() or fetch the updated data again.
    };

    // Fungsi untuk format harga menjadi format rupiah tanpa ,00
    const formatRupiah = (harga) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(harga);
    };

    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <SideNavbar user={user} />
                </div>

                <div id="layoutSidenav_content">
                    <main>

                        <div className="table-responsive mt-4 mx-auto" style={{ maxWidth: '800px' }}>
                            <h1 className="text-center mb-4">Daftar Barang</h1>
                            <InertiaLink href="/barangs/create" className="btn btn-success mt-2 mb-3">
                                <i className="fas fa-plus-circle mr-1"></i> Tambah
                            </InertiaLink>
                            {session.success && (
                                <div className="alert alert-success border-0 shadow-sm rounded-3">
                                    {session.success}
                                </div>
                            )}
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nama</th>
                                        <th>Harga</th>
                                        <th>Deskripsi</th>
                                        <th>Gambar</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {barangs.map((barang) => (
                                        <tr key={barang.id}>
                                            <td>{barang.id}</td>
                                            <td>{barang.nama}</td>
                                            <td>{formatRupiah(barang.harga)}</td>
                                            <td>{barang.deskripsi}</td>
                                            <td>
                                                {barang.gambar && (
                                                    <img src={barang.gambar} alt={barang.nama} style={{ width: '100px' }} />
                                                )}
                                            </td>
                                            <td>
                                                <InertiaLink href={`barangs/${barang.id}/edit`} className="btn btn-primary btn-sm">
                                                    Edit
                                                </InertiaLink>
                                            </td>
                                            <td>

                                                <button className="btn btn-danger btn-sm" onClick={() => deletePost(barang.id)}>
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>

                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default ReadBanner;
