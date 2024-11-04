import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[#FFD700]">
          Luxe Desserts
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/menu" className="text-white hover:text-[#FFD700] transition duration-300">
            Menu
          </Link>
          <Link href="/about" className="text-white hover:text-[#FFD700] transition duration-300">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-[#FFD700] transition duration-300">
            Contact
          </Link>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6 text-[#FFD700]" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black p-6 w-64">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-2xl font-bold text-[#FFD700] mb-6">
                Luxe Desserts
              </Link>
              <Link href="/menu" className="text-white hover:text-[#FFD700] transition duration-300">
                Menu
              </Link>
              <Link href="/about" className="text-white hover:text-[#FFD700] transition duration-300">
                About
              </Link>
              <Link href="/contact" className="text-white hover:text-[#FFD700] transition duration-300">
                Contact
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}