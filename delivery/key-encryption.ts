import "dotenv/config"
import { createCipheriv, randomBytes } from "node:crypto"

const ALGO = "aes-256-gcm"
const IV_LENGTH = 12

function recupererCleSecrete(): Buffer {
  const secret = process.env.KEY_ENCRYPTION_SECRET

  if (!secret) {
    throw new Error("KEY_ENCRYPTION_SECRET manquant. Impossible de chiffrer la clé cadeau.")
  }

  const buffer = Buffer.from(secret, "base64")

  if (buffer.length !== 32) {
    throw new Error("KEY_ENCRYPTION_SECRET doit faire 32 octets encodés en base64 (AES-256).")
  }

  return buffer
}

/**
 * Chiffre une clé cadeau en AES-256-GCM.
 */
export function chiffrerCleCadeau(cleBrute: string): string {
  const key = recupererCleSecrete()
  const iv = randomBytes(IV_LENGTH)
  const cipher = createCipheriv(ALGO, key, iv)

  const encrypted = Buffer.concat([cipher.update(cleBrute, "utf8"), cipher.final()])
  const authTag = cipher.getAuthTag()

  return [iv.toString("base64"), authTag.toString("base64"), encrypted.toString("base64")].join(".")
}
