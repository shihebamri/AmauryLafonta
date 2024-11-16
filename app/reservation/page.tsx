"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Menu } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Parallax } from 'react-parallax'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Playfair_Display, Cormorant_Garamond } from 'next/font/google'

const playfairDisplay = Playfair_Display({ subsets: ['latin'] })
const cormorantGaramond = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600'] })

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export default function PastryReservation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pastryType: '',
    flavor: '',
    size: '',
    specialInstructions: ''
  })

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Nouvelle réservation de pâtisserie:
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}
Type de pâtisserie: ${formData.pastryType}
Saveur: ${formData.flavor}
Taille: ${formData.size}
Instructions spéciales: ${formData.specialInstructions}`

    const whatsappNumber = '+21653400440' // Replace with your actual WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

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
      <Link href="/res" className="text-white hover:text-gray-300 transition duration-300 text-lg">
        Réservation
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
          <Link href="/res" className="text-white hover:text-gray-300 transition duration-300 text-lg">
            Réservation
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  </div>
</nav>


      {/* Hero Section */}
      <Parallax
        blur={0}
        bgImage="/res.jpg"
        bgImageAlt="Pâtisserie personnalisée"
        strength={200}
      >
        <header className="relative h-[40vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className={`text-5xl md:text-7xl font-extrabold mb-4 text-white ${playfairDisplay.className}`}
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
            >
              Réservation de Pâtisserie
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl mb-8 text-white font-light italic"
            >
              Créez votre pâtisserie sur mesure
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

      {/* Reservation Form */}
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-3xl">
          <Card className="bg-white border-[#262F58]">
            <CardContent className="p-6">
              <h2 className={`text-3xl font-bold mb-6 text-[#262F58] ${playfairDisplay.className} text-center`}>
                Créez Votre Pâtisserie Personnalisée
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-[#262F58]">Nom</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[#262F58]">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-[#262F58]">Téléphone</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className="mt-1" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="pastryType" className="text-[#262F58]">Type de Pâtisserie</Label>
                    <Select onValueChange={(value) => handleSelectChange('pastryType', value)}>
                      <SelectTrigger className="mt-1 text-[#262F58]">
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cake">Gâteau</SelectItem>
                        <SelectItem value="tart">Tarte</SelectItem>
                        <SelectItem value="eclair">Éclair</SelectItem>
                        <SelectItem value="macaron">Macaron</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="flavor" className="text-[#262F58]">Saveur</Label>
                    <Select onValueChange={(value) => handleSelectChange('flavor', value)}>
                      <SelectTrigger className="mt-1 text-[#262F58]">
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chocolate">Chocolat</SelectItem>
                        <SelectItem value="vanilla">Vanille</SelectItem>
                        <SelectItem value="strawberry">Fraise</SelectItem>
                        <SelectItem value="lemon">Citron</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="size" className="text-[#262F58]">Taille</Label>
                    <Select onValueChange={(value) => handleSelectChange('size', value)}>
                      <SelectTrigger className="mt-1 text-[#262F58]">
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Petit</SelectItem>
                        <SelectItem value="medium">Moyen</SelectItem>
                        <SelectItem value="large">Grand</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="specialInstructions" className="text-[#262F58]">Instructions Spéciales</Label>
                  <Textarea 
                    id="specialInstructions" 
                    name="specialInstructions" 
                    value={formData.specialInstructions} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                    rows={4}
                  />
                </div>
                <Button type="submit" className={`w-full bg-[#262F58] text-white hover:bg-opacity-90 ${playfairDisplay.className}`}>
                  Envoyer la Réservation
                </Button>
              </form>
            </CardContent>
          </Card>
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
              <p className="text-white font-light">Email : bonjour@amaurylafonta.com</p>
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