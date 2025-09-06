
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {X, Send, Loader, CheckCircle, AlertCircle, Calculator, Phone, Mail, MapPin, Clock, FileText, MessageSquare} from 'lucide-react'
import emailjs from '@emailjs/browser'

interface ContactPageProps {
  onClose: () => void
}

const ContactPage: React.FC<ContactPageProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  })
  
  const [simulatorData, setSimulatorData] = useState<{
    summary: string
    code: string
    estimation: string
    projectType: string
  } | null>(null)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Récupérer les données du simulateur au chargement
  useEffect(() => {
    const storedData = localStorage.getItem('simulatorData')
    if (storedData) {
      try {
        const data = JSON.parse(storedData)
        setSimulatorData(data)
        // Pré-remplir le type de projet
        setFormData(prev => ({
          ...prev,
          projectType: data.projectType || 'configuration-expert'
        }))
        // Nettoyer le localStorage après récupération
        localStorage.removeItem('simulatorData')
      } catch (error) {
        console.error('Erreur lors de la récupération des données du simulateur:', error)
      }
    }
  }, [])

  const projectTypes = [
    { value: 'particulier', label: 'Particulier - PC personnalisé' },
    { value: 'professionnel', label: 'Professionnel - Station de travail' },
    { value: 'configuration-expert', label: 'Configuration Expert' },
    { value: 'reparation', label: 'Réparation / Upgrade' },
    { value: 'autre', label: 'Autre demande' }
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Le type de projet est requis'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Un message est requis'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Préparer les données pour EmailJS avec toutes les données du simulateur
      const emailData = {
        to_name: 'Constellations Building',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Non renseigné',
        project_type: projectTypes.find(p => p.value === formData.projectType)?.label || formData.projectType,
        message: formData.message,
        
        // ===== DONNÉES DU SIMULATEUR PC =====
        // Indicateur de présence du simulateur
        has_simulator_data: simulatorData ? 'Oui' : 'Non',
        
        // Données principales du simulateur
        simulator_summary: simulatorData?.summary || '',
        simulator_code: simulatorData?.code || '',
        simulator_estimation: simulatorData?.estimation || '',
        
        // Données détaillées du simulateur (si disponibles)
        simulator_usage: simulatorData?.usage || '',
        simulator_cpu: simulatorData?.cpu || '',
        simulator_gpu: simulatorData?.gpu || '',
        simulator_ram: simulatorData?.ram || '',
        simulator_storage: simulatorData?.storage || '',
        simulator_motherboard: simulatorData?.motherboard || '',
        simulator_psu: simulatorData?.psu || '',
        simulator_case: simulatorData?.case || '',
        simulator_cooling: simulatorData?.cooling || '',
        simulator_peripherals: simulatorData?.peripherals || '',
        
        // Données de prix détaillées
        simulator_base_price: simulatorData?.basePrice || '',
        simulator_min_price: simulatorData?.minPrice || '',
        simulator_max_price: simulatorData?.maxPrice || '',
        simulator_final_min: simulatorData?.finalMin || '',
        simulator_final_max: simulatorData?.finalMax || '',
        
        // Données de configuration
        simulator_config_type: simulatorData?.configType || '',
        simulator_performance_level: simulatorData?.performanceLevel || '',
        simulator_special_requirements: simulatorData?.specialRequirements || '',
        
        // Métadonnées
        simulator_generation_date: simulatorData?.generationDate || '',
        simulator_version: simulatorData?.version || ''
      }

      console.log('Envoi des données avec simulateur:', emailData)

      await emailjs.send(
        'service_dnb1jkz',
        'template_cnriac4',
        emailData,
        'MQwtLj9e2E7sHVIGk'
      )

      setSubmitStatus('success')
      
      // Réinitialiser le formulaire après succès
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          message: ''
        })
        setSimulatorData(null)
        onClose()
      }, 2000)

    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Demande de devis</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors text-2xl p-2"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Section Nos Coordonnées */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-6 bg-gray-800/30 border border-gray-700 rounded-xl"
      >
        <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5" />
          Nos Coordonnées
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-gray-300 text-sm">Email</p>
                <p className="text-white font-medium">constellationsbuilding@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-gray-300 text-sm">Téléphone</p>
                <p className="text-white font-medium">06 2* 2* 06 6*</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-gray-300 text-sm">Zone d'intervention</p>
                <p className="text-white font-medium">Rennes et Ille-et-Vilaine (35)</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-gray-300 text-sm">Disponibilité</p>
                <p className="text-white font-medium">10h30-20h00</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section Processus */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 p-6 bg-gray-800/30 border border-gray-700 rounded-xl"
      >
        <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Processus
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-900/50 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">1</div>
            <h4 className="font-semibold text-blue-400 mb-2">Analyse</h4>
            <p className="text-gray-300 text-sm">Étude de vos besoins et contraintes</p>
          </div>
          
          <div className="text-center p-4 bg-gray-900/50 rounded-lg">
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">2</div>
            <h4 className="font-semibold text-purple-400 mb-2">Devis</h4>
            <p className="text-gray-300 text-sm">Proposition de devis personnalisé et détaillé par e-mail</p>
          </div>
          
          <div className="text-center p-4 bg-gray-900/50 rounded-lg">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">3</div>
            <h4 className="font-semibold text-green-400 mb-2">Final</h4>
            <p className="text-gray-300 text-sm">Concrétisation de votre projet PC</p>
          </div>
        </div>
      </motion.div>

      {/* Affichage des données du simulateur si disponibles */}
      {simulatorData && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-blue-400">Configuration générée</h3>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Estimation :</span>
              <span className="text-white font-medium">{simulatorData.estimation}</span>
            </div>
            <div className="text-gray-400 text-xs">
              Code de configuration : {simulatorData.code}
            </div>
            <details className="mt-2">
              <summary className="text-blue-400 cursor-pointer hover:text-blue-300">
                Voir le résumé complet
              </summary>
              <div className="mt-2 p-2 bg-gray-800/50 rounded text-xs text-gray-300 whitespace-pre-line">
                {simulatorData.summary}
              </div>
            </details>
          </div>
        </motion.div>
      )}

      {/* Formulaire */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Votre Demande
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Nom */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.name ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Votre nom complet"
              />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="votre@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            {/* Téléphone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="06 12 34 56 78"
              />
            </div>

            {/* Type de projet */}
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                Type de projet *
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.projectType ? 'border-red-500' : 'border-gray-600'
                }`}
              >
                <option value="">Sélectionnez un type</option>
                {projectTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.projectType && <p className="mt-1 text-sm text-red-400">{errors.projectType}</p>}
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Description de votre projet *
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical ${
                errors.message ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Décrivez votre projet, vos besoins spécifiques, contraintes techniques..."
            />
            {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
          </div>

          {/* Status messages */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-4 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Votre demande a été envoyée avec succès ! Nous vous recontacterons rapidement.</span>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-4 bg-red-600/20 border border-red-500/30 rounded-lg text-red-400"
            >
              <AlertCircle className="w-5 h-5" />
              <span>Erreur lors de l'envoi. Veuillez réessayer ou nous contacter directement.</span>
            </motion.div>
          )}

          {/* Submit button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Envoyer la demande
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Info complémentaire */}
      <div className="mt-8 p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2">Informations importantes</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Devis gratuit</li>
          <li>• Réponse sous 24h/72h</li>
          <li>• Possibilité de rendez-vous physique et en visioconférence</li>
          <li>• Service disponible à Rennes et en Ille-et-Vilaine (35)</li>
        </ul>
      </div>
    </div>
  )
}

export default ContactPage
