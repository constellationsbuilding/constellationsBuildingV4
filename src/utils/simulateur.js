
// Moteur d'estimation et utilitaires pour le simulateur PC
import { usageBase, adjustments, presets } from '../config/simulateur-pricing.js'

// État global du simulateur
export const simulatorState = {
  currentStep: 1,
  totalSteps: 6,
  choices: {
    usage: null,
    niveau: null,
    detail: null,
    priorites: [],
    ram: null,
    stockage: null
  },
  estimation: { minFinal: 0, maxFinal: 0, breakdown: [] }
}

// Codes internes pour tracking
export const internalCodes = {
  usage: {
    bureautique: 'U1',
    gaming: 'U2', 
    creation: 'U3',
    professionnel: 'U4',
    polyvalent: 'U5',
    surprise: 'U6'
  },
  niveau: {
    basique: 'N1',
    standard: 'N2',
    confort: 'N3',
    performance: 'N4',
    ultra: 'N5'
  },
  resolution: {
    r1080: 'R1',
    r1440: 'R2',
    r4k: 'R3',
    vr: 'R4'
  },
  domainePro: {
    bureautique: 'D1',
    developpement: 'D2',
    cao: 'D3',
    ia: 'D4',
    serveur: 'D5'
  },
  intensiteCreation: {
    leger: 'I1',
    standard: 'I2',
    intensif: 'I3',
    professionnel: 'I4'
  },
  priorites: {
    silence: 'P1',
    compacite: 'P2',
    design_sobre: 'P3',
    design_visible: 'P4',
    evolutif: 'P5',
    stockage_max: 'P6'
  },
  ram: {
    r8: 'M1',
    r16: 'M2',
    r32: 'M3',
    r64: 'M4'
  },
  stockage: {
    s500: 'S1',
    s1000: 'S2',
    s2000: 'S3',
    s4000: 'S4'
  }
}

// Labels lisibles pour l'utilisateur
export const labels = {
  usage: {
    bureautique: 'Bureautique & Navigation',
    gaming: 'Gaming & Divertissement',
    creation: 'Création & Multimédia',
    professionnel: 'Usage Professionnel',
    polyvalent: 'Usage Polyvalent',
    surprise: 'Surprise-moi !'
  },
  niveau: {
    basique: 'Utile',
    standard: 'Standard', 
    confort: 'Confort',
    performance: 'Performance',
    ultra: 'Ultra'
  },
  resolution: {
    r1080: '1080p (Full HD)',
    r1440: '1440p (2K)',
    r4k: '4K (Ultra HD)',
    vr: 'Réalité Virtuelle'
  },
  domainePro: {
    bureautique: 'Bureautique avancée',
    developpement: 'Développement',
    cao: 'CAO & Design 3D',
    ia: 'Intelligence Artificielle',
    serveur: 'Serveur & Virtualisation'
  },
  intensiteCreation: {
    leger: 'Retouche légère',
    standard: 'Montage standard',
    intensif: 'Production intensive',
    professionnel: 'Studio professionnel'
  },
  priorites: {
    silence: 'Fonctionnement silencieux',
    compacite: 'Format compact',
    design_sobre: 'Design sobre',
    design_visible: 'Design visible (RGB)',
    evolutif: 'Facilement évolutif',
    stockage_max: 'Stockage important'
  },
  ram: {
    r8: '8 Go',
    r16: '16 Go',
    r32: '32 Go', 
    r64: '64 Go+'
  },
  stockage: {
    s500: '500 Go',
    s1000: '1 To',
    s2000: '2 To',
    s4000: '4 To+'
  }
}

// Calcul de l'estimation
export function calculateEstimation(choices) {
  const breakdown = []
  
  // Plage de base selon l'usage
  const baseRange = usageBase[choices.usage]
  if (!baseRange) {
    return { minFinal: 0, maxFinal: 0, breakdown: ['Erreur: usage non défini'] }
  }
  
  let minFinal = baseRange.min
  let maxFinal = baseRange.max
  breakdown.push(`Base ${labels.usage[choices.usage]}: ${baseRange.min}€ - ${baseRange.max}€`)
  
  // Ajustements selon les choix
  const choiceKeys = ['niveau', 'detail', 'ram', 'stockage']
  
  for (const key of choiceKeys) {
    const choice = choices[key]
    if (!choice) continue
    
    let adjustment = null
    
    // Gestion spéciale pour le détail (résolution, domaine pro, intensité création)
    if (key === 'detail') {
      if (choices.usage === 'gaming' && adjustments.resolution[choice]) {
        adjustment = adjustments.resolution[choice]
      } else if (choices.usage === 'professionnel' && adjustments.domainePro[choice]) {
        adjustment = adjustments.domainePro[choice]
      } else if (choices.usage === 'creation' && adjustments.intensiteCreation[choice]) {
        adjustment = adjustments.intensiteCreation[choice]
      }
    } else {
      adjustment = adjustments[key] && adjustments[key][choice]
    }
    
    if (adjustment) {
      minFinal += adjustment.minAdd
      maxFinal += adjustment.maxAdd
      breakdown.push(`${getChoiceLabel(key, choice)}: ${adjustment.minAdd >= 0 ? '+' : ''}${adjustment.minAdd}€ / ${adjustment.maxAdd >= 0 ? '+' : ''}${adjustment.maxAdd}€`)
    }
  }
  
  // Ajustements des priorités (max 2)
  if (choices.priorites && choices.priorites.length > 0) {
    for (const priorite of choices.priorites) {
      const adjustment = adjustments.priorites[priorite]
      if (adjustment) {
        minFinal += adjustment.minAdd
        maxFinal += adjustment.maxAdd
        breakdown.push(`${labels.priorites[priorite]}: +${adjustment.minAdd}€ / +${adjustment.maxAdd}€`)
      }
    }
  }
  
  // S'assurer que les valeurs restent positives
  minFinal = Math.max(minFinal, 200)
  maxFinal = Math.max(maxFinal, minFinal + 100)
  
  return { minFinal, maxFinal, breakdown }
}

