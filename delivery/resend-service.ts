import "dotenv/config"
import { Resend } from "resend"

type EnvoiClePayload = {
  email: string
  nomClient: string
  produit: string
  cleChiffree: string
  orderId: string
}

let resendClient: Resend | null = null

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    throw new Error("RESEND_API_KEY est requise pour l'envoi des emails.")
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey)
  }

  return resendClient
}

/**
 * Envoie au client la clé chiffrée avec les informations de commande.
 */
export async function envoyerCleParEmail(payload: EnvoiClePayload): Promise<void> {
  const resend = getResendClient()
  const sender = process.env.RESEND_FROM_EMAIL ?? "CartZone <no-reply@cartzone.local>"

  const { error } = await resend.emails.send({
    from: sender,
    to: payload.email,
    subject: `Votre carte cadeau ${payload.produit} est disponible`,
    html: `
      <h1>Bonjour ${payload.nomClient},</h1>
      <p>Votre commande <strong>${payload.orderId}</strong> a été traitée automatiquement.</p>
      <p>Voici votre clé chiffrée (AES-256) :</p>
      <pre>${payload.cleChiffree}</pre>
      <p>Merci pour votre confiance.</p>
      <p>L'équipe CartZone</p>
    `,
  })

  if (error) {
    throw new Error(`Échec d'envoi Resend: ${error.message}`)
  }

  console.log("Email envoyé avec succès via Resend.")
}
