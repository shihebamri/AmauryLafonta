import React from 'react'
import Link from 'next/link'
import { Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#FFD700] py-12 px-4 md:px-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-[#FFD700] mb-4">Luxe Desserts</h3>
            <p className="text-white">Indulge in the extraordinary.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-[#FFD700] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/menu" className="text-white hover:text-[#FFD700] transition duration-300">Menu</Link></li>
              <li><Link href="/about" className="text-white hover:text-[#FFD700] transition duration-300">About Us</Link></li>
              <li><Link href="/contact" className="text-white hover:text-[#FFD700] transition duration-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-[#FFD700] mb-4">Contact</h4>
            <p className="text-white">123 Sweet Street, Dessert City</p>
            <p className="text-white">Phone: (555) 123-4567</p>
            <p className="text-white">Email: info@luxedesserts.com</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white hover:text-[#FFD700] transition duration-300">
                <Instagram />
              </a>
              <a href="#" className="text-white hover:text-[#FFD700] transition duration-300">
                <Facebook />
              </a>
              <a href="#" className="text-white hover:text-[#FFD700] transition duration-300">
                <Twitter />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[#FFD700] text-center">
          <p className="text-white">&copy; 2023 Luxe Desserts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}