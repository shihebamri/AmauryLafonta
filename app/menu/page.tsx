'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, Instagram, Facebook, Twitter, ChevronLeft, ChevronRight, ShoppingCart, X } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Parallax } from 'react-parallax'

import { Playfair_Display, Cormorant_Garamond } from 'next/font/google'

const playfairDisplay = Playfair_Display({ subsets: ['latin'] })
const cormorantGaramond = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600'] })

// Import the menu data
import menuData from '../../menu.json'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export default function MenuPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState('')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [cart, setCart] = useState<Array<{ name: string; price: string; quantity: number }>>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    if (menuData.categories.length > 0) {
      setActiveCategory(menuData.categories[0].name);
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 50
      const currentScroll = scrollContainerRef.current.scrollLeft
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const addToCart = (item: { name: string; price: string }) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.name === item.name)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemName: string) => {
    setCart(prevCart => prevCart.filter(item => item.name !== itemName))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(',', '.').replace('€', ''))
      return total + price * item.quantity
    }, 0).toFixed(2)
  }

  const sendOrderToWhatsApp = () => {
    const phoneNumber = "+21653400440" // Replace with your actual WhatsApp number
    const message = `Nouvelle commande:\n\n${cart.map(item => `${item.name} x${item.quantity} - ${item.price}`).join('\n')}\n\nTotal: ${getTotalPrice()} €`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
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
        bgImage="/menu.jpg"
        bgImageAlt="Assortiment de pâtisseries"
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
              Notre Menu
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl mb-8 text-white font-light italic"
            >
              Découvrez nos délices artisanaux
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

      {/* Menu Section */}
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto">
          <div className="relative mb-8">
            <ScrollArea className="w-full whitespace-nowrap rounded-md border border-[#262F58]">
              <div className="flex space-x-4 p-4" ref={scrollContainerRef}>
                {menuData.categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={activeCategory === category.name ? "default" : "outline"}
                    onClick={() => setActiveCategory(category.name)}
                    className={`${
                      activeCategory === category.name ? "bg-[#262F58] text-white" : "bg-white text-[#262F58]"
                    } ${playfairDisplay.className} px-4 py-2 text-lg 
                      ${activeCategory === category.name ? "hover:bg-opacity-90" : "hover:bg-gray-100"}`}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {menuData.categories.map((category) => (
            category.name === activeCategory && (
              <motion.div
                key={category.name}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {category.items.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="bg-white border-[#262F58] overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="transition-transform duration-300 hover:scale-110 w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className={`text-xl font-semibold mb-2 text-[#262F58] ${playfairDisplay.className}`}>{item.name}</h3>
                        <p className="text-[#262F58] mb-4 h-20 overflow-hidden font-light">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <p className={`text-[#262F58] font-bold ${playfairDisplay.className}`}>{item.price}</p>
                          <Button 
                            onClick={() => addToCart(item)}
                            className="bg-[#262F58] text-white hover:bg-opacity-90"
                          >
                            Commander
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )
          ))}
        </div>
      </section>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button className="bg-[#262F58] text-white rounded-full p-4 shadow-lg">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="ml-2">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="bg-white rounded-t-3xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-2xl font-bold text-[#262F58] ${playfairDisplay.className}`}>Votre Commande</h2>
                </div>
                <ScrollArea className="h-[50vh]">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className={`text-[#262F58] font-semibold ${playfairDisplay.className}`}>{item.name}</p>
                        <p className="text-sm text-gray-600">{item.price} x {item.quantity}</p>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.name)}>
                        Supprimer
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
                <div className="mt-4">
                  <p className={`text-xl font-bold text-[#262F58] ${playfairDisplay.className}`}>Total: {getTotalPrice()} €</p>
                  <Button className="w-full mt-4 bg-[#262F58] text-white" onClick={sendOrderToWhatsApp}>
                    Envoyer la commande sur WhatsApp
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <Parallax
        blur={0}
        bgImage="/about.jpg"
        bgImageAlt="Fond de pâtisserie"
        strength={200}
      >
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className={`text-3xl md:text-4xl font-bold mb-4 text-white ${playfairDisplay.className}`}
            >
              Prêt à passer commande ?
            </motion.h2>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="text-white mb-8 text-lg font-light"
            >
              Visitez-nous en boutique ou appelez-nous pour passer votre commande.
            </motion.p>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.4 }}
            >
              <Button className={`bg-white text-[#262F58] px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300 ${playfairDisplay.className}`}>
                Contactez-nous
              </Button>
            </motion.div>
          </div>
        </section>
      </Parallax>

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