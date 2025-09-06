
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {ChevronLeft, ChevronRight, X, Cpu, HardDrive, MemoryStick, Zap, Monitor, DollarSign, Calculator} from 'lucide-react'
import SolarSystem from '../components/SolarSystem'
import ContactPage from './ContactPage'
import ConfigSimulator from '../components/ConfigSimulator'
import image2 from '../../../Images/2.webp'
import image3 from '../../../Images/3.webp'
import image4 from '../../../Images/4.webp'
import image5 from '../../../Images/5.webp'
import image6 from '../../../Images/6.webp'
import image7 from '../../../Images/7.webp'

const HomePage = () => {
  const [currentSection, setCurrentSection] = useState('accueil')
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false)
  const [selectedConfig, setSelectedConfig] = useState<string | null>(null)
  const [currentConfigIndex, setCurrentConfigIndex] = useState(0)

  // Données des configurations PC
  const pcConfigurations = [
    {
      id: 'low',
      title: 'Orion',
      image: image2,
      specs: {
        cpu: 'Multi-core basse consommation',
        gpu: 'Intégrée (usage non-gaming)',
        ram: 'DDR4 3200MHz',
        storage: 'SSD NVMe M.2',
        motherboard: 'Micro-ATX, connectiques usuels',
        psu: '450W 80+ Bronze',
        case: 'Boîtier Micro-ATX'
      },
      price: '800€ - 1100€',
      usage: 'Bureautique, navigation web, multimédia...',
      info: 'Configuration idéale pour un usage quotidien sans contraintes de performance, ralentissements...'
    },
    {
      id: 'high',
      title: 'Cassiopée',
      image: image3,
      specs: {
        cpu: 'Processeur AMD Ryzen de dernière génération',
        gpu: 'RTX Séries 80/90 (performances/confort)',
        ram: 'Mémoire adaptée aux besoins, DDR4/DDR5',
        storage: 'SSD NVMe + HDD pour un rapport Gb/Prix optimal',
        motherboard: 'ATX Premium, équipement de dernière génération, wifi 6...',
        psu: 'Adaptée à la consomation globale',
        case: 'Boîtier ATX (RGB globale optionnel)'
      },
      price: '1400€ - 2100€',
      usage: 'Gaming 1440p, streaming, création de contenu...',
      info: 'Configuration performante pour les gamers et utilisateurs pointilleux.'
    },
    {
      id: 'pro',
      title: 'Andromède',
      image: image4,
      specs: {
        cpu: 'Multi-core performant, cache vidéo',
        gpu: 'Carte vidéo sur mesures',
        ram: 'DDR5 ultra cadencée',
        storage: 'Plusieurs SSD NVMe Gen4',
        motherboard: 'Fonctionalités pratiques, selon la demande',
        psu: 'Consomation sure (GOLD/PLAT)',
        case: 'Boîtier Full Tower'
      },
      price: '2200€ - 3500€',
      usage: 'Rendu 3D, gestion, développement',
      info: 'Station de travail professionnelle pour tâches exigeantes ou spécialisées.'
    },
    {
      id: 'lowtech-pro',
      title: 'Scorpion',
      image: image5,
      specs: {
        cpu: 'Basse consomation, Hautes performances',
        gpu: 'Selon les besoins',
        ram: 'DDR4 3200MHz',
        storage: 'SSD NVMe + HDD (sur-mesures)',
        motherboard: 'équipé du necessaire',
        psu: 'Consomation controlée',
        case: 'Boîtier Compact'
      },
      price: '900€ - 1500€',
      usage: 'Gaming 1080p, travail bureautique avancé, gestion de projets...',
      info: 'Équilibre parfait entre performance et consommation énergétique.'
    },
    {
      id: 'gaming-elite',
      title: 'Grande Ourse',
      image: image6,
      specs: {
        cpu: 'De dernière génération, premium',
        gpu: 'Carte vidéo 4K 120FPS sur les AAA',
        ram: 'DDR5 5600MHz',
        storage: 'SSD NVMe Gen4 + SSD sata',
        motherboard: 'Carte de fabricant certifiés',
        psu: 'Platinium',
        case: 'Boîtier Gaming / Moderne (RGB optionel)'
      },
      price: '3600€ - 5000€',
      usage: 'Gaming 4K Ultra, VR, compétition eSport',
      info: 'Configuration ultime pour les passionnés de gaming et professionnels informatiques.'
    },
    {
      id: 'workstation',
      title: 'Lyre',
      image: image7,
      specs: {
        cpu: 'PRO Ultra-cadencé',
        gpu: 'Qualité Cinéma',
        ram: 'RAM DDR5 sur -mesures',
        storage: 'SSD NVMe RAID',
        motherboard: 'Carte PRO',
        psu: 'Alimentation adaptée aux composants',
        case: 'Boîtier Workstation'
      },
      price: '4000€ - 8000€',
      usage: 'CAO, simulation, intelligence artificielle',
      info: 'Station de travail professionnelle pour les industries spécialisées.'
    }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setCurrentSection(sectionId)
    }
  }

  const openContact = () => {
    setIsContactOpen(true)
  }

  const closeContact = () => {
    setIsContactOpen(false)
  }

  const openSimulator = () => {
    setIsSimulatorOpen(true)
  }

  const closeSimulator = () => {
    setIsSimulatorOpen(false)
  }

  const handleSimulatorQuote = (summary: string, code: string, estimation: { minFinal: number, maxFinal: number }) => {
    // Fermer le simulateur et ouvrir le formulaire de contact avec les données pré-remplies
    setIsSimulatorOpen(false)
    
    // Stocker les données du simulateur pour pré-remplir le formulaire
    const simulatorData = {
      summary,
      code,
      estimation: `${estimation.minFinal}€ - ${estimation.maxFinal}€`,
      projectType: 'configuration-expert' // Type approprié selon les choix
    }
    
    // Passer les données au formulaire via localStorage temporairement
    localStorage.setItem('simulatorData', JSON.stringify(simulatorData))
    
    setTimeout(() => {
      setIsContactOpen(true)
    }, 300)
  }

  const openConfigPopup = (configId: string) => {
    setSelectedConfig(configId)
  }

  const closeConfigPopup = () => {
    setSelectedConfig(null)
  }

  // Navigation des configurations
  const nextConfig = () => {
    setCurrentConfigIndex(prev => 
      prev + 1 >= pcConfigurations.length ? 0 : prev + 1
    )
  }

  const prevConfig = () => {
    setCurrentConfigIndex(prev => 
      prev - 1 < 0 ? pcConfigurations.length - 1 : prev - 1
    )
  }

  // Calcul des configurations visibles pour mobile
  const getVisibleConfigs = () => {
    const configs = []
    const isDesktop = window.innerWidth >= 768
    const visibleCount = isDesktop ? 1 : 1 // Une seule config visible sur toutes les tailles
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentConfigIndex + i) % pcConfigurations.length
      configs.push(pcConfigurations[index])
    }
    return configs
  }

  const currentConfig = pcConfigurations[currentConfigIndex]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['accueil', 'services', 'clients', 'avantages']
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Composant flèche de navigation avec queue - centré sur l'interface
  const NavigationArrow = ({ targetSection }: { targetSection: string }) => (
    <div className={`absolute bottom-0 left-0 right-0 flex justify-center pb-8 transition-all duration-300 ${
      isSimulatorOpen ? 'z-10 opacity-30' : 'z-20 opacity-100'
    }`}>
      <motion.button
        onClick={() => scrollToSection(targetSection)}
        className="text-white/60 hover:text-white/90 transition-all duration-300 group"
        initial={{ opacity: 0.6, y: 0 }}
        animate={{ opacity: [0.6, 0.9, 0.6], y: [0, -8, 0] }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.2, opacity: 1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Flèche avec queue stylisée */}
        <svg 
          width="32" 
          height="36" 
          viewBox="0 0 32 36" 
          fill="none" 
          className="drop-shadow-lg filter group-hover:drop-shadow-xl transition-all duration-300"
        >
          {/* Queue de la flèche */}
          <line 
            x1="16" 
            y1="6" 
            x2="16" 
            y2="24" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
          {/* Pointe de la flèche */}
          <polyline 
            points="10,20 16,26 22,20" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </motion.button>
    </div>
  )

  const selectedConfigData = selectedConfig ? pcConfigurations.find(config => config.id === selectedConfig) : null

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Fond spatial avec couverture totale mobile optimisée */}
      <div className="fixed inset-0 w-full h-full bg-black">
        {/* Extension pour les encoches mobiles - couverture totale */}
        <div className="absolute w-screen h-screen bg-black" 
             style={{
               position: 'fixed',
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               width: '100vw',
               height: '100vh',
               minHeight: '100dvh',
               zIndex: -2,
               // Extension au-delà des safe areas
               marginTop: 'calc(-1 * env(safe-area-inset-top, 0px))',
               marginBottom: 'calc(-1 * env(safe-area-inset-bottom, 0px))',
               marginLeft: 'calc(-1 * env(safe-area-inset-left, 0px))',
               marginRight: 'calc(-1 * env(safe-area-inset-right, 0px))',
               paddingTop: 'env(safe-area-inset-top, 0px)',
               paddingBottom: 'env(safe-area-inset-bottom, 0px)',
               paddingLeft: 'env(safe-area-inset-left, 0px)',
               paddingRight: 'env(safe-area-inset-right, 0px)'
             }}
        />
      </div>
      
      <SolarSystem />

      {/* Contenu principal avec padding pour encoches */}
      <main className="relative z-10 w-full" 
            style={{
              paddingTop: 'env(safe-area-inset-top, 0px)',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
              paddingLeft: 'env(safe-area-inset-left, 0px)',
              paddingRight: 'env(safe-area-inset-right, 0px)',
              minHeight: '100vh'
            }}>
        
        {/* Section Accueil */}
        <section id="accueil" className="relative min-h-screen flex items-center justify-center px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto relative"
          >
            {/* Titres au-dessus de l'encart - z-index élevé */}
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-30"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* Constellations avec effet néon doux harmonisé */}
              <span 
                className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500"
                style={{
                  textShadow: `
                    0 0 8px rgba(59, 130, 246, 0.4),
                    0 0 16px rgba(59, 130, 246, 0.3),
                    0 0 24px rgba(59, 130, 246, 0.2)
                  `,
                  filter: 'brightness(1.1) saturate(1.1)'
                }}
              >
                Constellations
              </span>
              {' '}
              {/* Building avec style sobre et plus petit */}
              <span className="text-gray-200 font-light tracking-wide opacity-85 relative text-3xl md:text-5xl">
                Building
              </span>
            </motion.h1>
            
            {/* Encart flou positionné derrière les titres */}
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {/* Fond flou avec border-radius autour du texte d'accroche - z-index inférieur aux titres */}
              <div className="absolute inset-0 -m-4 md:-m-6 bg-gray-900/20 backdrop-blur-sm rounded-2xl border border-gray-700/30 z-10" />
              
              {/* Contenu du texte d'accroche */}
              <p className="relative z-20 text-lg md:text-xl text-gray-300 leading-relaxed">
                Assemblage de PC sur mesure pour particuliers et professionnels<br />
                <span className="text-blue-400 font-semibold">Rennes / Ille-et-Vilaine</span> • Services à distance disponibles
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              {/* Bouton Demander un devis - Design harmonisé avec Découvrir nos services et couleur violette */}
              <button
                onClick={openContact}
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Demander un devis
              </button>
              
              <button
                onClick={() => scrollToSection('services')}
                className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Découvrir nos services
              </button>
            </motion.div>

            {/* Bouton Configurations Builder - Design harmonisé avec titre Constellations */}
            <motion.div
              className="relative z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <motion.button
                id="open-config-sim"
                onClick={openSimulator}
                className="btn-simulateur relative text-white px-6 py-3 rounded-full font-medium text-base transition-all duration-500 transform hover:scale-105 flex items-center gap-2 mx-auto"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(147, 51, 234, 0.25) 100%)',
                  backdropFilter: 'blur(8px)',
                  border: '1.5px solid transparent',
                  backgroundImage: `
                    linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(147, 51, 234, 0.25) 100%),
                    linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.8) 100%)
                  `,
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                  boxShadow: `
                    0 0 12px rgba(59, 130, 246, 0.4),
                    0 0 24px rgba(59, 130, 246, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.15)
                  `,
                  opacity: 1
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `
                    0 0 16px rgba(59, 130, 246, 0.5),
                    0 0 32px rgba(59, 130, 246, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `,
                  opacity: 1
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Calculator className="w-5 h-5" />
                Configurations Builder
                
                {/* Effet de lueur supplémentaire au survol */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%)',
                    filter: 'blur(4px)'
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>

            {/* Simulateur de configuration - Animation de fondu avec z-index très élevé */}
            <AnimatePresence>
              {isSimulatorOpen && (
                <motion.div
                  id="simulateur-config"
                  className="relative mt-8"
                  style={{ zIndex: 100 }} // Z-index très élevé pour passer au-dessus de tout
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ 
                    opacity: 1, 
                    height: 'auto', 
                    y: 0,
                    transition: {
                      opacity: { duration: 0.6, ease: "easeOut" },
                      height: { duration: 0.5, ease: "easeInOut" },
                      y: { duration: 0.5, ease: "easeOut" }
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    height: 0, 
                    y: -20,
                    transition: {
                      opacity: { duration: 0.4, ease: "easeIn" },
                      height: { duration: 0.4, ease: "easeInOut", delay: 0.1 },
                      y: { duration: 0.3, ease: "easeIn" }
                    }
                  }}
                >
                  <motion.div 
                    className="bg-gray-900/10 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-4 md:p-6"
                    style={{ zIndex: 101 }} // Z-index encore plus élevé pour le contenu
                    initial={{ scale: 0.95 }}
                    animate={{ 
                      scale: 1,
                      transition: { duration: 0.4, ease: "easeOut", delay: 0.2 }
                    }}
                    exit={{ 
                      scale: 0.95,
                      transition: { duration: 0.3, ease: "easeIn" }
                    }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-white">Configuration personnalisée</h3>
                      <motion.button
                        onClick={closeSimulator}
                        className="text-gray-400 hover:text-white transition-colors text-xl p-2"
                        style={{ zIndex: 102 }} // Z-index pour le bouton fermer
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </div>
                    <div style={{ zIndex: 102 }}>
                      <ConfigSimulator onRequestQuote={handleSimulatorQuote} />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Flèche vers Services - centrée sur l'axe des boutons avec gestion de la superposition */}
          <NavigationArrow targetSection="services" />
        </section>

        {/* Section Services */}
        <section id="services" className="relative min-h-screen py-16 px-4 md:px-8">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Nos Services
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Particuliers */}
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Particuliers</h3>
                <ul className="text-gray-300 space-y-3">
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Montage PC personnalisé</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Configuration sur mesures optimisée</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Upgrade / réparation</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Conseil / accompagnement</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Support technique à distance</li>
                </ul>
              </motion.div>

              {/* Professionnels */}
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Professionnels</h3>
                <ul className="text-gray-300 space-y-3">
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Stations de travail spécialisées</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Parcs informatiques</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Configurations sur mesures</li>
                </ul>
              </motion.div>
            </div>

            {/* Nouvelles box de services ajoutées */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Configuration Expert */}
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Configuration Expert</h3>
                <ul className="text-gray-300 space-y-3">
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Analyse de vos besoins spécifiques</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Recommandations personnalisées</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Optimisation budget/performance</li>
                </ul>
              </motion.div>

              {/* Réparation */}
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-orange-500 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-orange-400 mb-4">Réparation</h3>
                <ul className="text-gray-300 space-y-3">
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Upgrade hardware</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Mise à niveau système</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Changements partiels</li>
                  <li className="flex items-center"><span className="text-green-400 mr-2">✓</span> Optimisation performances</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>

          {/* Flèche vers Clients - centrée sur l'axe du contenu */}
          <NavigationArrow targetSection="clients" />
        </section>

        {/* Section Clients */}
        <section id="clients" className="relative min-h-screen py-16 px-4 md:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              Votre PC, Selon Vous !
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-blue-400 mb-3">Experience Personnalisé</h3>
                <p className="text-gray-300">Étude approfondie de vos usages / contraintes pour une solution parfaitement adaptée</p>
              </motion.div>

              <motion.div
                className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-purple-400 mb-3">Performance optimal</h3>
                <p className="text-gray-300">Sélection rigoureuse des composants pour un équilibre performance/besoins de l'utilisateur</p>
              </motion.div>

              <motion.div
                className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">🛠️</div>
                <h3 className="text-xl font-bold text-pink-400 mb-3">Montage Expert</h3>
                <p className="text-gray-300">Assemblage professionnel avec tests complets et garantie de fonctionnement</p>
              </motion.div>
            </div>

            {/* Section Exemples de Configurations - Version plus décorative sur desktop */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Nos Créations
              </h3>
              
              {/* Container avec navigation par flèches */}
              <div className="relative max-w-6xl mx-auto">
                {/* Flèches de navigation - Positionnement différent mobile/desktop */}
                
                {/* Mobile : Flèches centrées par rapport à la box */}
                <div className="md:hidden">
                  <button
                    onClick={prevConfig}
                    className="absolute left-1/2 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white/90 transition-all duration-300 transform hover:scale-110"
                    style={{ left: '-1rem', transform: 'translateY(-50%)' }}
                  >
                    <svg 
                      width="32" 
                      height="36" 
                      viewBox="0 0 32 36" 
                      fill="none" 
                      className="drop-shadow-lg filter hover:drop-shadow-xl transition-all duration-300 rotate-90"
                    >
                      <line 
                        x1="16" 
                        y1="6" 
                        x2="16" 
                        y2="24" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round"
                      />
                      <polyline 
                        points="10,20 16,26 22,20" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={nextConfig}
                    className="absolute right-1/2 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white/90 transition-all duration-300 transform hover:scale-110"
                    style={{ right: '-1rem', transform: 'translateY(-50%)' }}
                  >
                    <svg 
                      width="32" 
                      height="36" 
                      viewBox="0 0 32 36" 
                      fill="none" 
                      className="drop-shadow-lg filter hover:drop-shadow-xl transition-all duration-300 -rotate-90"
                    >
                      <line 
                        x1="16" 
                        y1="6" 
                        x2="16" 
                        y2="24" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round"
                      />
                      <polyline 
                        points="10,20 16,26 22,20" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </button>
                </div>

                {/* Desktop : Flèches positionnées comme avant */}
                <div className="hidden md:block">
                  <button
                    onClick={prevConfig}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white/90 transition-all duration-300 transform hover:scale-110"
                    style={{ left: '-2rem' }}
                  >
                    <svg 
                      width="32" 
                      height="36" 
                      viewBox="0 0 32 36" 
                      fill="none" 
                      className="drop-shadow-lg filter hover:drop-shadow-xl transition-all duration-300 rotate-90"
                    >
                      <line 
                        x1="16" 
                        y1="6" 
                        x2="16" 
                        y2="24" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round"
                      />
                      <polyline 
                        points="10,20 16,26 22,20" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={nextConfig}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white/90 transition-all duration-300 transform hover:scale-110"
                    style={{ right: '-2rem' }}
                  >
                    <svg 
                      width="32" 
                      height="36" 
                      viewBox="0 0 32 36" 
                      fill="none" 
                      className="drop-shadow-lg filter hover:drop-shadow-xl transition-all duration-300 -rotate-90"
                    >
                      <line 
                        x1="16" 
                        y1="6" 
                        x2="16" 
                        y2="24" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round"
                      />
                      <polyline 
                        points="10,20 16,26 22,20" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </button>
                </div>

                {/* Configuration unique avec animation fluide */}
                <div className="overflow-hidden px-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentConfigIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ 
                        duration: 0.5,
                        ease: "easeInOut"
                      }}
                    >
                      {/* Mobile : affichage simple comme avant */}
                      <div className="md:hidden">
                        <motion.div
                          className="relative rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer group"
                          onClick={() => openConfigPopup(currentConfig.id)}
                        >
                          <div className="relative h-48">
                            <img 
                              src={currentConfig.image}
                              alt={currentConfig.title}
                              className="w-full h-full object-cover transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <h4 className="text-xl font-bold text-white text-center px-4">
                                {currentConfig.title}
                              </h4>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Desktop : version réduite et plus décorative */}
                      <div className="hidden md:block">
                        <motion.div
                          className="relative rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer group bg-gray-900/20 backdrop-blur-sm max-w-3xl mx-auto"
                          onClick={() => openConfigPopup(currentConfig.id)}
                        >
                          <div className="grid grid-cols-2 gap-4 p-4">
                            {/* Image à gauche dans un cadre plus petit et fin */}
                            <div className="flex items-center justify-center">
                              <div className="relative bg-gray-800/30 backdrop-blur-sm border border-gray-600/50 rounded-lg p-2 shadow-lg transition-all duration-300">
                                <div className="relative h-32 w-full rounded-md overflow-hidden">
                                  <img 
                                    src={currentConfig.image}
                                    alt={currentConfig.title}
                                    className="w-full h-full object-cover transition-transform duration-300"
                                  />
                                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-300" />
                                </div>
                                {/* Effet de surélévation plus subtil */}
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            </div>

                            {/* Informations à droite dans des cadres plus fins */}
                            <div className="flex flex-col justify-center space-y-3">
                              {/* Titre de la configuration plus petit */}
                              <h4 className="text-xl font-bold text-white mb-1">
                                {currentConfig.title}
                              </h4>
                              
                              {/* Cadre Prix indicatif plus fin */}
                              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600/50 rounded-lg p-3 shadow-sm">
                                <div className="flex items-center gap-2 mb-1">
                                  <DollarSign className="w-4 h-4 text-green-400" />
                                  <span className="text-green-400 font-medium text-sm">Prix indicatif</span>
                                </div>
                                <p className="text-lg font-bold text-white mb-1">{currentConfig.price}</p>
                                <p className="text-gray-400 text-xs">Prix TTC, montage inclus</p>
                              </div>

                              {/* Cadre Usage recommandé plus fin */}
                              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600/50 rounded-lg p-3 shadow-sm">
                                <div className="flex items-center gap-2 mb-1">
                                  <Monitor className="w-4 h-4 text-blue-400" />
                                  <span className="text-blue-400 font-medium text-sm">Usage recommandé</span>
                                </div>
                                <p className="text-gray-300 mb-1 text-sm font-medium">{currentConfig.usage}</p>
                                <p className="text-gray-400 text-xs italic">{currentConfig.info}</p>
                              </div>

                              {/* Bouton pour voir le détail plus petit */}
                              <div className="text-xs text-blue-400 font-medium pt-1">
                                Cliquer pour voir les spécifications →
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Indicateurs de position - UNIQUEMENT sur desktop */}
                <div className="hidden md:flex justify-center mt-6 space-x-2">
                  {pcConfigurations.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentConfigIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentConfigIndex 
                          ? 'bg-blue-500 w-6' 
                          : 'bg-gray-600 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Flèche vers Avantages - centrée sur l'axe du contenu */}
          <NavigationArrow targetSection="avantages" />
        </section>

        {/* Section Avantages */}
        <section id="avantages" className="relative min-h-screen py-16 px-4 md:px-8">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Pourquoi Nous ?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <motion.div
                className="text-center p-6 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl mb-3">🏆</div>
                <h3 className="font-bold text-blue-400 mb-2">Expertise</h3>
                <p className="text-gray-300 text-sm">Plus de 5 ans d'expérience dans le montage PC</p>
              </motion.div>

              <motion.div
                className="text-center p-6 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl mb-3">📍</div>
                <h3 className="font-bold text-purple-400 mb-2">Sur Place</h3>
                <p className="text-gray-300 text-sm">Basé à Rennes, intervention dans tout le 35 (en visio également)</p>
              </motion.div>

              <motion.div
                className="text-center p-6 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl mb-3">💰</div>
                <h3 className="font-bold text-pink-400 mb-2">Satisfaction</h3>
                <p className="text-gray-300 text-sm">Devis gratuit et tarifs modulables</p>
              </motion.div>

              <motion.div
                className="text-center p-6 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl mb-3">🌐</div>
                <h3 className="font-bold text-green-400 mb-2">Disponibilitée</h3>
                <p className="text-gray-300 text-sm">Support à distance et visioconférence</p>
              </motion.div>
            </div>

            <motion.div
              className="text-center bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-xl p-8 border border-blue-500/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Prêt à assembler la machine de vos Rêves ?</h3>
              <p className="text-gray-300 mb-6">
                Contactez-nous pour un devis personnalisé et gratuit. Nous étudions votre projet et vous apportons les solutions les plus adaptée à vos besoins ainsi qu'a votre budget.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openContact}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Demander un devis
                </button>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Modal Contact */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1rem)',
              paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)',
              paddingLeft: 'calc(env(safe-area-inset-left, 0px) + 1rem)',
              paddingRight: 'calc(env(safe-area-inset-right, 0px) + 1rem)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeContact}
            />
            <motion.div
              className="relative bg-gray-900/95 backdrop-blur-md rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <ContactPage onClose={closeContact} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Configuration PC */}
      <AnimatePresence>
        {selectedConfig && selectedConfigData && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              paddingTop: 'calc(env(safe-area-inset-top, 0px) + 1rem)',
              paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)',
              paddingLeft: 'calc(env(safe-area-inset-left, 0px) + 1rem)',
              paddingRight: 'calc(env(safe-area-inset-right, 0px) + 1rem)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeConfigPopup}
            />
            <motion.div
              className="relative bg-gray-900/95 backdrop-blur-md rounded-xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="p-6 md:p-8">
                {/* Header avec bouton fermer */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedConfigData.title}</h2>
                  <button
                    onClick={closeConfigPopup}
                    className="text-gray-400 hover:text-white transition-colors text-2xl p-2"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Image et informations générales */}
                  <div>
                    <div className="relative rounded-xl overflow-hidden mb-6">
                      <img 
                        src={selectedConfigData.image}
                        alt={selectedConfigData.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <DollarSign className="w-6 h-6 text-green-400" />
                        <h3 className="text-xl font-bold text-green-400">Prix indicatif</h3>
                      </div>
                      <p className="text-2xl font-bold text-white mb-2">{selectedConfigData.price}</p>
                      <p className="text-gray-300 text-sm">Prix TTC, montage inclus</p>
                    </div>

                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Monitor className="w-6 h-6 text-blue-400" />
                        <h3 className="text-xl font-bold text-blue-400">Usage recommandé</h3>
                      </div>
                      <p className="text-gray-300 mb-3">{selectedConfigData.usage}</p>
                      <p className="text-gray-400 text-sm italic">{selectedConfigData.info}</p>
                    </div>
                  </div>

                  {/* Spécifications techniques */}
                  <div>
                    <h3 className="text-xl font-bold text-purple-400 mb-6 flex items-center gap-3">
                      <Cpu className="w-6 h-6" />
                      Spécifications techniques
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Cpu className="w-5 h-5 text-blue-400" />
                          <span className="font-semibold text-blue-400">Processeur</span>
                        </div>
                        <p className="text-white">{selectedConfigData.specs.cpu}</p>
                      </div>

                      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Monitor className="w-5 h-5 text-purple-400" />
                          <span className="font-semibold text-purple-400">Carte graphique</span>
                        </div>
                        <p className="text-white">{selectedConfigData.specs.gpu}</p>
                      </div>

                      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <MemoryStick className="w-5 h-5 text-green-400" />
                          <span className="font-semibold text-green-400">Mémoire RAM</span>
                        </div>
                        <p className="text-white">{selectedConfigData.specs.ram}</p>
                      </div>

                      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <HardDrive className="w-5 h-5 text-yellow-400" />
                          <span className="font-semibold text-yellow-400">Stockage</span>
                        </div>
                        <p className="text-white">{selectedConfigData.specs.storage}</p>
                      </div>

                      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Cpu className="w-5 h-5 text-pink-400" />
                          <span className="font-semibold text-pink-400">Carte mère</span>
                        </div>
                        <p className="text-white">{selectedConfigData.specs.motherboard}</p>
                      </div>

                      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Zap className="w-5 h-5 text-orange-400" />
                          <span className="font-semibold text-orange-400">Alimentation</span>
                        </div>
                        <p className="text-white">{selectedConfigData.specs.psu}</p>
                      </div>

                      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-600 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Monitor className="w-5 h-5 text-cyan-400" />
                          <span className="font-semibold text-cyan-400">Boîtier</span>
                        </div>
                        <p className="text-white">{selectedConfigData.specs.case}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        closeConfigPopup()
                        openContact()
                      }}
                      className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                      Demander un devis pour cette configuration
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HomePage
