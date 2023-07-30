import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import SideNavbar from '../../Components/SideNavbar';
import Footer from '../../Components/Footer';
import { Inertia } from '@inertiajs/inertia';

const CreateBarang = ({ user }) => {
    // Define state
    const [nama, setNama] = useState('');
    const [harga, setHarga] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [gambarPreview, setGambarPreview] = useState(null); // State for preview image
    const [gambar, setGambar] = useState(null);

    // Function "storePost"
    const storePost = async (e) => {
        e.preventDefault();

        if (!gambar) {
            alert('Please select an image.');
            return;
        }

        // Create FormData object
        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('harga', harga);
        formData.append('deskripsi', deskripsi);
        formData.append('gambar', gambar);

        // Send data to server using Inertia.post
        Inertia.post('/barangs', formData, {
            // You may need to add headers for image upload, depending on your backend
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    // Function to preview the selected image
    const previewImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setGambarPreview(reader.result);
                setGambar(file); // Set the original file
            };
            reader.readAsDataURL(file);
        } else {
            setGambarPreview(null);
            setGambar(null);
        }
    };

    const handleBackButtonClick = () => {
        // Use Inertia's `visit` method to navigate back to the previous page
        Inertia.visit('/barangs', { method: 'get' }); // Replace '/previous-page-url' with the actual URL of the previous page
    };

    // Default image placeholder URL
    const imagePlaceholder = 'https://via.placeholder.com/500x500';

    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    {/* Pass appropriate user prop */}
                    <SideNavbar user={user} />
                </div>

                <div id="layoutSidenav_content">
                    <main>
                        <div className="container my-5 p-5">
                            <h1 className="mb-4">Tambah Barang</h1>

                            {/* Add form to capture data */}
                            <form onSubmit={storePost}>
                                <div className="mb-3">
                                    <label htmlFor="nama" className="form-label">Nama:</label>
                                    <input type="text" className="form-control" id="nama" name="nama" value={nama} onChange={(e) => setNama(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="harga" className="form-label">Harga:</label>
                                    <input type="number" className="form-control" id="harga" name="harga" value={harga} onChange={(e) => setHarga(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="deskripsi" className="form-label">Deskripsi:</label>
                                    <textarea className="form-control" id="deskripsi" name="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="gambar" className="form-label">Gambar:</label>
                                    <input type="file" className="form-control" id="gambar" onChange={previewImage} />
                                </div>
                                <div className="mb-3">
                                    {gambarPreview ? (
                                        <img src={gambarPreview} alt="Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
                                    ) : (
                                        <img src={imagePlaceholder} alt="Placeholder" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
                                    )}
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                    <button type="submit" className="btn btn-primary me-md-2">Tambah Barang</button>
                                    <button type="button" className="btn btn-secondary" onClick={handleBackButtonClick}>Back</button>
                                </div>
                            </form>
                        </div>
                    </main>

                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default CreateBarang;
