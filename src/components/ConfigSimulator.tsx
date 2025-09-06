import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {ChevronLeft, ChevronRight, Calculator, Check, Edit, Download, Send} from 'lucide-react'
import { 
  simulatorState, 
  updateChoice, 
  resetSimulator, 
  generateInternalCode, 
  generateReadableSummary,
  labels,
  applyPreset
} from '../utils/simulateur.js'

interface ConfigSimulatorProps {
  onRequestQuote: (summary: string, code: string, estimation: { minFinal: number, maxFinal: number }) => void
}

const ConfigSimulator: React.FC<ConfigSimulatorProps> = ({ onRequestQuote }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [choices, setChoices] = useState(simulatorState.choices)
  const [estimation, setEstimation] = useState(simulatorState.estimation)

  // Synchroniser avec l'état global
  useEffect(() => {
    setChoices({ ...simulatorState.choices })
    setEstimation({ ...simulatorState.estimation })
  }, [simulatorState.choices, simulatorState.estimation])

  const totalSteps = 6

  const handleChoice = (category: string, value: string) => {
    updateChoice(category, value)
    setChoices({ ...simulatorState.choices })
    setEstimation({ ...simulatorState.estimation })
    
    // Gestion spéciale pour "Surprise-moi"
    if (category === 'usage' && value === 'surprise') {
      applyPreset('surprise')
      setChoices({ ...simulatorState.choices })
      setEstimation({ ...simulatorState.estimation })
      // Passer directement au résumé
      setCurrentStep(6)
      return
    }
    
    // Passer à l'étape suivante automatiquement (sauf pour les priorités)
    if (category !== 'priorites' && currentStep < totalSteps) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300)
    }
  }

  const nextStep = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const goToStep = (step: number, e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    setCurrentStep(step)
  }

  const handleRequestQuote = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    const code = generateInternalCode(choices)
    const summary = generateReadableSummary(choices)
    // Passer l'estimation avec le résumé et le code
    onRequestQuote(summary, code, estimation)
  }

  const handleReset = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    resetSimulator()
    setChoices({ ...simulatorState.choices })
    setEstimation({ ...simulatorState.estimation })
    setCurrentStep(1)
  }

  const handleEditStep = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    setCurrentStep(1)
  }

  // Configuration des étapes
  const getStepConfig = () => {
    switch (currentStep) {
      case 1:
        return {
          title: "Usage principal",
          subtitle: "Comment allez-vous principalement utiliser votre PC ?",
          options: [
            { key: 'bureautique', label: 'Bureautique & Navigation', desc: 'Internet, bureautique, multimédia léger' },
            { key: 'gaming', label: 'Gaming & Divertissement', desc: 'Jeux vidéo, streaming, divertissement' },
            { key: 'creation', label: 'Création & Multimédia', desc: 'Montage vidéo, photo, design graphique' },
            { key: 'professionnel', label: 'Usage Professionnel', desc: 'Développement, Logiciels, calculs intensifs' },
            { key: 'polyvalent', label: 'Usage Polyvalent', desc: 'Un peu de tout, usage mixte' },
            { key: 'surprise', label: 'Equilibre', desc: 'Configuration équilibrée recommandée' }
          ],
          category: 'usage',
          multiSelect: false
        }
      
      case 2:
        return {
          title: "Niveau d'exigence",
          subtitle: "Quel niveau de performance souhaitez-vous ?",
          options: [
            { key: 'basique', label: 'Utile', desc: 'Pour les tâches essentielles' },
            { key: 'standard', label: 'Standard', desc: 'Bon équilibre qualité/prix' },
            { key: 'confort', label: 'Confort', desc: 'Fluidité et réactivité' },
            { key: 'performance', label: 'Performance', desc: 'Hautes performances' },
            { key: 'ultra', label: 'Ultra', desc: 'Le meilleur possible' }
          ],
          category: 'niveau',
          multiSelect: false
        }
      
      case 3:
        return getDetailStepConfig()
      
      case 4:
        return {
          title: "Priorités secondaires",
          subtitle: "Quels aspects sont importants pour vous ? (max 2 choix)",
          options: [
            { key: 'silence', label: 'Fonctionnement silencieux', desc: 'PC très discret' },
            { key: 'compacite', label: 'Format compact', desc: 'Encombrement réduit' },
            { key: 'design_sobre', label: 'Design sobre', desc: 'Apparence discrète' },
            { key: 'design_visible', label: 'Design visible (RGB)', desc: 'Éclairage et style gaming' },
            { key: 'evolutif', label: 'Facilement évolutif', desc: 'Possibilité d\'upgrades futurs' },
            { key: 'stockage_max', label: 'Stockage important', desc: 'Beaucoup d\'espace de stockage' }
          ],
          category: 'priorites',
          multiSelect: true,
          maxSelections: 2
        }
      
      case 5:
        return {
          title: "Mémoire et stockage",
          subtitle: "Choisissez la quantité de RAM et d'espace de stockage",
          options: [
            { key: 'r8-s500', label: '8 Go RAM + 500 Go', desc: 'Configuration de base' },
            { key: 'r16-s1000', label: '16 Go RAM + 1 To', desc: 'Configuration recommandée' },
            { key: 'r16-s2000', label: '16 Go RAM + 2 To', desc: 'Plus de stockage' },
            { key: 'r32-s1000', label: '32 Go RAM + 1 To', desc: 'Plus de mémoire' },
            { key: 'r32-s2000', label: '32 Go RAM + 2 To', desc: 'Configuration avancée' },
            { key: 'r64-s4000', label: '64 Go RAM + 4 To', desc: 'Configuration professionnelle' }
          ],
          category: 'memory_storage',
          multiSelect: false
        }
      
      case 6:
        return {
          title: "Résumé de votre configuration",
          subtitle: "Vérifiez votre sélection et obtenez votre estimation",
          category: 'summary'
        }
      
      default:
        return { title: '', subtitle: '', options: [], category: '', multiSelect: false }
    }
  }

  const getDetailStepConfig = () => {
    switch (choices.usage) {
      case 'gaming':
        return {
          title: "Résolution de jeu",
          subtitle: "À quelle résolution souhaitez-vous jouer ?",
          options: [
            { key: 'r1080', label: '1080p (Full HD)', desc: 'Résolution standard, excellent rapport qualité/prix' },
            { key: 'r1440', label: '1440p (2K)', desc: 'Résolution élevée, très bon compromis' },
            { key: 'r4k', label: '4K (Ultra HD)', desc: 'Très haute résolution, exigeant' },
            { key: 'vr', label: 'Réalité Virtuelle', desc: 'Compatible casques VR' }
          ],
          category: 'detail',
          multiSelect: false
        }
      
      case 'professionnel':
        return {
          title: "Domaine professionnel",
          subtitle: "Dans quel domaine travaillez-vous ?",
          options: [
            { key: 'bureautique', label: 'Bureautique avancée', desc: 'Traitement de données, comptabilité' },
            { key: 'developpement', label: 'Développement', desc: 'Programmation, développement web/logiciel' },
            { key: 'cao', label: 'CAO & Design 3D', desc: 'Conception assistée, modélisation 3D' },
            { key: 'ia', label: 'Intelligence Artificielle', desc: 'Machine learning, calculs intensifs' },
            { key: 'serveur', label: 'Serveur & Virtualisation', desc: 'Administration système, VMs' }
          ],
          category: 'detail',
          multiSelect: false
        }
      
      case 'creation':
        return {
          title: "Intensité de création",
          subtitle: "Quel type de création multimédia ?",
          options: [
            { key: 'leger', label: 'Retouche légère', desc: 'Photos, graphismes simples' },
            { key: 'standard', label: 'Montage standard', desc: 'Vidéos HD, projets moyens' },
            { key: 'intensif', label: 'Production intensive', desc: 'Vidéos 4K, projets complexes' },
            { key: 'professionnel', label: 'Studio professionnel', desc: 'Production cinéma, broadcast' }
          ],
          category: 'detail',
          multiSelect: false
        }
      
      default:
        // Pour bureautique, polyvalent, surprise : passer directement aux priorités
        setTimeout(() => setCurrentStep(4), 100)
        return {
          title: "Configuration...",
          subtitle: "Passage à l'étape suivante...",
          options: [],
          category: 'skip',
          multiSelect: false
        }
    }
  }

  const handleMemoryStorageChoice = (value: string) => {
    const [ram, storage] = value.split('-')
    updateChoice('ram', ram)
    updateChoice('stockage', storage)
    setChoices({ ...simulatorState.choices })
    setEstimation({ ...simulatorState.estimation })
    setTimeout(() => setCurrentStep(6), 300)
  }

  const stepConfig = getStepConfig()

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 md:p-8" style={{ position: 'relative', zIndex: 103 }}>
      {/* En-tête avec indicateur d'étape */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
            <Calculator className="w-6 h-6 text-blue-400" />
            Constellations Builder
          </h3>
          <span className="text-sm text-gray-400">
            Étape {currentStep}/{totalSteps}
          </span>
        </div>
        
        {/* Barre de progression */}
        <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Indicateurs d'étapes */}
        <div className="flex justify-between items-center text-xs">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <button
              key={step}
              onClick={(e) => goToStep(step, e)}
              onTouchStart={(e) => {
                e.preventDefault()
                e.stopPropagation()
                goToStep(step)
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                step <= currentStep
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
              style={{ 
                touchAction: 'manipulation',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                zIndex: 104
              }}
            >
              {step < currentStep ? <Check className="w-4 h-4" /> : step}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
          style={{ zIndex: 104 }}
        >
          {currentStep < 6 ? (
            <div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-2">
                {stepConfig.title}
              </h4>
              <p className="text-gray-300 mb-6">
                {stepConfig.subtitle}
              </p>

              {stepConfig.category === 'skip' ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="text-gray-400">Configuration en cours...</p>
                </div>
              ) : stepConfig.category === 'memory_storage' ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {stepConfig.options.map((option) => (
                    <motion.button
                      key={option.key}
                      onClick={() => handleMemoryStorageChoice(option.key)}
                      onTouchStart={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleMemoryStorageChoice(option.key)
                      }}
                      className="p-4 bg-gray-800/50 border border-gray-600 rounded-lg hover:border-blue-500 hover:bg-gray-800/70 transition-all duration-300 text-left group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ 
                        touchAction: 'manipulation',
                        WebkitTouchCallout: 'none',
                        WebkitUserSelect: 'none',
                        userSelect: 'none',
                        zIndex: 105
                      }}
                    >
                      <h5 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {option.label}
                      </h5>
                      <p className="text-sm text-gray-400">
                        {option.desc}
                      </p>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {stepConfig.options.map((option) => {
                    const isSelected = stepConfig.multiSelect
                      ? choices.priorites?.includes(option.key)
                      : choices[stepConfig.category as keyof typeof choices] === option.key
                    
                    const isDisabled = stepConfig.multiSelect && 
                      choices.priorites?.length >= (stepConfig.maxSelections || 2) && 
                      !isSelected

                    return (
                      <motion.button
                        key={option.key}
                        onClick={() => !isDisabled && handleChoice(stepConfig.category, option.key)}
                        onTouchStart={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          if (!isDisabled) {
                            handleChoice(stepConfig.category, option.key)
                          }
                        }}
                        disabled={isDisabled}
                        className={`p-4 border rounded-lg transition-all duration-300 text-left group ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/30'
                            : isDisabled
                            ? 'bg-gray-800/30 border-gray-700 opacity-50 cursor-not-allowed'
                            : 'bg-gray-800/50 border-gray-600 hover:border-blue-500 hover:bg-gray-800/70'
                        }`}
                        whileHover={!isDisabled ? { scale: 1.02 } : {}}
                        whileTap={!isDisabled ? { scale: 0.98 } : {}}
                        style={{ 
                          touchAction: 'manipulation',
                          WebkitTouchCallout: 'none',
                          WebkitUserSelect: 'none',
                          userSelect: 'none',
                          zIndex: 105
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className={`font-semibold transition-colors ${
                            isSelected ? 'text-blue-400' : 'text-white group-hover:text-blue-400'
                          }`}>
                            {option.label}
                          </h5>
                          {isSelected && <Check className="w-5 h-5 text-blue-400" />}
                        </div>
                        <p className="text-sm text-gray-400">
                          {option.desc}
                        </p>
                      </motion.button>
                    )
                  })}
                </div>
              )}

              {stepConfig.multiSelect && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-400">
                    {choices.priorites?.length || 0} / {stepConfig.maxSelections || 2} sélectionnés
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Étape 6 : Résumé
            <div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-6">
                Résumé de votre configuration
              </h4>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Résumé des choix */}
                <div className="space-y-4">
                  <h5 className="font-semibold text-blue-400 mb-4">Vos choix :</h5>
                  
                  <div className="space-y-3">
                    {choices.usage && (
                      <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                        <span className="text-gray-300">Usage :</span>
                        <span className="text-white font-medium">{labels.usage[choices.usage]}</span>
                      </div>
                    )}
                    
                    {choices.niveau && (
                      <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                        <span className="text-gray-300">Niveau :</span>
                        <span className="text-white font-medium">{labels.niveau[choices.niveau]}</span>
                      </div>
                    )}
                    
                    {choices.detail && (
                      <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                        <span className="text-gray-300">Spécificité :</span>
                        <span className="text-white font-medium">
                          {labels.resolution?.[choices.detail] || 
                           labels.domainePro?.[choices.detail] || 
                           labels.intensiteCreation?.[choices.detail]}
                        </span>
                      </div>
                    )}
                    
                    {choices.priorites && choices.priorites.length > 0 && (
                      <div className="p-3 bg-gray-800/30 rounded-lg">
                        <span className="text-gray-300">Priorités :</span>
                        <div className="mt-2 space-y-1">
                          {choices.priorites.map(priorite => (
                            <span key={priorite} className="inline-block bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-sm mr-2">
                              {labels.priorites[priorite]}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {choices.ram && (
                      <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                        <span className="text-gray-300">RAM :</span>
                        <span className="text-white font-medium">{labels.ram[choices.ram]}</span>
                      </div>
                    )}
                    
                    {choices.stockage && (
                      <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                        <span className="text-gray-300">Stockage :</span>
                        <span className="text-white font-medium">{labels.stockage[choices.stockage]}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Estimation */}
                <div>
                  <h5 className="font-semibold text-purple-400 mb-4">Estimation de prix :</h5>
                  
                  <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        {estimation.minFinal}€ - {estimation.maxFinal}€
                      </div>
                      <p className="text-gray-300 text-sm">Précisez cette éstimation grace à votre devis pérsonnalisé gratuit !</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={handleRequestQuote}
                      onTouchStart={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleRequestQuote()
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                      style={{ 
                        touchAction: 'manipulation',
                        WebkitTouchCallout: 'none',
                        WebkitUserSelect: 'none',
                        userSelect: 'none',
                        zIndex: 105
                      }}
                    >
                      <Send className="w-5 h-5" />
                      Envoyer la demande de devis
                    </button>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={handleEditStep}
                        onTouchStart={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleEditStep()
                        }}
                        className="border border-gray-600 text-gray-300 hover:bg-gray-800 px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                        style={{ 
                          touchAction: 'manipulation',
                          WebkitTouchCallout: 'none',
                          WebkitUserSelect: 'none',
                          userSelect: 'none',
                          zIndex: 105
                        }}
                      >
                        <Edit className="w-4 h-4" />
                        Modifier
                      </button>
                      
                      <button
                        onClick={handleReset}
                        onTouchStart={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleReset()
                        }}
                        className="border border-gray-600 text-gray-300 hover:bg-gray-800 px-4 py-3 rounded-lg transition-all duration-300"
                        style={{ 
                          touchAction: 'manipulation',
                          WebkitTouchCallout: 'none',
                          WebkitUserSelect: 'none',
                          userSelect: 'none',
                          zIndex: 105
                        }}
                      >
                        Recommencer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {currentStep < 6 && stepConfig.category !== 'skip' && (
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700" style={{ zIndex: 105 }}>
          <button
            onClick={prevStep}
            onTouchStart={(e) => {
              e.preventDefault()
              e.stopPropagation()
              prevStep()
            }}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style={{ 
              touchAction: 'manipulation',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              zIndex: 106
            }}
          >
            <ChevronLeft className="w-4 h-4" />
            Précédent
          </button>

          {(stepConfig.category !== 'priorites' && stepConfig.category !== 'memory_storage') && (
            <button
              onClick={nextStep}
              onTouchStart={(e) => {
                e.preventDefault()
                e.stopPropagation()
                nextStep()
              }}
              disabled={currentStep === totalSteps}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ 
                touchAction: 'manipulation',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                zIndex: 106
              }}
            >
              Suivant
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {stepConfig.category === 'priorites' && (
            <button
              onClick={nextStep}
              onTouchStart={(e) => {
                e.preventDefault()
                e.stopPropagation()
                nextStep()
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              style={{ 
                touchAction: 'manipulation',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                zIndex: 106
              }}
            >
              Continuer
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default ConfigSimulator
