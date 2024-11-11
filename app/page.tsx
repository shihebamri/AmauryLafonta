"use client"

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown, Menu, Star, Instagram, Facebook, Twitter } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useInView } from 'react-intersection-observer'
import { Parallax } from 'react-parallax'

import { Playfair_Display, Cormorant_Garamond } from 'next/font/google'

const playfairDisplay = Playfair_Display({ subsets: ['latin'] })
const cormorantGaramond = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600'] })

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}

const slideIn = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
}

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`bg-[#262F58] text-white min-h-screen ${cormorantGaramond.className}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#262F58] py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" >
            <img src="/logo.jpg" alt="Amaury Lafonta" className="w-12 h-12 rounded-full" />
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/menu" className="text-white hover:text-gray-300 transition duration-300 text-lg">
              Menu
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300 transition duration-300 text-lg">
              À propos
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300 transition duration-300 text-lg">
              Contact
            </Link>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6 text-white" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#262F58] p-6 w-64">
              <div className="flex flex-col space-y-4">
                <Link href="/" className={`text-2xl font-bold text-white mb-6 ${playfairDisplay.className}`}>
                  Amaury Lafonta
                </Link>
                <Link href="/menu" className="text-white hover:text-gray-300 transition duration-300 text-lg">
                  Menu
                </Link>
                <Link href="/about" className="text-white hover:text-gray-300 transition duration-300 text-lg">
                  À propos
                </Link>
                <Link href="/contact" className="text-white hover:text-gray-300 transition duration-300 text-lg">
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Votre navigateur ne prend pas en charge la vidéo.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className={`text-6xl md:text-8xl font-extrabold mb-4 text-white ${playfairDisplay.className}`}
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          >
            Amaury Lafonta
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl mb-8 font-light italic text-white"
          >
            Où chaque bouchée raconte une histoire
          </motion.p>
          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-white text-[#262F58] px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300 ${playfairDisplay.className}`}
            >
              Découvrir notre menu
            </motion.button>
          </Link>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-white w-12 h-12" />
        </motion.div>
      </header>

      {/* Featured Products */}
      <section className="py-20 px-4 md:px-0 bg-white">
        <div className="container mx-auto">
          <motion.h2
            ref={ref}
            animate={controls}
            variants={fadeIn}
            className={`text-4xl md:text-5xl font-bold mb-12 text-center text-[#262F58] ${playfairDisplay.className}`}
          >
            Nos Spécialités
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="h-64 bg-gray-300 relative">
                <img
                  src="/hpic1.jpg"
                  alt="Gâteau Édition Halloween"
                  className="transition-transform duration-300 hover:scale-110 w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 text-[#262F58] ${playfairDisplay.className}`}>Gâteau Édition Halloween</h3>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="h-64 bg-gray-300 relative">
                <img
                  src="/hpic2.jpg"
                  alt="TARTE FRAMBOISE"
                  className="transition-transform duration-300 hover:scale-110 w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 text-[#262F58] ${playfairDisplay.className}`}>TARTE FRAMBOISE</h3>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="h-64 bg-gray-300 relative">
                <img
                  src="/hpic3.jpg"
                  alt="TARTELETTES AUX FRUITS DE SAISON"
                  className="transition-transform duration-300 hover:scale-110 w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 text-[#262F58] ${playfairDisplay.className}`}>TARTELETTES AUX FRUITS DE SAISON</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <Parallax
        blur={0}
        bgImage="/about.jpg"
        bgImageAlt="Boulanger au travail"
        strength={200}
      >
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#262F58] opacity-70"></div>
          <div className="container mx-auto px-4 md:px-0 relative z-10">
            <div className="md:flex items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={slideIn}
                className="md:w-1/2 mb-8 md:mb-0"
              >
                <h2 className={`text-4xl md:text-5xl font-bold mb-6 text-white ${playfairDisplay.className}`}>Notre Histoire</h2>
                <p className="text-lg mb-6 text-white font-light leading-relaxed">
                  Chez Amaury Lafonta, nous sommes passionnés par la création de pâtisseries exquises. Notre voyage a commencé avec un objectif simple : créer un espace chaleureux où les amateurs de douceurs pourraient savourer des délices artisanaux.
                </p>
                <Link href="/about">
                  <Button className={`bg-white text-[#262F58] px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300 ${playfairDisplay.className}`}>
                    En savoir plus
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={slideIn}
                className="md:w-1/2 md:pl-12"
              >
                <div className="relative">
                  <img
                    src="/about2.jpg"
                    alt="Boulanger au travail"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-2xl"
                  />
                  <div className={`absolute -bottom-6 -right-6 bg-white text-[#262F58] p-4 rounded-lg shadow-xl z-10 ${playfairDisplay.className}`}>
                    <p className="text-2xl font-bold">10+</p>
                    <p>Années d'Excellence</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Parallax>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-0 bg-white">
        <div className="container mx-auto">
          <motion.h2
            ref={ref}
            animate={controls}
            variants={fadeIn}
            className={`text-4xl md:text-5xl font-bold mb-12 text-center text-[#262F58] ${playfairDisplay.className}`}
          >
            Ce que disent nos clients
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Sophie', text: 'Les meilleures pâtisseries que j\'ai jamais goûtées. L\'ambiance est si chaleureuse et accueillante !' },
              { name: 'Michel', text: 'Leurs croissants sont divins. Je suis accro !' },
              { name: 'Émilie', text: 'Amaury Lafonta est devenu mon deuxième chez-moi. Délicieuses pâtisseries, personnel formidable !' },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-[#262F58] p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-white w-5 h-5 mr-1" />
                  ))}
                </div>
                <p className="text-white mb-4 font-light italic">{testimonial.text}</p>
                <p className={`text-white font-semibold ${playfairDisplay.className}`}>{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#262F58] border-t border-white py-12 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3  className={`text-2xl font-bold text-white mb-4 ${playfairDisplay.className}`}>Amaury Lafonta</h3>
              <p className="text-white font-light">Où chaque bouchée raconte une histoire.</p>
            </div>
            <div>
              <h4 className={`text-xl font-semibold text-white mb-4 ${playfairDisplay.className}`}>Liens Rapides</h4>
              <ul className="space-y-2">
                <li><Link href="/menu" className="text-white hover:text-gray-300 transition duration-300 font-light">Menu</Link></li>
                <li><Link href="/about" className="text-white hover:text-gray-300 transition  duration-300 font-light">À propos</Link></li>
                <li><Link href="/contact" className="text-white hover:text-gray-300 transition duration-300 font-light">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className={`text-xl font-semibold text-white mb-4 ${playfairDisplay.className}`}>Contact</h4>
              <p className="text-white font-light">123 Rue de la Pâtisserie, Ville Gourmande</p>
              <p className="text-white font-light">Téléphone : (555) 123-4567</p>
              <p className="text-white font-light">Email : bonjour@amaurylafonta.com</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-white hover:text-gray-300 transition duration-300">
                  <Instagram />
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition duration-300">
                  <Facebook />
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition duration-300">
                  <Twitter />
                </a>
              </div>
            </div>
          </div>
            <div className="mt-8 text-center text-white font-light">
  © 2024 Amaury Lafonta. Tous droits réservés.
             <br />
  Designed by <a href="https://www.facebook.com/shiheb.amrii" target="_blank" rel="noopener noreferrer" className="underline">Chiheb Amri</a>
             </div>

        </div>
      </footer>
    </div>
  )
}