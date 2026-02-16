/**
 * Module de calcul des prix CartZone.
 * Toutes les règles métier liées à la marge et aux promotions sont centralisées ici.
 */

export type PricingInput = {
  prixG2A: number
  fraisPasserelle: number
  pourcentagePromotion?: number
  pourcentageMargeAjustee?: number
}

export type PricingResult = {
  margeDeBase: number
  margeTotale: number
  promotionAppliquee: number
  promotionMaximaleAutorisee: number
  prixAvantPromotion: number
  prixFinal: number
  prixMinimumSecurise: number
  devise: "XOF"
  arrondiUtilise: "50" | "100"
}

const BUFFER_SECURITE = 0.03

/**
 * Retourne la marge de base dégressive selon le prix nominal.
 */
export function calculerMargeDeBase(prixG2A: number): number {
  if (prixG2A < 10_000) return 0.12
  if (prixG2A < 50_000) return 0.08
  return 0.05
}

/**
 * Arrondit un prix en FCFA sur les paliers 50 ou 100 les plus proches.
 */
export function arrondirPrixCommercial(prix: number): { prixArrondi: number; arrondiUtilise: "50" | "100" } {
  const candidate50 = Math.round(prix / 50) * 50
  const candidate100 = Math.round(prix / 100) * 100
  const best = Math.abs(prix - candidate50) <= Math.abs(prix - candidate100) ? candidate50 : candidate100

  return {
    prixArrondi: Math.max(100, best),
    arrondiUtilise: best === candidate50 ? "50" : "100",
  }
}

/**
 * Calcule le prix final en FCFA (XOF) en appliquant strictement les contraintes de marge CartZone.
 */
export function calculerPrixFinal(input: PricingInput): PricingResult {
  const { prixG2A, fraisPasserelle, pourcentagePromotion = 0, pourcentageMargeAjustee = 0 } = input

  if (prixG2A <= 0) {
    throw new Error("Le prix G2A doit être strictement positif.")
  }

  const margeDeBase = calculerMargeDeBase(prixG2A)
  const margeTotale = margeDeBase + pourcentageMargeAjustee
  const promotionMaximaleAutorisee = Math.max(0, margeTotale - BUFFER_SECURITE)
  const promotionAppliquee = Math.min(Math.max(pourcentagePromotion, 0), promotionMaximaleAutorisee)

  const coutMinimal = prixG2A + fraisPasserelle + prixG2A * BUFFER_SECURITE
  const prixAvantPromotion = prixG2A * (1 + margeTotale)
  const prixApresPromotionBrut = prixAvantPromotion * (1 - promotionAppliquee)
  const prixContraint = Math.max(prixApresPromotionBrut, coutMinimal)

  const { prixArrondi, arrondiUtilise } = arrondirPrixCommercial(prixContraint)

  // Vérifie qu'un éventuel arrondi à la baisse ne casse jamais la marge de sécurité.
  const prixFinal = prixArrondi < coutMinimal ? Math.ceil(coutMinimal / 50) * 50 : prixArrondi

  return {
    margeDeBase,
    margeTotale,
    promotionAppliquee,
    promotionMaximaleAutorisee,
    prixAvantPromotion: Math.round(prixAvantPromotion),
    prixFinal,
    prixMinimumSecurise: Math.round(coutMinimal),
    devise: "XOF",
    arrondiUtilise,
  }
}
