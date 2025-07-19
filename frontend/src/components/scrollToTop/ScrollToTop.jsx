import { useState, useEffect } from "react";

import { FaArrowUp } from "react-icons/fa";

import './scrollToTop.css';

export const ScrollToTop = () => {

    const [scrollProgress, setScrollProgress] = useState(0);
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = Math.min(1, scrollY / totalHeight);
            setScrollProgress(progress * 100);
            setShowTopBtn(scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {showTopBtn && (
                <div className="scroll-to-top" onClick={scrollToTop}>
                    <div className="scroll-to-top-inner">
                        <svg className="wave-svg" viewBox="0 0 60 60">
                            <defs>
                                <clipPath id="waveClip">
                                    <circle cx="30" cy="30" r="28" />
                                </clipPath>
                            </defs>
                            <g clipPath="url(#waveClip)">
                                <rect
                                    className="wave-fill"
                                    y={`${100 - scrollProgress}%`}
                                    width="60"
                                    height="100%"
                                />
                            </g>
                            <circle cx="30" cy="30" r="28" stroke="#03045e" strokeWidth="3" fill="none" />
                        </svg>
                        <FaArrowUp
                            className="top-icon"
                            style={{ color: scrollProgress > 45 ? "white" : "#03045e" }}
                        />
                    </div>
                </div>
            )}
        </>
    )
}