// LandingPage.jsx
import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    FaUserFriends,
    FaImages,
    FaSearch,
    FaComments,
    FaUserShield,
    FaExchangeAlt
} from "react-icons/fa";

export default function LandingPage() {
    const sliderRef = useRef();

    const title = ["Connect", "Share", "Inspire"];
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => (prev + 1) % title.length);
        }, 2000);

        return () => clearInterval(interval); // cleanup on unmount
    }, [title.length]);

    useEffect(() => {
        // Initialize AOS
        AOS.init({ duration: 1000 });

        // Force AOS refresh after mount
        setTimeout(() => {
            AOS.refresh();
        }, 200);

        // Force slider to recalc on mount
        setTimeout(() => {
            if (sliderRef.current) {
                sliderRef.current.slickGoTo(0);
            }
        }, 300);
    }, []);

    const feedbacks = [
        "Amazing social media platform!",
        "I love the dark theme aesthetic.",
        "Best chat experience I've had online.",
        "The explore page is addictive!",
        "Switching between public and private is so smooth."
    ];

    const features = [
        {
            icon: <FaImages className="text-pink-400 text-3xl" />,
            title: "Multiple Image Posting",
            description:
                "Share multiple photos in a single post to tell your story vividly."
        },
        {
            icon: <FaUserFriends className="text-blue-400 text-3xl" />,
            title: "Engagement & Control",
            description:
                "Like, comment, and delete comments on your posts with ease."
        },
        {
            icon: <FaSearch className="text-green-400 text-3xl" />,
            title: "Advanced Search",
            description: "Find users by username or real name quickly."
        },
        {
            icon: <FaImages className="text-purple-400 text-3xl" />,
            title: "Explore Popular Posts",
            description: "View trending public posts with the most likes."
        },
        {
            icon: <FaComments className="text-yellow-400 text-3xl" />,
            title: "Mutual Chat",
            description:
                "Chat exclusively with mutual followers for privacy."
        },
        {
            icon: <FaUserShield className="text-red-400 text-3xl" />,
            title: "Privacy Control",
            description:
                "Easily switch between public and private account modes."
        },
        {
            icon: <FaExchangeAlt className="text-teal-400 text-3xl" />,
            title: "Smart Follow System",
            description:
                "Send, accept, or withdraw follow requests seamlessly."
        }
    ];

    const sliderSettings = {
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    return (
        <div className="bg-black text-white w-full min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">SocialSphere</h1>
                <div className="space-x-6">
                    <a href="#features" className="hover:text-pink-400 transition">
                        Features
                    </a>
                    <a href="#feedback" className="hover:text-pink-400 transition">
                        Feedback
                    </a>
                    <a href='/login' className="rounded-md transition py-1 px-3 hover:bg-white/10">
                        Login
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 md:px-20 pt-24">
                <div className="md:w-1/2 space-y-6" data-aos="fade-right">
                    <h2 className="text-8xl font-bold">
                        {title[count]}
                    </h2>
                    <p className="text-lg text-gray-300">
                        Experience a new era of social media where privacy meets engagement.
                    </p>
                    <button
                        className="px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-lg transition"
                        onClick={() => window.location.href = '/signup'}
                    >
                        Get Started
                    </button>
                </div>
                <div className="md:w-1/2 mt-10 md:mt-0" data-aos="fade-left">
                    <img
                        src="https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b"
                        alt="Social Media"
                        className="rounded-xl shadow-lg"
                    />
                </div>
            </section>

            {/* Feedback Carousel */}
            <section
                id="feedback"
                className="py-10"
                style={{ height: "20vh" }}
            >
                <div className="max-w-4xl mx-auto w-full bg-white/20 backdrop-blur-md p-6 rounded-xl">
                    <Slider ref={sliderRef} {...sliderSettings}>
                        {feedbacks.map((fb, index) => (
                            <div key={index}>
                                <p className="text-center text-xl italic">{`"${fb}"`}</p>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-20 px-6" >
                <h3 className="text-3xl font-bold text-center mb-10">Our Features</h3>
                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:scale-105 transition"

                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                            <p className="text-gray-300">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white/10 backdrop-blur-md text-center py-4 mt-auto border-t border-white/20">
                <p>© {new Date().getFullYear()} PulseLink. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
