
import React from 'react'
import { motion } from 'framer-motion'

const SolarSystem = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Fond étoilé */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Étoiles scintillantes */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Système solaire central */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* Soleil central */}
        <motion.div
          className="absolute w-16 h-16 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full shadow-2xl"
          style={{ left: '-32px', top: '-32px' }}
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 20px rgba(255, 165, 0, 0.5)',
              '0 0 40px rgba(255, 165, 0, 0.8)',
              '0 0 20px rgba(255, 165, 0, 0.5)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        {/* Orbite 1 - Mercure */}
        <motion.div
          className="absolute w-32 h-32 border border-gray-600 rounded-full opacity-20"
          style={{ left: '-64px', top: '-64px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute w-2 h-2 bg-gray-400 rounded-full" style={{ top: '-1px', left: '50%', marginLeft: '-1px' }} />
        </motion.div>

        {/* Orbite 2 - Vénus */}
        <motion.div
          className="absolute w-48 h-48 border border-gray-600 rounded-full opacity-20"
          style={{ left: '-96px', top: '-96px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute w-3 h-3 bg-yellow-300 rounded-full" style={{ top: '-1.5px', left: '50%', marginLeft: '-1.5px' }} />
        </motion.div>

        {/* Orbite 3 - Terre */}
        <motion.div
          className="absolute w-64 h-64 border border-blue-500 rounded-full opacity-30"
          style={{ left: '-128px', top: '-128px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute w-4 h-4 bg-gradient-to-r from-blue-500 to-green-400 rounded-full" style={{ top: '-2px', left: '50%', marginLeft: '-2px' }} />
        </motion.div>

        {/* Orbite 4 - Mars */}
        <motion.div
          className="absolute w-80 h-80 border border-gray-600 rounded-full opacity-20"
          style={{ left: '-160px', top: '-160px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute w-3 h-3 bg-red-500 rounded-full" style={{ top: '-1.5px', left: '50%', marginLeft: '-1.5px' }} />
        </motion.div>

        {/* Orbite 5 - Jupiter */}
        <motion.div
          className="absolute w-96 h-96 border border-gray-600 rounded-full opacity-15"
          style={{ left: '-192px', top: '-192px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute w-6 h-6 bg-gradient-to-r from-orange-400 to-yellow-600 rounded-full" style={{ top: '-3px', left: '50%', marginLeft: '-3px' }} />
        </motion.div>

        {/* Orbite 6 - Saturne */}
        <motion.div
          className="absolute w-[28rem] h-[28rem] border border-gray-600 rounded-full opacity-15"
          style={{ left: '-224px', top: '-224px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute w-5 h-5 bg-gradient-to-r from-yellow-600 to-orange-400 rounded-full" style={{ top: '-2.5px', left: '50%', marginLeft: '-2.5px' }}>
            {/* Anneaux de Saturne */}
            <div className="absolute w-8 h-8 border border-gray-400 rounded-full opacity-50" style={{ left: '-6px', top: '-6px' }} />
          </div>
        </motion.div>
      </div>

      {/* Nébuleuse en arrière-plan */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />
      </div>

      {/* Particules flottantes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default SolarSystem
