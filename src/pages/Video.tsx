'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Play, Pause, Sparkles } from 'lucide-react';

// Create a simple Button component since shadcn/ui isn't working
const Button = ({
    children,
    className = '',
    variant = 'default',
    size = 'default',
    ...props
}: any) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all disabled:pointer-events-none disabled:opacity-50';

    const variantStyles = {
        default: 'bg-purple-600 text-white hover:bg-purple-700 rounded-md shadow',
        ghost: 'bg-transparent text-white hover:bg-purple-800/80 rounded-full backdrop-blur-sm',
    };

    const sizeStyles = {
        default: 'h-10 px-4 py-2 text-sm',
        lg: 'h-12 px-6 py-3 text-base',
        icon: 'h-12 w-12',
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
};

const videos = [
    {
        id: 1,
        url: 'images/videos/1.mp4',
        title: 'Romantic Sunset',
        description: 'A beautiful sunset to set the mood'
    },
    {
        id: 2,
        url: 'images/videos/2.mp4',
        title: 'Love in Motion',
        description: 'Capturing moments of pure romance'
    },
    {
        id: 3,
        url: 'images/videos/3.mp4',
        title: 'Heart & Soul',
        description: 'Feel the passion in every frame'
    },
    {
        id: 4,
        url: 'images/videos/4.mp4',
        title: 'Whispering Hearts',
        description: 'Where every heartbeat tells our story'
    },
    {
        id: 5,
        url: 'images/videos/5.mp4',
        title: 'Dancing in Moonlight',
        description: 'Moving to the rhythm of our love'
    },
    {
        id: 6,
        url: 'images/videos/6.mp4',
        title: 'Endless Embrace',
        description: 'Holding onto moments that last forever'
    },
    {
        id: 7,
        url: 'images/videos/7.mp4',
        title: 'Stolen Glances',
        description: 'Speaking volumes without saying a word'
    },
    {
        id: 8,
        url: 'images/videos/8.mp4',
        title: 'Promise of Tomorrow',
        description: 'Building dreams together, one day at a time'
    }
];

// Sparkle component for animated sparkles
const Sparkle = ({ style }: { style: React.CSSProperties }) => (
    <div
        className="absolute w-2 h-2 bg-white rounded-full animate-sparkle opacity-0"
        style={style}
    />
);

