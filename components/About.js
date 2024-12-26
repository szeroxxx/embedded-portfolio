"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function About() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-12 sm:py-16"
      style={{
        backgroundImage: "url('/bg3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30" />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start relative z-10 gap-8 lg:gap-12"
      >
        {/* Profile Image and Name - Left Side */}
        <motion.div
          className="w-full lg:w-1/3 flex flex-col items-center lg:items-start"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-75 animate-pulse" />
            <img
              src="/profilepic.jpg"
              alt="Profile Photo"
              className="relative rounded-full w-48 h-48 sm:w-64 sm:h-64 object-cover border-2 border-white/50"
            />
          </motion.div>

          {/* Name with cool styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-center lg:text-left w-full"
          >
            <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 tracking-wider mb-2">
              Dhara Rajpura
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-300 text-sm tracking-widest uppercase"
            >
              Embedded Systems Expert
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Content - Right Side */}
        <motion.div
          className="w-full lg:w-2/3 text-center lg:text-left"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 inline-block"
              animate={{
                backgroundPosition: ["0%", "100%"],
                color: ["#60A5FA", "#A855F7"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Embedded Hardware
            </motion.span>
            <span className="text-white block sm:inline"> Engineer.</span>
          </h1>
          <motion.p
            className="text-base sm:text-lg text-gray-300 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Passionate about creating innovative solutions through hardware
            design and implementation. Turning complex problems into elegant
            engineering solutions.
          </motion.p>

          {/* Buttons container */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold 
                       hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            >
              Explore My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-white/20 rounded-full text-white font-semibold 
                       hover:bg-white/10 transition-all duration-300"
            >
              Contact Me
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold 
                       hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            >
              About me
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(windowWidth > 768 ? 20 : 10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            animate={{
              y: [-20, windowWidth ? windowWidth : 1000],
              x: Math.random() * (windowWidth || 1000),
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </section>
  );
}
