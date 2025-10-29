'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Image.module.css';

export default function ImageComponent() {
    const [count, setCount] = useState(100);
    const [isCounting, setIsCounting] = useState(false);
    const [countdownVisible, setCountdownVisible] = useState(true);
    const [modalActive, setModalActive] = useState(false);

    const progressRef = useRef<HTMLDivElement>(null);
    const heartsRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Countdown functionality
    const handleSmash = () => {
        if (isCounting) return;

        setIsCounting(true);
        const newCount = count - 1;
        setCount(newCount);

        // Update progress bar
        if (progressRef.current) {
            progressRef.current.style.width = `${(100 - newCount)}%`;
        }

        // Create floating hearts
        createFloatingHearts();

        // Check if countdown is complete
        if (newCount <= 0) {
            setTimeout(() => {
                setCountdownVisible(false);
                initCarousel();
            }, 500);
        }

        // Reset counting flag
        setTimeout(() => setIsCounting(false), 50);
    };

    const createFloatingHearts = () => {
        if (!heartsRef.current) return;

        const heart = document.createElement('div');
        heart.className = styles.countdownHeart;
        heart.innerHTML = '❤️';

        const x = Math.random() * 120;
        const y = Math.random() * 120;

        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;

        heartsRef.current.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1000);
    };

    // Modal functionality
    const openModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        setModalActive(true);
    };

    const closeModal = () => {
        setModalActive(false);
    };

    // Carousel functionality
    const initCarousel = () => {
        if (!carouselRef.current) return;

        let progress = 0;
        let startX = 0;
        let active = 0;
        let isDown = false;

        const speedWheel = 0.02;
        const speedDrag = -0.1;

        const $items = carouselRef.current.querySelectorAll(`.${styles.carouselItem}`);
        const $cursors = document.querySelectorAll(`.${styles.cursor}`);

        const getZindex = (array: NodeListOf<Element>, index: number) => {
            return Array.from(array).map((_, i) =>
                (index === i) ? array.length : array.length - Math.abs(index - i)
            );
        };

        const displayItems = (item: Element, index: number, active: number) => {
            const zIndex = getZindex($items, active)[index];
            (item as HTMLElement).style.setProperty('--zIndex', zIndex.toString());
            (item as HTMLElement).style.setProperty('--active', ((index - active) / $items.length).toString());
        };

        const animate = () => {
            progress = Math.max(0, Math.min(progress, 100));
            active = Math.floor(progress / 100 * ($items.length - 1));

            $items.forEach((item, index) => displayItems(item, index, active));
        };

        animate();

        $items.forEach((item, i) => {
            if (i !== $items.length - 1) {
                item.addEventListener('click', () => {
                    progress = (i / $items.length) * 100 + 10;
                    animate();
                });
            }
        });

        const handleWheel = (e: WheelEvent) => {
            const wheelProgress = e.deltaY * speedWheel;
            progress = progress + wheelProgress;
            animate();
        };

        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
            const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;

            if (e.type === 'mousemove') {
                $cursors.forEach(($cursor) => {
                    ($cursor as HTMLElement).style.transform = `translate(${clientX}px, ${clientY}px)`;
                });
            }

            if (!isDown) return;
            const mouseProgress = (clientX - startX) * speedDrag;
            progress = progress + mouseProgress;
            startX = clientX;
            animate();
        };

        const handleMouseDown = (e: MouseEvent | TouchEvent) => {
            isDown = true;
            startX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
        };

        const handleMouseUp = () => {
            isDown = false;
        };

        // Add event listeners
        document.addEventListener('wheel', handleWheel);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchstart', handleMouseDown);
        document.addEventListener('touchmove', handleMouseMove);
        document.addEventListener('touchend', handleMouseUp);

        // Cleanup function
        return () => {
            document.removeEventListener('wheel', handleWheel);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchstart', handleMouseDown);
            document.removeEventListener('touchmove', handleMouseMove);
            document.removeEventListener('touchend', handleMouseUp);
        };
    };

    // Background elements
    useEffect(() => {
        const createBackgroundElements = () => {
            const background = document.querySelector(`.${styles.background}`);
            if (!background) return;

            // Create flowers
            for (let i = 0; i < 15; i++) {
                const flower = document.createElement('div');
                flower.className = styles.flower;
                flower.innerHTML = '🌸';
                flower.style.left = Math.random() * 100 + 'vw';
                flower.style.animationDelay = Math.random() * 15 + 's';
                background.appendChild(flower);
            }

            // Create hearts
            for (let i = 0; i < 20; i++) {
                const heart = document.createElement('div');
                heart.className = styles.heart;
                heart.innerHTML = '❤️';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDelay = Math.random() * 20 + 's';
                heart.style.top = '100vh';
                background.appendChild(heart);
            }

            // Create sparkles
            for (let i = 0; i < 30; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = styles.sparkle;
                sparkle.style.left = Math.random() * 100 + 'vw';
                sparkle.style.top = Math.random() * 100 + 'vh';
                sparkle.style.animationDelay = Math.random() * 3 + 's';
                background.appendChild(sparkle);
            }

            // Create glitter
            for (let i = 0; i < 25; i++) {
                const glitter = document.createElement('div');
                glitter.className = styles.glitter;
                glitter.style.left = Math.random() * 100 + 'vw';
                glitter.style.top = Math.random() * 100 + 'vh';
                glitter.style.animationDelay = Math.random() * 4 + 's';
                background.appendChild(glitter);
            }
        };

        createBackgroundElements();
    }, []);

    // Initialize carousel when countdown completes
    useEffect(() => {
        if (!countdownVisible) {
            const cleanup = initCarousel();
            return cleanup;
        }
    }, [countdownVisible]);

    // Close modal with Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && modalActive) {
                setModalActive(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [modalActive]);

    return (
        <>
            {/* Countdown Screen */}
            <div className={`${styles.countdownScreen} ${!countdownVisible ? styles.hidden : ''}`}>
                <h1 className={styles.countdownTitle}>Smash Me 100 Times!</h1>
                <button className={styles.smashButton} onClick={handleSmash}>
                    <div className={styles.countdownNumber}>{count}</div>
                    <div className={styles.smashText}>Smash Me!</div>
                </button>
                <div className={styles.countdownProgress}>
                    <div
                        ref={progressRef}
                        className={styles.countdownProgressBar}
                    ></div>
                </div>
                <div ref={heartsRef} className={styles.countdownHearts}></div>
            </div>

            {/* Background elements */}
            <div className={styles.background}>
                <div className={styles.colorTransition}></div>
            </div>

            <div ref={carouselRef} className={styles.carousel}>
                {/* Carousel Items */}
                {[
                    { title: "Hi 👋", num: "01", image: "/images/1.jpeg" },
                    { title: "I want to tell you Something 😍", num: "02", image: "/images/2.jpeg" },
                    { title: "Please Keep Dragging 😊", num: "03", image: "/images/3.jpeg" },
                    { title: "You are Amazing 🤩", num: "04", image: "/images/4.jpeg" },
                    { title: "Most Beautiful Person on Earth 💯", num: "05", image: "/images/5.jpeg" },
                    { title: "And Cutest 🎀", num: "06", image: "/images/6.jpeg" },
                    { title: "And Since i met You 😗", num: "07", image: "/images/7.jpeg" },
                    { title: "I feel very Lucky Everyday 😇", num: "08", image: "/images/8.jpeg" },
                    { title: "and I have Crush on You 🥰", num: "09", image: "/images/9.jpeg" },
                    { title: "I love You ❤️", num: "10", image: "/images/10.jpeg" },
                ].map((item, index) => (
                    <div key={index} className={styles.carouselItem}>
                        <div className={styles.carouselBox}>
                            <div className={styles.title}>{item.title}</div>
                            <div className={styles.num}>{item.num}</div>
                            <img src={item.image} alt={item.title} />
                        </div>
                    </div>
                ))}

                {/* Last item with modal trigger */}
                <div className={styles.carouselItem}>
                    <div className={styles.carouselBox} onClick={openModal}>
                        <div className={styles.floatingHearts}>💖💕💗</div>
                        <div className={styles.title}>Your Special Surprise!</div>
                        <button className={styles.clickMeBtn} onClick={openModal}>
                            Click Me 💝
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <div className={`${styles.modalOverlay} ${modalActive ? styles.active : ''}`} onClick={closeModal}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <button className={styles.modalClose} onClick={closeModal}>✕</button>
                    <div className={`${styles.modalDecoration} ${styles.decorationTopLeft}`}>🌸</div>
                    <div className={`${styles.modalDecoration} ${styles.decorationTopRight}`}>💖</div>
                    <div className={`${styles.modalDecoration} ${styles.decorationBottomLeft}`}>🌹</div>
                    <div className={`${styles.modalDecoration} ${styles.decorationBottomRight}`}>✨</div>

                    <h2 className={styles.modalTitle}>My Dearest Love 💕</h2>
                    <p className={styles.modalText}>
                        Hey Riya ❤️,
                        I just want you to know how deeply I love you and how much you mean to me 💞. Every single moment with
                        you feels special — from our little talks to all those memories we&apos;ve made as neighbours 🌸.
                        <br /><br />
                        I still
                        smile thinking about the way you used to admire me while I was cleaning my car 🚗✨ or standing with my
                        friends outside the house 😍. Every memory with you is like a scene from my favourite story, and I can&apos;t
                        wait to create even more beautiful ones together 💫. Your touch, your smile, your presence — everything
                        about you feels divine 💖. You&apos;re my peace, my happiness, and my forever love ❤️‍🔥.
                    </p>
                    <div className={styles.modalHearts}>
                        <div className={styles.modalHeart}>❤️</div>
                        <div className={styles.modalHeart}>💖</div>
                        <div className={styles.modalHeart}>💕</div>
                        <div className={styles.modalHeart}>💗</div>
                        <div className={styles.modalHeart}>💓</div>
                    </div>
                </div>
            </div>

            <div className={styles.cursor}></div>
            <div className={`${styles.cursor} ${styles.cursor2}`}></div>
        </>
    );
}