# README_INTERNAL.md

## Vision Produit
CartZone est une marketplace automatisée de cartes cadeaux. Le flux opérationnel cible est un mode **back-to-back** : après paiement validé, la plateforme achète la clé au meilleur prix via G2A Business, la chiffre en AES-256, puis la délivre par email via Resend.

## Architecture Technique (interne)

### 1) `/api`
- **Rôle :** encapsuler les appels HTTP vers G2A Business.
- **Fichier principal :** `api/g2a-client.ts`.
- **Fonctions clés :**
  - `recupererOffreEligibileLowestPrice` : récupère le lowest price filtré sur vendeurs `rating > 98%`.
  - `acheterCarteSurG2A` : exécute l'achat automatique d'une offre.

### 2) `/billing`
- **Rôle :** calcul des prix, marges et promotions.
- **Fichier principal :** `billing/pricing.ts`.
- **Règles implémentées :**
  - marge dégressive en FCFA : `<10 000 XOF => 12%`, `10 000-49 999 XOF => 8%`, `>=50 000 XOF => 5%`.
  - promotion plafonnée par `margeTotale - bufferSecurite(3%)`.
  - prix final toujours supérieur ou égal à : `prixG2A + fraisPasserelle + 3% buffer`.
  - arrondi commercial automatique aux paliers `50` ou `100` FCFA.

### 3) `/delivery`
- **Rôle :** sécurité et livraison client.
- **Fichiers :**
  - `delivery/key-encryption.ts` : chiffrement AES-256-GCM des clés cadeaux.
  - `delivery/resend-service.ts` : envoi d'email transactionnel via Resend.

### 4) `/webhooks`
- **Rôle :** gestion du webhook de paiement Sayele Gate (ou équivalent).
- **Fichier principal :** `webhooks/payment-webhook.ts`.
- **Pipeline appliqué :**
  1. réception d'un event paiement validé,
  2. revérification LowestPrice sur G2A (vendeur >98%),
  3. HOLD si prix G2A > prix payé,
  4. achat automatique,
  5. chiffrement clé,
  6. envoi email Resend.

## Identité Visuelle
- La police **Nova Square** est chargée globalement dans `app/layout.tsx` et exposée en `font-sans` dans `app/globals.css`.

## Variables d'environnement
Créer un fichier `.env.local` avec :

```bash
# G2A
G2A_BASE_URL=https://api.g2a.com
G2A_BUSINESS_TOKEN=...

# Chiffrement AES-256 (32 octets, encodés en base64)
KEY_ENCRYPTION_SECRET=...

# Resend
RESEND_API_KEY=...
RESEND_FROM_EMAIL="CartZone <noreply@votre-domaine.com>"
```

### Générer une clé AES-256 valide
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Dépendances à installer

```bash
pnpm add resend dotenv
```

## Démarrage local

```bash
pnpm install
pnpm dev
```

## Notes de sécurité
- Ne jamais logger de clé cadeau en clair.
- Ne jamais commiter les secrets `.env*`.
- En production, préférer un KMS/HSM pour la clé AES maître.


## API Produits (catalogue local + G2A)
- Endpoint : `GET /api/products`
- Paramètres:
  - `source=local` (défaut), `source=g2a`, ou `source=hybrid`
  - `g2aLimit=24` (maximum 60)
  - `q`, `category`, `featured`, `new`
- `source=hybrid` fusionne les produits locaux et les produits récupérés depuis G2A pour enrichir le catalogue.
- Tous les montants exposés au front sont normalisés en **XOF**.
