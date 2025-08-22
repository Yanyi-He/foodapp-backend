
import React from 'react';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import seafood from '../assets/seafood0.jpeg';
import chicken from '../assets/chicken.webp';
import baoyu from '../assets/baoyu.jpeg';
import zaocha from '../assets/zaocha.jpg';
import l3 from '../assets/lobster.jpg';
import l5 from '../assets/l5.jpg';
import l6 from '../assets/l6.jpg';
import l7 from '../assets/l7.jpg';

const Home: React.FC = () => {
    const slides = [
        { src: l7, alt: "l7", caption: "food showcase" },
        { src: l5, alt: "l5", caption: "food showcase" },
        { src: l6, alt: "l6", caption: "food showcase" },
        { src: l3, alt: "l3", caption: "food showcase" },
    ];
    return (
        <>
            <header className="hero">
                <div className="container">
                    <div className="container hero-left">
                        <img src={logo} alt="Mr.He's Kitchen Logo" className="logo" />
                        <div className="hero-text">
                            <h1> Authentic Cantonese Food</h1>
                            <p>
                                Our kitchen serves delicious, authentic and affordable Cantonese
                                food. The freshest ingredients require only the simplest cooking.
                                You can also taste native food in a foreign country.
                            </p>
                        </div>
                    </div>

                    <div className="actions">
                        <Link className="btn btn-primary" to="/menu">Make Orders</Link>
                        <Link className="btn btn-outline" to="/orders">Check my Orders</Link>
                    </div>
                </div>
            </header>

            <section className="section">
                <div className="container">
                    <h2>Why Choose Us？</h2>
                    <p className="lead">We use the freshest ingredients and provide the most authentic taste.We value your safety and health.</p>
                    <div className="grid">
                        <div className="card">
                            <h3>Seafood</h3>
                            <p>Delicious and fresh seafood dishes. You can taste the selfless gift of the sea</p>
                            <img src={seafood} alt="seafood0" className="dish-img" />
                        </div>
                        <div className="card">
                            <h3>Meat</h3>
                            <p>Serving classic Cantonese dishes: plain chicken, BBQ pork, roast duck, etc</p>
                            <img src={chicken}
                                alt="chicken"
                                className="dish-img" />
                        </div>
                        <div className="card">
                            <h3>Soup</h3>
                            <p>Lao Huo Tang is a traditional Cantonese dish, healthy and delicious. We offer a variety of old fire soups.</p>
                            <img src={baoyu}
                                alt="baoyu"
                                className="dish-img" />
                        </div>
                        <div className="card">
                            <h3>Special Dishes</h3>
                            <p>We also serve Cantonese specialties, such as dim sum, Chang fen, special dishes, etc.</p>
                            <img src={zaocha}
                                alt="zaocha"
                                className="dish-img" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="section ppt">
                <div className="container">
                    <h2 style={{ marginBottom: 12 }}>Chef’s Picks</h2>
                    <p className="lead" style={{ marginBottom: 16, color: "var(--muted)" }}>
                        Seasonal recommendations — taste the classics of Cantonese cuisine.
                    </p>

                    <Carousel slides={slides} interval={4000} />
                </div>
            </section>
            <section className="section alt">
                <div className="container">
                    <h2>Next Step</h2>
                    <p className="lead">First register and log in, then go to the menu page to select dishes, submit orders, and finally pay or cancel in "My Orders".</p>
                    <div className="actions">
                        <Link className="btn btn-primary" to="/register">Register Now</Link>
                        <Link className="btn btn-outline" to="/login">Already Registered? Log In</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;

