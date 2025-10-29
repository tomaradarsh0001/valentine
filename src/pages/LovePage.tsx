import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Flower2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LovePage() {
  const [showProposal, setShowProposal] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 768;
  const isSmallMobile = windowSize.width < 480;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 via-rose-200 to-pink-200 overflow-hidden relative flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isMobile ? 20 : 30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * windowSize.width,
              y: -50,
              rotate: Math.random() * 360
            }}
            animate={{
              y: windowSize.height + 50,
              rotate: Math.random() * 360 + 720,
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            {i % 3 === 0 ? (
              <Heart
                className="text-rose-400"
                size={isMobile ? Math.random() * 20 + 12 : Math.random() * 25 + 15}
                fill="currentColor"
              />
            ) : i % 3 === 1 ? (
              <Flower2
                className="text-pink-400"
                size={isMobile ? Math.random() * 20 + 12 : Math.random() * 25 + 15}
              />
            ) : (
              <Star
                className="text-red-400"
                size={isMobile ? Math.random() * 15 + 8 : Math.random() * 20 + 10}
                fill="currentColor"
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl w-full">
        <AnimatePresence mode="wait">
          {!showProposal ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mb-6 md:mb-8"
              >
                <Heart
                  className="text-red-500 mx-auto"
                  size={isMobile ? 100 : 150}
                  fill="currentColor"
                  strokeWidth={1}
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-8xl font-bold text-red-600 mb-4 md:mb-6 drop-shadow-2xl leading-tight"
              >
                Anushka
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg md:text-2xl lg:text-3xl text-rose-700 mb-8 md:mb-12 font-medium px-2"
              >
                There's something I need to tell you...
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                whileHover={{
                  scale: isMobile ? 1.05 : 1.15,
                  boxShadow: "0 15px 30px rgba(239, 68, 68, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProposal(true)}
                className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-8 md:px-16 py-4 md:py-5 rounded-full text-lg md:text-2xl font-bold shadow-xl hover:shadow-red-300 transition-all duration-300 relative overflow-hidden group w-full max-w-xs md:max-w-none"
              >
                <span className="relative z-10">Click Here</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-rose-600 to-red-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>
          ) : !answered ? (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl mx-2"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-6 md:mb-8"
              >
                <div className="relative inline-block">
                  <Heart
                    className="text-red-500"
                    size={isMobile ? 80 : 100}
                    fill="currentColor"
                  />
                  {[...Array(isMobile ? 8 : 12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2"
                      animate={{
                        scale: [0, 1.5, 0],
                        x: Math.cos((i * Math.PI * 2) / (isMobile ? 8 : 12)) * (isMobile ? 60 : 80),
                        y: Math.sin((i * Math.PI * 2) / (isMobile ? 8 : 12)) * (isMobile ? 60 : 80),
                        opacity: [1, 0],
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeOut"
                      }}
                    >
                      <Sparkles className="text-yellow-400" size={isMobile ? 16 : 20} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-600 mb-4 md:mb-6 leading-tight"
              >
                Dear Anushka,
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-base md:text-xl lg:text-2xl text-gray-700 mb-6 md:mb-8 space-y-3 md:space-y-4 leading-relaxed"
              >
                <p>Every moment with you feels like magic.</p>
                <p>Your smile brightens my darkest days.</p>
                <p>Your kindness inspires me to be better.</p>
                <p className="font-bold text-rose-600 text-xl md:text-3xl mt-4 md:mt-6">
                  Will you be mine forever?
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col gap-4 md:gap-6 justify-center items-center mt-6 md:mt-8"
              >
                <motion.button
                  whileHover={{ scale: isMobile ? 1.05 : 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setAnswered(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 md:px-16 py-4 md:py-5 rounded-full text-lg md:text-2xl font-bold shadow-lg hover:shadow-xl hover:shadow-green-300 transition-all duration-300 w-full max-w-xs md:max-w-none"
                >
                  Yes! 💖
                </motion.button>

                <motion.button
                  whileHover={{ scale: isMobile ? 1.05 : 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setAnswered(true)}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 md:px-16 py-4 md:py-5 rounded-full text-lg md:text-2xl font-bold shadow-lg hover:shadow-xl hover:shadow-pink-300 transition-all duration-300 w-full max-w-xs md:max-w-none"
                >
                  Absolutely! 💕
                </motion.button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-rose-500 mt-6 md:mt-8 text-base md:text-lg font-medium italic"
              >
                - With all my love, Shubh
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-full"
            >
              {[...Array(isMobile ? 30 : 50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: windowSize.width / 2,
                    y: windowSize.height / 2,
                    scale: 0
                  }}
                  animate={{
                    x: Math.random() * windowSize.width,
                    y: Math.random() * windowSize.height,
                    scale: [0, 1.5, 1],
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.02,
                    ease: "easeOut"
                  }}
                >
                  <Heart className="text-red-500" size={isMobile ? 20 : 30} fill="currentColor" />
                </motion.div>
              ))}

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-16 shadow-2xl mx-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mb-6 md:mb-8"
                >
                  <Heart
                    className="text-red-500 mx-auto"
                    size={isMobile ? 80 : 120}
                    fill="currentColor"
                  />
                </motion.div>

                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-red-600 mb-4 md:mb-6 leading-tight">
                  I Love You! 💖
                </h2>

                <p className="text-xl md:text-3xl text-rose-600 font-medium mb-6 md:mb-8">
                  You've made me the happiest person alive!
                </p>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex justify-center gap-3 md:gap-4 mb-6 md:mb-8"
                >
                  {[...Array(isMobile ? 5 : 7)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    >
                      <Heart className="text-red-500" size={isMobile ? 30 : 40} fill="currentColor" />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-lg md:text-2xl text-gray-700 mt-8 md:mt-12 font-medium"
                >
                  Forever and always, Anushka 💕
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}