
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {Menu, X, Cpu} from 'lucide-react'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-gray-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo à gauche */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Constellations Building
              </span>
              <br />
              <span className="text-xs text-gray-400 font-light">Assemblage PC - Rennes</span>
            </div>
          </Link>

          {/* Menu central + Devis à droite - Desktop */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-12">
            {/* Menu à gauche du centre */}
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors duration-300 hover:text-blue-400 ${
                  location.pathname === '/' ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                Accueil
              </Link>
              <a
                href="/#services"
                className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                Services
              </a>
              <Link
                to="/contact"
                className={`text-sm font-medium transition-colors duration-300 hover:text-blue-400 ${
                  location.pathname === '/contact' ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Devis gratuit à droite */}
            <Link
              to="/contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
            >
              Devis gratuit
            </Link>
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden pb-4 border-t border-gray-800/50 mt-4 pt-4"
          >
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={toggleMenu}
                className={`text-sm font-medium transition-colors duration-300 hover:text-blue-400 ${
                  location.pathname === '/' ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                Accueil
              </Link>
              <a
                href="/#services"
                onClick={toggleMenu}
                className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                Services
              </a>
              <Link
                to="/contact"
                onClick={toggleMenu}
                className={`text-sm font-medium transition-colors duration-300 hover:text-blue-400 ${
                  location.pathname === '/contact' ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                Contact
              </Link>
              <Link
                to="/contact"
                onClick={toggleMenu}
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-full text-sm font-semibold text-center transition-all duration-300"
              >
                Devis gratuit
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navigation
