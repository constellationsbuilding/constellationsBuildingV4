
// Configuration EmailJS pour l'envoi d'emails
// 
// ÉTAPES DE CONFIGURATION :
// 
// 1. Créer un compte sur https://www.emailjs.com/
// 2. Créer un service email (Gmail, Outlook, etc.)
// 3. Créer un template d'email avec les variables suivantes :
//    - {{from_name}} : Nom complet de l'expéditeur
//    - {{from_email}} : Email de l'expéditeur
//    - {{phone}} : Téléphone (optionnel)
//    - {{project_type}} : Type de projet
//    - {{budget}} : Budget approximatif
//    - {{message}} : Message détaillé
//    - {{to_email}} : Email de destination (constellationsbuilding@gmail.com)
//
// 4. Remplacer les valeurs dans HomePage.tsx :
//    - YOUR_SERVICE_ID : L'ID de votre service EmailJS
//    - YOUR_TEMPLATE_ID : L'ID de votre template
//    - YOUR_PUBLIC_KEY : Votre clé publique EmailJS
//
// EXEMPLE DE TEMPLATE EMAIL :
/*
Objet : Nouvelle demande de devis - {{project_type}}

Bonjour,

Vous avez reçu une nouvelle demande de devis via le site Constellations Building.

INFORMATIONS CLIENT :
- Nom : {{from_name}}
- Email : {{from_email}}
- Téléphone : {{phone}}

PROJET :
- Type : {{project_type}}
- Budget : {{budget}}

MESSAGE :
{{message}}

---
Email envoyé automatiquement depuis constellations-building.com
*/

export const emailConfig = {
  serviceId: 'service_dnb1jkz', // À remplacer
  templateId: 'template_cnriac4', // À remplacer
  publicKey: 'MQwtLj9e2E7sHVIGk' // À remplacer
}

// Fonction utilitaire pour valider la configuration
export const validateEmailConfig = () => {
  const { serviceId, templateId, publicKey } = emailConfig
  
  if (serviceId === 'service_dnb1jkz' || 
      templateId === 'template_cnriac4' || 
      publicKey === 'MQwtLj9e2E7sHVIGk') {
    console.warn('⚠️ Configuration EmailJS incomplète. Veuillez configurer vos identifiants.')
    return false
  }
  
  return true
}
