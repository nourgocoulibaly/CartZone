import { acheterCarteSurG2A, recupererOffreEligibileLowestPrice } from "@/api/g2a-client"
import { calculerPrixFinal } from "@/billing/pricing"
import { chiffrerCleCadeau } from "@/delivery/key-encryption"
import { envoyerCleParEmail } from "@/delivery/resend-service"

type PaymentValidatedEvent = {
  orderRef: string
  clientEmail: string
  clientNom: string
  productSku: string
  productLabel: string
  quantite: number
  montantPaye: number
  fraisPasserelle: number
  pourcentagePromotion?: number
}

/**
 * Pipeline back-to-back principal déclenché après validation du paiement.
 */
export async function traiterPaiementValide(event: PaymentValidatedEvent): Promise<{ statut: "HOLD" | "DELIVERED"; motif?: string }> {
  console.log(`Webhook reçu pour la commande ${event.orderRef}. Démarrage du pipeline back-to-back.`)

  const offreLowest = await recupererOffreEligibileLowestPrice(event.productSku)

  if (!offreLowest) {
    console.warn("Aucune offre éligible (rating > 98%) trouvée sur G2A. Commande placée en HOLD.")
    return { statut: "HOLD", motif: "Aucune offre conforme aux critères de fiabilité." }
  }

  const pricing = calculerPrixFinal({
    prixG2A: offreLowest.prix,
    fraisPasserelle: event.fraisPasserelle,
    pourcentagePromotion: event.pourcentagePromotion,
  })

  if (offreLowest.prix > event.montantPaye || pricing.prixMinimumSecurise > event.montantPaye) {
    console.warn("Le coût fournisseur est devenu supérieur au prix payé. Commande placée en HOLD.")
    return { statut: "HOLD", motif: "Variation de prix G2A défavorable." }
  }

  const achat = await acheterCarteSurG2A({
    offreId: offreLowest.id,
    quantite: event.quantite,
  })

  const cleChiffree = chiffrerCleCadeau(achat.cleBrute)

  await envoyerCleParEmail({
    email: event.clientEmail,
    nomClient: event.clientNom,
    produit: event.productLabel,
    cleChiffree,
    orderId: achat.orderId,
  })

  console.log(`Commande ${event.orderRef} livrée avec succès.`)
  return { statut: "DELIVERED" }
}