// Obtenir le label d'un choix
function getChoiceLabel(category, choice) {
  if (category === 'detail') {
    // Déterminer la catégorie de détail selon le contexte
    if (labels.resolution[choice]) return labels.resolution[choice]
    if (labels.domainePro[choice]) return labels.domainePro[choice]  
    if (labels.intensiteCreation[choice]) return labels.intensiteCreation[choice]
    return choice
  }
  return labels[category] && labels[category][choice] || choice
}

// Générer le code interne compressé
export function generateInternalCode(choices) {
  const codes = []
  
  // Usage
  if (choices.usage && internalCodes.usage[choices.usage]) {
    codes.push(internalCodes.usage[choices.usage])
  }
  
  // Niveau
  if (choices.niveau && internalCodes.niveau[choices.niveau]) {
    codes.push(internalCodes.niveau[choices.niveau])
  }
  
  // Détail (résolution, domaine pro, etc.)
  if (choices.detail) {
    const detailCode = internalCodes.resolution[choices.detail] || 
                      internalCodes.domainePro[choices.detail] ||
                      internalCodes.intensiteCreation[choices.detail]
    if (detailCode) codes.push(detailCode)
  }
  
  // Priorités
  if (choices.priorites && choices.priorites.length > 0) {
    const prioriteCodes = choices.priorites
      .map(p => internalCodes.priorites[p])
      .filter(Boolean)
    if (prioriteCodes.length > 0) {
      codes.push(prioriteCodes.join(''))
    }
  }
  
  // RAM et Stockage
  if (choices.ram && internalCodes.ram[choices.ram]) {
    codes.push(internalCodes.ram[choices.ram])
  }
  if (choices.stockage && internalCodes.stockage[choices.stockage]) {
    codes.push(internalCodes.stockage[choices.stockage])
  }
  
  return codes.join('-')
}

// Générer le résumé lisible
export function generateReadableSummary(choices) {
  const parts = []
  
  if (choices.usage) {
    parts.push(labels.usage[choices.usage])
  }
  
  if (choices.niveau) {
    parts.push(labels.niveau[choices.niveau])
  }
  
  if (choices.detail) {
    parts.push(getChoiceLabel('detail', choices.detail))
  }
  
  if (choices.priorites && choices.priorites.length > 0) {
    const prioriteLabels = choices.priorites.map(p => labels.priorites[p]).filter(Boolean)
    if (prioriteLabels.length > 0) {
      parts.push(prioriteLabels.join(' + '))
    }
  }
  
  if (choices.ram) {
    parts.push(`RAM ${labels.ram[choices.ram]}`)
  }
  
  if (choices.stockage) {
    parts.push(`Stockage ${labels.stockage[choices.stockage]}`)
  }
  
  return parts.join(' > ')
}

// Appliquer un preset
export function applyPreset(presetName) {
  const preset = presets[presetName]
  if (!preset) return
  
  Object.assign(simulatorState.choices, preset)
  simulatorState.estimation = calculateEstimation(simulatorState.choices)
}

// Réinitialiser le simulateur
export function resetSimulator() {
  simulatorState.currentStep = 1
  simulatorState.choices = {
    usage: null,
    niveau: null,
    detail: null,
    priorites: [],
    ram: null,
    stockage: null
  }
  simulatorState.estimation = { minFinal: 0, maxFinal: 0, breakdown: [] }
}

// Mettre à jour un choix et recalculer
export function updateChoice(category, value) {
  if (category === 'priorites') {
    // Gestion spéciale pour les priorités (max 2)
    const priorites = simulatorState.choices.priorites || []
    if (priorites.includes(value)) {
      // Retirer si déjà sélectionné
      simulatorState.choices.priorites = priorites.filter(p => p !== value)
    } else if (priorites.length < 2) {
      // Ajouter si moins de 2 sélectionnées
      simulatorState.choices.priorites = [...priorites, value]
    }
  } else {
    simulatorState.choices[category] = value
  }
  
  // Recalculer l'estimation
  simulatorState.estimation = calculateEstimation(simulatorState.choices)
}