export default function VideosPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [liked, setLiked] = useState<Set<number>>(new Set());
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [sparkles, setSparkles] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

    // Generate sparkles
    useEffect(() => {
        const generateSparkles = () => {
            const newSparkles = [];
            const sparkleCount = isMobile ? 15 : 30;

            for (let i = 0; i < sparkleCount; i++) {
                newSparkles.push({
                    id: i,
                    style: {
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                    }
                });
            }
            setSparkles(newSparkles);
        };

        generateSparkles();
        const interval = setInterval(generateSparkles, 5000);

        return () => clearInterval(interval);
    }, [isMobile]);

    // Detect screen orientation and device type
    useEffect(() => {
        const checkOrientation = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            setIsLandscape(window.innerWidth > window.innerHeight);
        };

        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);

        return () => {
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying && !isTransitioning) {
                handleNext();
            }
        }, 8000);

        return () => clearInterval(interval);
    }, [isPlaying, currentIndex, isTransitioning]);

    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (video) {
                if (index === currentIndex && isPlaying) {
                    video.play().catch((error) => {
                        console.log('Video play error:', error);
                    });
                } else {
                    video.pause();
                    if (index !== currentIndex) {
                        video.currentTime = 0;
                    }
                }
            }
        });
    }, [currentIndex, isPlaying]);

    const handleNext = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex((prev) => (prev + 1) % videos.length);
            setTimeout(() => setIsTransitioning(false), 600);
        }
    };

    const handlePrev = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
            setTimeout(() => setIsTransitioning(false), 600);
        }
    };

    const toggleLike = (id: number) => {
        setLiked((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleVideoClick = (index: number) => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex(index);
            setTimeout(() => setIsTransitioning(false), 600);
        }
    };

    // Force landscape layout for all devices
    const getVideoStyles = () => {
        if (isMobile && isLandscape) {
            // Mobile landscape - full screen landscape experience
            return {
                mainVideo: "aspect-video w-full h-[70vh] max-h-[70vh]",
                thumbnailGrid: "grid-cols-4 gap-1",
                container: "py-1 px-1",
                showThumbnails: false,
                showHeader: false,
                compactUI: true
            };
        } else if (isMobile) {
            // Mobile portrait - still use landscape aspect ratio
            return {
                mainVideo: "aspect-video w-full max-w-2xl",
                thumbnailGrid: "grid-cols-2 gap-2",
                container: "py-4 px-2",
                showThumbnails: true,
                showHeader: true,
                compactUI: false
            };
        } else {
            // Desktop - landscape optimized
            return {
                mainVideo: "aspect-video w-full max-w-4xl",
                thumbnailGrid: "grid-cols-4 gap-3",
                container: "py-8 px-4",
                showThumbnails: true,
                showHeader: true,
                compactUI: false
            };
        }
    };

    const styles = getVideoStyles();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-800 to-pink-800 relative overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-animate"></div>

            {/* Animated Sparkles */}
            {sparkles.map((sparkle) => (
                <Sparkle key={sparkle.id} style={sparkle.style} />
            ))}

            {/* Floating Hearts Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-pink-300/20 animate-float"
                        style={{
                            left: `${20 + i * 10}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${15 + i * 2}s`,
                        }}
                    >
                        <Heart className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" />
                    </div>
                ))}
            </div>

            {/* Background pattern with animation */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDBjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-20 animate-pulse-slow"></div>

            <div className={`relative z-10 container mx-auto ${styles.container}`}>
                {/* Header */}
                {styles.showHeader && (
                    <div className="text-center mb-4 relative">
                        <div className="absolute -top-2 -left-2 animate-ping">
                            <Sparkles className="w-4 h-4 text-pink-300" />
                        </div>
                        <div className="absolute -top-2 -right-2 animate-ping" style={{ animationDelay: '1s' }}>
                            <Sparkles className="w-4 h-4 text-pink-300" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-2 md:gap-4 relative">
                            <Heart className="w-8 h-8 md:w-12 md:h-12 fill-pink-300 text-pink-300 animate-pulse" />
                            Memories
                            <Heart className="w-8 h-8 md:w-12 md:h-12 fill-pink-300 text-pink-300 animate-pulse" />
                        </h1>
                        <p className="text-lg text-purple-200 animate-pulse">Preety as Moon 🌙</p>
                    </div>
                )}

                <div className="max-w-6xl mx-auto relative">
                    {/* Main Video Player - Always Landscape */}
                    <div className={`relative mx-auto ${styles.mainVideo} rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-300/30 bg-black transform transition-all duration-500 hover:shadow-purple-500/30 hover:border-purple-300/50`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-purple-950/40 z-10 pointer-events-none"></div>

                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-20 animate-glow"></div>

                        <div className="relative w-full h-full">
                            {videos.map((video, index) => (
                                <div
                                    key={video.id}
                                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentIndex
                                        ? 'opacity-100 scale-100 z-10'
                                        : 'opacity-0 scale-95 z-0'
                                        }`}
                                >
                                    <video
                                        ref={(el) => {
                                            videoRefs.current[index] = el;
                                        }}
                                        className="w-full h-full object-cover"
                                        loop
                                        muted
                                        playsInline
                                        preload="auto"
                                    >
                                        <source src={video.url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            ))}
                        </div>

                        {/* Video Info Overlay */}
                        <div className={`absolute bottom-0 left-0 right-0 z-20 ${styles.compactUI ? 'p-2' : 'p-4 md:p-6'} bg-gradient-to-t from-purple-950 to-transparent`}>
                            <div className="flex items-end justify-between">
                                <div className="flex-1">
                                    <h2 className={`font-bold text-white mb-1 ${styles.compactUI ? 'text-sm' : 'text-xl md:text-3xl'}`}>
                                        {videos[currentIndex].title}
                                    </h2>
                                    {!styles.compactUI && (
                                        <p className="text-sm md:text-lg text-purple-200">
                                            {videos[currentIndex].description}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    variant="ghost"
                                    size={styles.compactUI ? "default" : "icon"}
                                    onClick={() => toggleLike(videos[currentIndex].id)}
                                    className={`transition-all duration-300 hover:scale-110 animate-pulse ${liked.has(videos[currentIndex].id)
                                        ? 'text-pink-400'
                                        : 'text-white'
                                        }`}
                                >
                                    <Heart
                                        className={`${styles.compactUI ? 'w-4 h-4' : 'w-6 h-6 md:w-8 md:h-8'} ${liked.has(videos[currentIndex].id) ? 'fill-current animate-bounce' : ''
                                            }`}
                                    />
                                </Button>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <Button
                            variant="ghost"
                            size={styles.compactUI ? "default" : "icon"}
                            onClick={handlePrev}
                            disabled={isTransitioning}
                            className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-purple-900/50 hover:bg-purple-800/80 text-white backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 ${styles.compactUI ? 'w-8 h-8' : 'w-10 h-10 md:w-14 md:h-14'
                                }`}
                        >
                            <ChevronLeft className={styles.compactUI ? "w-4 h-4" : "w-5 h-5 md:w-8 md:h-8"} />
                        </Button>

                        <Button
                            variant="ghost"
                            size={styles.compactUI ? "default" : "icon"}
                            onClick={handleNext}
                            disabled={isTransitioning}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-purple-900/50 hover:bg-purple-800/80 text-white backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 ${styles.compactUI ? 'w-8 h-8' : 'w-10 h-10 md:w-14 md:h-14'
                                }`}
                        >
                            <ChevronRight className={styles.compactUI ? "w-4 h-4" : "w-5 h-5 md:w-8 md:h-8"} />
                        </Button>

                        {/* Play/Pause Button */}
                        <Button
                            variant="ghost"
                            size={styles.compactUI ? "default" : "icon"}
                            onClick={() => setIsPlaying(!isPlaying)}
                            className={`absolute top-2 right-2 z-20 bg-purple-900/50 hover:bg-purple-800/80 text-white backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 ${styles.compactUI ? 'w-6 h-6' : 'w-8 h-8 md:w-12 md:h-12'
                                }`}
                        >
                            {isPlaying ? (
                                <Pause className={styles.compactUI ? "w-3 h-3" : "w-4 h-4 md:w-6 md:h-6"} />
                            ) : (
                                <Play className={styles.compactUI ? "w-3 h-3" : "w-4 h-4 md:w-6 md:h-6"} />
                            )}
                        </Button>

                        {/* Progress Indicator - Top Bar */}
                        <div className="absolute top-0 left-0 right-0 z-20 px-2 pt-2">
                            <div className="flex gap-1">
                                {videos.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`h-1 flex-1 rounded-full transition-all duration-500 ${index === currentIndex
                                            ? 'bg-pink-400 animate-pulse'
                                            : 'bg-purple-300/30'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Progress Dots - Hidden in compact mode */}
                    {!styles.compactUI && (
                        <div className="flex justify-center mt-4 gap-2">
                            {videos.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleVideoClick(index)}
                                    disabled={isTransitioning}
                                    className={`transition-all duration-300 rounded-full hover:scale-125 ${index === currentIndex
                                        ? 'w-8 bg-pink-400 shadow-lg shadow-pink-400/50 animate-pulse'
                                        : 'w-2 bg-purple-300/50 hover:bg-purple-300'
                                        } h-2 disabled:opacity-50`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Thumbnail Grid */}
                    {styles.showThumbnails && (
                        <div className={`mt-6 grid ${styles.thumbnailGrid}`}>
                            {videos.map((video, index) => (
                                <button
                                    key={video.id}
                                    onClick={() => handleVideoClick(index)}
                                    disabled={isTransitioning}
                                    className={`relative group rounded-lg overflow-hidden transition-all duration-300 aspect-video transform hover:scale-105 ${index === currentIndex
                                        ? 'ring-2 ring-pink-400 shadow-lg shadow-pink-400/30 scale-105 animate-pulse'
                                        : 'hover:shadow-lg opacity-70 hover:opacity-100'
                                        } disabled:opacity-50`}
                                >
                                    {/* Thumbnail glow effect */}
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>

                                    <video
                                        className="w-full h-full object-cover relative z-10"
                                        muted
                                        playsInline
                                    >
                                        <source src={video.url} type="video/mp4" />
                                    </video>
                                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 to-transparent flex items-end p-2 z-20">
                                        <p className="text-white text-xs font-semibold truncate">
                                            {video.title}
                                        </p>
                                    </div>
                                    {index === currentIndex && (
                                        <div className="absolute inset-0 border-2 border-pink-400 rounded-lg pointer-events-none z-30 animate-pulse"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Mobile Landscape Controls Info */}
                    {styles.compactUI && (
                        <div className="text-center mt-2">
                            <p className="text-purple-200 text-xs animate-pulse">
                                Swipe or use buttons to navigate
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-purple-950 to-transparent pointer-events-none"></div>

            {/* Add custom animations to global styles */}
            <style jsx global>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes sparkle {
                    0% { opacity: 0; transform: scale(0) rotate(0deg); }
                    50% { opacity: 1; transform: scale(1) rotate(180deg); }
                    100% { opacity: 0; transform: scale(0) rotate(360deg); }
                }
                
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
                }
                
                @keyframes glow {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 0.4; }
                }
                
                .bg-animate {
                    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
                    background-size: 400% 400%;
                    animation: gradient 15s ease infinite;
                }
                
                .animate-sparkle {
                    animation: sparkle 3s ease-in-out infinite;
                }
                
                .animate-float {
                    animation: float 20s linear infinite;
                }
                
                .animate-glow {
                    animation: glow 2s ease-in-out infinite;
                }
                
                .animate-pulse-slow {
                    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
}