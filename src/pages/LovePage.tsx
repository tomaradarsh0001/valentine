import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Flower2 } from 'lucide-react';
import { useState } from 'react';

export default function LovePage() {
  const [showProposal, setShowProposal] = useState(false);
  const [answered, setAnswered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 via-rose-200 to-pink-200 overflow-hidden relative flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -50,
              rotate: Math.random() * 360
            }}
            animate={{
              y: window.innerHeight + 50,
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
              <Heart className="text-rose-400" size={Math.random() * 25 + 15} fill="currentColor" />
            ) : i % 3 === 1 ? (
              <Flower2 className="text-pink-400" size={Math.random() * 25 + 15} />
            ) : (
              <Star className="text-red-400" size={Math.random() * 20 + 10} fill="currentColor" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
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
                className="mb-8"
              >
                <Heart
                  className="text-red-500 mx-auto"
                  size={150}
                  fill="currentColor"
                  strokeWidth={1}
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl md:text-8xl font-bold text-red-600 mb-6 drop-shadow-2xl"
              >
                Anushka
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-2xl md:text-3xl text-rose-700 mb-12 font-medium"
              >
                There's something I need to tell you...
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 25px 50px rgba(239, 68, 68, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProposal(true)}
                className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-16 py-5 rounded-full text-2xl font-bold shadow-2xl hover:shadow-red-300 transition-all duration-300 relative overflow-hidden group"
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
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  <Heart
                    className="text-red-500"
                    size={100}
                    fill="currentColor"
                  />
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2"
                      animate={{
                        scale: [0, 1.5, 0],
                        x: Math.cos((i * Math.PI * 2) / 12) * 80,
                        y: Math.sin((i * Math.PI * 2) / 12) * 80,
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
                      <Sparkles className="text-yellow-400" size={20} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl font-bold text-red-600 mb-6"
              >
                Dear Anushka,
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl md:text-2xl text-gray-700 mb-8 space-y-4 leading-relaxed"
              >
                <p>Every moment with you feels like magic.</p>
                <p>Your smile brightens my darkest days.</p>
                <p>Your kindness inspires me to be better.</p>
                <p className="font-bold text-rose-600 text-3xl mt-6">
                  Will you be mine forever?
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setAnswered(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-16 py-5 rounded-full text-2xl font-bold shadow-xl hover:shadow-2xl hover:shadow-green-300 transition-all duration-300"
                >
                  Yes! 💖
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setAnswered(true)}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-16 py-5 rounded-full text-2xl font-bold shadow-xl hover:shadow-2xl hover:shadow-pink-300 transition-all duration-300"
                >
                  Absolutely! 💕
                </motion.button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-rose-500 mt-8 text-lg font-medium italic"
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
            >
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                    scale: 0
                  }}
                  animate={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    scale: [0, 1.5, 1],
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.02,
                    ease: "easeOut"
                  }}
                >
                  <Heart className="text-red-500" size={30} fill="currentColor" />
                </motion.div>
              ))}

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-white/95 backdrop-blur-sm rounded-3xl p-16 shadow-2xl"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mb-8"
                >
                  <Heart
                    className="text-red-500 mx-auto"
                    size={120}
                    fill="currentColor"
                  />
                </motion.div>

                <h2 className="text-6xl md:text-7xl font-bold text-red-600 mb-6">
                  I Love You! 💖
                </h2>

                <p className="text-3xl text-rose-600 font-medium mb-8">
                  You've made me the happiest person alive!
                </p>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex justify-center gap-4"
                >
                  {[...Array(7)].map((_, i) => (
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
                      <Heart className="text-red-500" size={40} fill="currentColor" />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-2xl text-gray-700 mt-12 font-medium"
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
