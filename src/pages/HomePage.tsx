import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const messages = [
  "Anushka, you are so adorable",
  "Your smile lights up my world",
  "You are incredibly beautiful",
  "My love for you grows every day",
  "You make everything better",
  "You are my sunshine",
  "Your kindness touches my heart",
  "You are absolutely amazing"
];

export default function HomePage() {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-red-100 overflow-hidden relative flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              opacity: 0.5
            }}
            animate={{
              y: window.innerHeight + 20,
              x: Math.random() * window.innerWidth,
              rotate: 360,
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            <Heart className="text-rose-300" size={Math.random() * 30 + 20} fill="currentColor" />
          </motion.div>
        ))}

        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="text-yellow-400" size={20} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 1
          }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart
                className="text-rose-500 mx-auto"
                size={120}
                fill="currentColor"
                strokeWidth={1.5}
              />
            </motion.div>

            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2"
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1, 1, 0],
                  x: Math.cos((i * Math.PI * 2) / 8) * 100,
                  y: Math.sin((i * Math.PI * 2) / 8) * 100,
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              >
                <Star className="text-yellow-400" size={16} fill="currentColor" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          key={currentMessage}
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-rose-600 mb-4 drop-shadow-lg">
            {messages[currentMessage].split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            >
              <Heart
                className="text-red-400"
                size={32}
                fill="currentColor"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12"
        >
          <motion.a
            href="/love"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 20px 40px rgba(244, 63, 94, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-rose-500 to-red-500 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Something Special Awaits...
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-rose-400 text-sm font-medium">Made with love for Anushka</p>
      </motion.div>
    </div>
  );
}
