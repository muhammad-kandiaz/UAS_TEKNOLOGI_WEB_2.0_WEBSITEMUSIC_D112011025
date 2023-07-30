import React from 'react';
import Navbar from '../Components/Navbar';
import SideNavbar from '../Components/SideNavbar';
import Footer from '../Components/Footer';

const Dashboard = ({ user, banners }) => {
    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <SideNavbar user={user} />
                </div>
                <div id="layoutSidenav_content">
                    <main>

                        {/* Display the carousel */}
                        <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                {banners.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        data-bs-target="#myCarousel"
                                        data-bs-slide-to={index.toString()}
                                        className={index === 0 ? "active" : ""}
                                        aria-current={index === 0 ? "true" : "false"}
                                        aria-label={`Slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                            <div className="carousel-inner">
                                {banners.map((banner, index) => (
                                    <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                        <div className="carousel-overlay">
                                            <img src={banner.gambar} alt={banner.nama} style={{ width: '100%', height: '100%' }} />
                                        </div>
                                        <div className="container">
                                            <div className="carousel-caption text-center align-items-center">
                                                <h1>{banner.nama}</h1>
                                                <p>{banner.deskripsi}</p>
                                                {/* <p><a className="btn btn-lg btn-primary" href="#">Lihat Produk</a></p> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        {/* Check if the 'user' property exists and has the 'name' property */}
                        {user && user.name && (
                            <div className="container atas-5 bawah-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-8 text-center">
                                        <h1 className="display-4 mb-4" style={{ fontSize: '3rem' }}>Welcome, {user.name}!</h1>
                                        <p className="lead">You are now logged in to your dashboard.</p>
                                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod nulla at risus posuere, in ultrices dolor tincidunt. Nam interdum, purus ac fermentum fermentum, lectus metus volutpat mauris.</p>
                                        {/* You can add more content or components here */}
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* <hr className="featurette-divider"></hr> */}
                        <div className="row featurette mt-5  p-5">
                            <div className="col-md-7">
                                <h2 className="featurette-heading">Carilah Alat Musikmu <span class="text-muted">Dengan Berbagai Melodi</span></h2>
                                <p></p>
                                <p></p>
                                <p className="lead">Dengan setiap dentingan not, musik mengisi ruang dengan harmoni yang mempesona, menciptakan perpaduan indah dari melodi dan irama, mengekspresikan perasaan dan cerita yang tak terungkapkan dalam kata-kata, dan menjalin ikatan emosional yang tak tergantikan antara para pencipta dan pendengarnya.</p>
                            </div>
                            <div className="col-md-5">
                                <img src="images/dashboard.jpg" alt="Example" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" />
                            </div>
                        </div>
                    </main>

                    <Footer />
                </div>
            </div>
            {/* CSS Styles */}
            <style>
                {`
                    .bd-placeholder-img {
                        font-size: 1.125rem;
                        text-anchor: middle;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        user-select: none;
                    }
                
                    @media (min-width: 768px) {
                        .bd-placeholder-img-lg {
                        font-size: 3.5rem;
                        }
                    }
                    /* GLOBAL STYLES
                    -------------------------------------------------- */
                    /* Padding below the footer and lighter body text */
                    body {
                        // padding-top: 3rem;
                        padding-bottom: 3rem;
                        color: #5a5a5a;
                    }

                    /* CUSTOMIZE THE CAROUSEL
                    -------------------------------------------------- */
                    /* Carousel base class */
                    .carousel {
                        margin-bottom: 4rem;
                    }
                    /* Since positioning the image, we need to help out the caption */
                    .carousel-caption {
                        bottom: 3rem;
                        z-index: 10;
                    }

                    /* Declare heights because of positioning of img element */
                    .carousel-item {
                        height: 32rem;
                    }
                    .carousel-item > img {
                        position: absolute;
                        top: 0;
                        left: 0;
                        min-width: 100%;
                        height: 32rem;
                    }

                    /* MARKETING CONTENT
                    -------------------------------------------------- */
                    /* Center align the text within the three columns below the carousel */
                    .marketing .col-lg-4 {
                        margin-bottom: 1.5rem;
                        text-align: center;
                    }
                    .marketing h2 {
                        font-weight: 400;
                    }
                    /* rtl:begin:ignore */
                    .marketing .col-lg-4 p {
                        margin-right: .75rem;
                        margin-left: .75rem;
                    }
                    /* rtl:end:ignore */

                    /* Featurettes
                    ------------------------- */
                    .featurette-divider {
                        margin: 5rem 0; /* Space out the Bootstrap <hr> more */
                    }

                    /* Thin out the marketing headings */
                    .featurette-heading {
                        font-weight: 300;
                        line-height: 1;
                        /* rtl:remove */
                        letter-spacing: -.05rem;
                    }

                    /* RESPONSIVE CSS
                    -------------------------------------------------- */
                    @media (min-width: 40em) {
                        /* Bump up size of carousel content */
                        .carousel-caption p {
                            margin-bottom: 1.25rem;
                            font-size: 1.25rem;
                            line-height: 1.4;
                        }
                        .featurette-heading {
                            font-size: 50px;
                        }
                    }

                    @media (min-width: 62em) {
                        .featurette-heading {
                            margin-top: 7rem;
                        }
                    }
                    .carousel-overlay {
                        position: relative;
                        width: 100%;
                        height: 32rem;
                    }
                    .carousel-overlay::before {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.7); /* Adjust the opacity value as needed */
                    }
                    .atas-5 {
                        margin-top: 10rem; /* Adjust the value as needed */
                    }
            
                    .bawah-5 {
                        margin-bottom: 10rem; /* Adjust the value as needed */
                    }
                `}
            </style>
        </div>
    );
};

export default Dashboard;


