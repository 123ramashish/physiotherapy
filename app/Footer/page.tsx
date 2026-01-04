import React from 'react'
import { Facebook, Twitter, Instagram, Youtube, Menu, X, Phone, Mail, MapPin, Clock, CheckCircle, ArrowRight, Activity } from 'lucide-react';

export default function Footer() {
  return (
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2024 SKM Physiotherapy. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-6">
            {[
              { icon: Facebook, color: 'hover:text-blue-400' },
              { icon: Twitter, color: 'hover:text-sky-400' },
              { icon: Instagram, color: 'hover:text-pink-400' },
              { icon: Youtube, color: 'hover:text-red-400' }
            ].map((Social, index) => (
              <Social.icon 
                key={index}
                className={`w-6 h-6 cursor-pointer transition-all duration-300 hover:scale-125 ${Social.color}`}
              />
            ))}
          </div>
        </div>
      </footer>
  )
}
