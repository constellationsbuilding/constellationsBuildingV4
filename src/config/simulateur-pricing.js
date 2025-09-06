
// Configuration des plages de prix et ajustements pour le simulateur PC
// Modifiez les valeurs ici pour ajuster les estimations sans toucher au code

export const usageBase = {
  bureautique: { min: 400, max: 800 },
  gaming: { min: 800, max: 1600 },
  creation: { min: 1200, max: 2800 },
  professionnel: { min: 1400, max: 4000 },
  polyvalent: { min: 900, max: 2200 },
  surprise: { min: 800, max: 1800 } // Preset par défaut
}

export const adjustments = {
  // Niveaux d'intensité
  niveau: {
    basique: { minAdd: -100, maxAdd: -200 },
    standard: { minAdd: 0, maxAdd: 0 },
    confort: { minAdd: 100, maxAdd: 200 },
    performance: { minAdd: 200, maxAdd: 400 },
    ultra: { minAdd: 400, maxAdd: 800 }
  },
  
  // Résolutions pour gaming
  resolution: {
    r1080: { minAdd: 0, maxAdd: 0 },
    r1440: { minAdd: 150, maxAdd: 300 },
    r4k: { minAdd: 300, maxAdd: 600 },
    vr: { minAdd: 400, maxAdd: 700 }
  },
  
  // Domaines professionnels
  domainePro: {
    bureautique: { minAdd: -200, maxAdd: -400 },
    developpement: { minAdd: 0, maxAdd: 0 },
    cao: { minAdd: 300, maxAdd: 600 },
    ia: { minAdd: 600, maxAdd: 1200 },
    serveur: { minAdd: 400, maxAdd: 800 }
  },
  
  // Intensité création
  intensiteCreation: {
    leger: { minAdd: -200, maxAdd: -400 },
    standard: { minAdd: 0, maxAdd: 0 },
    intensif: { minAdd: 300, maxAdd: 600 },
    professionnel: { minAdd: 600, maxAdd: 1200 }
  },
  
  // RAM
  ram: {
    r8: { minAdd: -100, maxAdd: -150 },
    r16: { minAdd: 0, maxAdd: 0 },
    r32: { minAdd: 150, maxAdd: 250 },
    r64: { minAdd: 400, maxAdd: 600 }
  },
  
  // Stockage
  stockage: {
    s500: { minAdd: -50, maxAdd: -80 },
    s1000: { minAdd: 0, maxAdd: 0 },
    s2000: { minAdd: 100, maxAdd: 150 },
    s4000: { minAdd: 200, maxAdd: 300 }
  },
  
  // Priorités secondaires
  priorites: {
    silence: { minAdd: 80, maxAdd: 120 },
    compacite: { minAdd: 100, maxAdd: 150 },
    design_sobre: { minAdd: 50, maxAdd: 250 },
    design_visible: { minAdd: 80, maxAdd: 350 },
    evolutif: { minAdd: 50, maxAdd: 300 },
    stockage_max: { minAdd: 100, maxAdd: 400 }
  }
}

// Presets pour "Surprise-moi"
export const presets = {
  surprise: {
    usage: 'polyvalent',
    niveau: 'confort',
    priorites: ['evolutif'],
    ram: 'r16',
    stockage: 's1000'
  }
}
