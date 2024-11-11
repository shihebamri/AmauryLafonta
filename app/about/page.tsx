"use client"

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { ChevronDown, Menu, Instagram, Facebook, Twitter } from 'lucide-react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
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

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    controls.start('visible')
  }, [controls])

  return (
    <div className={`bg-[#262F58] text-white min-h-screen ${cormorantGaramond.className}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#262F58] py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
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
                <span className="sr-only">Ouvrir le menu</span>
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
      <Parallax
        blur={0}
        bgImage="/about.jpg"
        bgImageAlt="Intérieur de la boulangerie"
        strength={200}
      >
        <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className={`text-5xl md:text-7xl font-extrabold mb-4 text-white ${playfairDisplay.className}`}
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
            >
              Notre Histoire
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl mb-8 text-white font-light italic"
            >
              Découvrez la passion derrière chaque création
            </motion.p>
          </div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="text-white w-12 h-12" />
          </motion.div>
        </header>
      </Parallax>

      {/* About Section */}
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={slideIn}
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-[#262F58] ${playfairDisplay.className}`}>Notre Passion pour la Pâtisserie</h2>
              <p className="text-[#262F58] mb-6 font-light leading-relaxed">
                Chez Amaury Lafonta, notre histoire est celle d'une passion transmise de génération en génération. Depuis plus de 50 ans, nous perpétuons l'art de la pâtisserie française, en mêlant traditions ancestrales et innovations culinaires.
              </p>
              <p className="text-[#262F58] mb-6 font-light leading-relaxed">
                Chaque jour, nos artisans pâtissiers s'évertuent à créer des délices qui émerveillent les papilles et ravissent les yeux. Notre engagement envers la qualité et l'excellence se reflète dans chacune de nos créations.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              animate={controls}
              variants={slideIn}
              className="relative"
            >
              <img
                src="/about2.jpg"
                alt="Pâtissier au travail"
                className="rounded-lg shadow-2xl"
              />
              <div className={`absolute -bottom-6 -right-6 bg-[#262F58] text-white p-4 rounded-lg shadow-xl ${playfairDisplay.className}`}>
                <p className="text-2xl font-bold">50+</p>
                <p>Années d'Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 md:px-6 bg-[#262F58]">
        <div className="container mx-auto">
          <motion.h2
            initial="hidden"
            animate={controls}
            variants={fadeIn}
            className={`text-3xl md:text-4xl font-bold mb-12 text-center text-white ${playfairDisplay.className}`}
          >
            Nos Valeurs
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Qualité", description: "Nous n'utilisons que les meilleurs ingrédients pour créer nos pâtisseries." },
              { title: "Créativité", description: "Nous innovons constamment pour offrir de nouvelles expériences gustatives." },
              { title: "Tradition", description: "Nous respectons les techniques traditionnelles de la pâtisserie française." },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={controls}
                variants={fadeIn}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className={`text-xl font-semibold mb-4 text-[#262F58] ${playfairDisplay.className}`}>{value.title}</h3>
                <p className="text-[#262F58] font-light">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto">
          <motion.h2
            initial="hidden"
            animate={controls}
            variants={fadeIn}
            className={`text-3xl md:text-4xl font-bold mb-12 text-center text-[#262F58] ${playfairDisplay.className}`}
          >
            Notre Équipe
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Amaury Lafonta", role: "Maître Pâtissier", image: "/team-1.jpg" },
              { name: "Timote Bourre", role: "Chef Pâtissière", image: "/team-2.jpg" },
              { name: "Xavier", role: "Artisan Boulanger", image: "/team-3.jpg" },
              { name: "Aurélie", role: "Chocolatière-confiseuse", image: "/team-4.jpg" },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={controls}
                variants={fadeIn}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className={`text-xl font-semibold mb-2 text-[#262F58] ${playfairDisplay.className}`}>{member.name}</h3>
                <p className="text-[#262F58] font-light">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <Parallax
        blur={0}
        bgImage="/testipic.jpg"
        bgImageAlt="Fond de pâtisserie"
        strength={200}
      >
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              initial="hidden"
              animate={controls}
              variants={fadeIn}
              className={`text-3xl md:text-4xl font-bold mb-12 text-center text-white ${playfairDisplay.className}`}
            >
              Ce que disent nos clients
            </motion.h2>
            <motion.div
              initial="hidden"
              animate={controls}
              variants={fadeIn}
              className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto"
            >
              <p className="text-[#262F58] mb-6 font-light italic text-lg">
                "Les pâtisseries d'Amaury Lafonta sont tout simplement divines. Chaque bouchée est un voyage gustatif unique. C'est devenu mon endroit préféré pour les occasions spéciales !"
              </p>
              <p className={`text-[#262F58] font-semibold ${playfairDisplay.className}`}>Marie Leclerc</p>
              <p className="text-[#262F58] font-light">Cliente fidèle depuis 5 ans</p>
            </motion.div>
          </div>
        </section>
      </Parallax>

      {/* Footer */}
      <footer className="bg-[#262F58] border-t border-white py-12 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className={`text-2xl font-bold text-white mb-4 ${playfairDisplay.className}`}>Amaury Lafonta</h3>
              <p className="text-white font-light">Où chaque bouchée raconte une histoire.</p>
            </div>
            <div>
              <h4 className={`text-xl font-semibold text-white mb-4 ${playfairDisplay.className}`}>Liens Rapides</h4>
              <ul className="space-y-2">
                <li><Link href="/menu" className="text-white hover:text-gray-300 transition duration-300 font-light">Menu</Link></li>
                <li><Link href="/about" className="text-white hover:text-gray-300 transition duration-300 font-light">À propos</Link></li>
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