'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Menu, X, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SkildAIWebsite() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDemoSlide, setCurrentDemoSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scale = Math.min(1.16, 1 + scrollY / 1400);
  const translateY = scrollY * 0.5;

  const demoSlides = [
    {
      id: 1,
      title: 'Your First Demo',
      description: 'Description for first demo',
      bgColor: 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400',
      videoUrl: '/videos/demo1.mp4'
    },
    {
      id: 2,
      title: 'Your Second Demo',
      description: 'Description for second demo',
      bgColor: 'bg-gradient-to-br from-blue-200 via-blue-300 to-gray-400',
      videoUrl: '/videos/demo2.mp4'
    },
    {
      id: 3,
      title: 'Your Third Demo',
      description: 'Description for third demo',
      bgColor: 'bg-gradient-to-br from-purple-200 via-purple-300 to-gray-400',
      videoUrl: '/videos/demo3.mp4'
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentDemoSlide((prev) => (prev === demoSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay, demoSlides.length]);

  const handlePrev = () => {
    setCurrentDemoSlide((prev) => (prev === 0 ? demoSlides.length - 1 : prev - 1));
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentDemoSlide((prev) => (prev === demoSlides.length - 1 ? 0 : prev + 1));
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentDemoSlide(index);
    setIsAutoPlay(false);
  };

  // Animation variants
  const sponsorContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const sponsorItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const sponsorHoverVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* NAVBAR */}
      <nav className="fixed w-full top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-full mx-0 px-4 py-2 flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img 
              src="/logo.png"
              alt="Autel Robotics" 
              className="h-12 object-contain"
            />
          </div>
          
          <div className="hidden md:flex gap-8 items-center">
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition">Blogs</a>
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition">Careers</a>
          </div>

          <button 
            className="md:hidden flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} className="text-gray-900" /> : <Menu size={24} className="text-gray-900" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
            <a href="#" className="block text-sm font-medium hover:text-blue-600">Blogs</a>
            <a href="#" className="block text-sm font-medium hover:text-blue-600">Careers</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section 
        ref={heroRef}
        className="relative min-h-screen pt-24 px-6 flex flex-col items-center justify-center overflow-hidden bg-white"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-40 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
          <motion.div 
            className="text-center mb-10 space-y-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Avant Robotics AI Solution
            </div>
            <div className="text-3xl md:text-4xl font-bold text-gray-400 leading-tight">
              Reduce downtime and costs through
            </div>
            <div className="text-3xl md:text-4xl font-bold text-gray-400 leading-tight">
              continuous AI-driven monitoring
            </div>
          </motion.div>

          <div className="w-full max-w-6xl relative mb-8">
            <div
              className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-300"
              style={{
                transform: `scale(${scale}) translateY(${translateY * 0.3}px)`,
                transformOrigin: 'center',
              }}
            >
              <div className="relative w-full aspect-video">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                src="/videos/1.mp4"
              />
            </div>
            </div>
          </div>
        </div>

        <div className="h-24"></div>
      </section>

      {/* DEMO CAROUSEL */}
      <section className="py-20 px-6 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black leading-tight text-gray-900">
              <span className="text-gray-400">Avant Robotics AI Solution in</span>
              <span className="block text-gray-900">Action</span>
            </h2>
          </motion.div>

          <div className="relative rounded-3xl overflow-hidden border-4 border-gray-300 w-full max-w-4xl mx-auto group shadow-lg" 
  style={{ aspectRatio: '16/9' }}
>
            {demoSlides.map((slide, idx) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: idx === currentDemoSlide ? 1 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
               <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                src={slide.videoUrl}
              />
              
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-6 left-6 text-gray-900 text-sm font-bold opacity-70 bg-white/80 px-3 py-1 rounded-full">
                ◆ Avant Robotics
              </div>
            </motion.div>
          ))}

            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 hover:bg-white border-2 border-gray-300 transition-all group-hover:block hidden shadow-md"
            >
              <ChevronLeft size={28} className="text-gray-900" />
            </motion.button>

            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 hover:bg-white border-2 border-gray-300 transition-all group-hover:block hidden shadow-md"
            >
              <ChevronRight size={28} className="text-gray-900" />
            </motion.button>
          </div>

          <motion.div
            key={currentDemoSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center space-y-4"
          >
            <h3 className="text-2xl md:text-3xl font-black text-gray-900">
              {demoSlides[currentDemoSlide].title}
            </h3>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              {demoSlides[currentDemoSlide].description}
            </p>
          </motion.div>

          <div className="flex justify-center gap-3 mt-8">
            {demoSlides.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => goToSlide(idx)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                className={`h-3 rounded-full transition-all ${
                  idx === currentDemoSlide
                    ? 'bg-gray-900 w-12'
                    : 'bg-gray-300 w-3 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="py-20 px-6 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-center mb-4 text-gray-900">
              Trusted by Industry Leaders
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Join hundreds of companies that have partnered with AVANT
            </p>
          </motion.div>

          <motion.div
            variants={sponsorContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-center"
          >
            {[
              { name: 'Company A', logo: '🏢' },
              { name: 'Company B', logo: '🏭' },
              { name: 'Company C', logo: '🤖' },
              { name: 'Company D', logo: '⚙️' },
              { name: 'Company E', logo: '🔧' },
              { name: 'Company F', logo: '🏗️' },
              { name: 'Company G', logo: '📦' },
              { name: 'Company H', logo: '🚀' },
              { name: 'Company I', logo: '💡' },
              { name: 'Company J', logo: '🌐' }
            ].map((sponsor, i) => (
              <motion.div
                key={i}
                variants={sponsorItemVariants}
                whileHover="hover"
                className="flex items-center justify-center p-6 rounded-xl bg-gray-50 border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group cursor-pointer shadow-sm"
              >
                <motion.div 
                  className="text-center"
                  variants={sponsorHoverVariants}
                >
                  <div className="text-4xl mb-3">{sponsor.logo}</div>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition">{sponsor.name}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-16">
            <p className="text-gray-600 mb-6">Ready to join the revolution?</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold hover:shadow-xl hover:shadow-blue-600/30 transition-all inline-flex items-center gap-2"
            >
              Become a Partner <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 border-y border-gray-200">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
            Ready to Transform?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Join thousands of companies using our AI solutions
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-blue-600/40 transition-all inline-flex items-center gap-2"
          >
            Get Started <ChevronRight size={20} />
          </motion.button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">YouTube</a></li>
                <li><a href="#" className="hover:text-white transition">TikTok</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2026 Avant Robotics. All Copyrights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}