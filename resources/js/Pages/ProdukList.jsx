import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import SideNavbar from '../Components/SideNavbar';
import Footer from '../Components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProdukList = ({ user, barangs }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChangeSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter produk berdasarkan pencarian
    const filteredBarangs = barangs.filter((produk) =>
        produk.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                        <div className="album py-5 bg-light">
                            <div className="container">
                                <h1 className="text-center mb-4">List Alat Music</h1>
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        placeholder="Cari produk..."
                                        value={searchTerm}
                                        onChange={handleChangeSearch}
                                    />
                                </div>
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                                    {filteredBarangs.map((produk) => (
                                        <div key={produk.id} className="col">
                                            <div className="card shadow-sm">
                                                <img
                                                    src={produk.gambar}
                                                    alt={produk.nama}
                                                    className="bd-placeholder-img card-img-top"
                                                    width="100%"
                                                    height="225"
                                                />

                                                <div className="card-body">
                                                    <h3 className="card-title">{produk.nama}</h3>
                                                    <p className="card-text">{produk.deskripsi}</p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="btn-group">
                                                            <a
                                                                href="#"
                                                                className="btn btn-outline-secondary"
                                                                onClick={() => handleBeli(produk.id)}
                                                            >
                                                                <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '0.5rem' }} />
                                                                Beli
                                                            </a>
                                                        </div>
                                                        <small className="text-danger" style={{ fontSize: '1.1rem' }}> {formatRupiah(produk.harga)}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default ProdukList;
