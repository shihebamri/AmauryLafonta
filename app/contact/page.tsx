"use client"

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { ChevronDown, Menu, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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

export default function ContactPage() {
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
        bgImage="/contact.jpg"
        bgImageAlt="Intérieur de la boulangerie"
        strength={200}
      >
        <header className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className={`text-5xl md:text-7xl font-extrabold mb-4 text-white ${playfairDisplay.className}`}
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
            >
              Contactez-nous
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl mb-8 text-white font-light italic"
            >
              Nous sommes à votre écoute
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

      {/* Contact Form and Info */}
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={slideIn}
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-[#262F58] ${playfairDisplay.className}`}>Envoyez-nous un message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#262F58] mb-1">Nom</label>
                  <Input id="name" placeholder="Votre nom" className="w-full px-3 py-2 border border-[#262F58] rounded-md" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#262F58] mb-1">Email</label>
                  <Input id="email" type="email" placeholder="Votre email" className="w-full px-3 py-2 border border-[#262F58] rounded-md" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#262F58] mb-1">Message</label>
                  <Textarea id="message" placeholder="Votre message" className="w-full px-3 py-2 border border-[#262F58] rounded-md" rows={4} />
                </div>
                <Button className={`bg-[#262F58] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition duration-300 ${playfairDisplay.className}`}>
                  Envoyer
                </Button>
              </form>
            </motion.div>
            <motion.div
              initial="hidden"
              animate={controls}
              variants={slideIn}
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-[#262F58] ${playfairDisplay.className}`}>Nos Coordonnées</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-[#262F58] mt-1" />
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 text-[#262F58] ${playfairDisplay.className}`}>Adresse</h3>
                    <p className="text-[#262F58] font-light">123 Rue de la Pâtisserie, Ville Gourmande, 75000</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-[#262F58] mt-1" />
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 text-[#262F58] ${playfairDisplay.className}`}>Téléphone</h3>
                    <p className="text-[#262F58] font-light">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-[#262F58] mt-1" />
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 text-[#262F58] ${playfairDisplay.className}`}>Email</h3>
                    <p className="text-[#262F58] font-light">bonjour@amaurylafonta.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className={`text-2xl font-semibold mb-4 text-[#262F58] ${playfairDisplay.className}`}>Heures d'ouverture</h3>
                <ul className="space-y-2 text-[#262F58] font-light">
                  <li>Lundi - Vendredi: 7h00 - 19h00</li>
                  <li>Samedi: 8h00 - 20h00</li>
                  <li>Dimanche: 8h00 - 18h00</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-4 md:px-6 bg-[#262F58]">
        <div className="container mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold mb-8 text-center text-white ${playfairDisplay.className}`}>Nous Trouver</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3274.885193035013!2d10.663746775441812!3d34.83397897605052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1301d7006235cde1%3A0xfb0fd4030e2aac39!2sles%20d%C3%A9lices%20de%20Hj!5e0!3m2!1sen!2stn!4v1729872525945!5m2!1sen!2stn"             
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

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
              <p className="text-white font-light">Email : contact@amaurylafonta.com</p>
            </div>
          </div>
          <div className="mt-8 text-center text-white font-light">
            © 2024 Amaury Lafonta. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}