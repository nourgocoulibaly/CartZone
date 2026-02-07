"use client"

import React from "react"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Save, CheckCircle2 } from "lucide-react"

export default function ProfilePage() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    firstName: "Ahmed",
    lastName: "Benali",
    email: "ahmed@email.com",
    phone: "+212 612 345 678",
    address: "Casablanca, Maroc",
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Mon profil</h1>
      <p className="mt-1 text-muted-foreground">
        Modifiez vos informations personnelles
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Avatar */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Photo de profil
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {form.firstName} {form.lastName}
              </p>
              <p className="text-xs text-muted-foreground">Membre depuis janvier 2026</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Informations personnelles
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Prenom
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-secondary/50 py-2.5 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Nom
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-border bg-secondary/50 py-2.5 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Telephone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-border bg-secondary/50 py-2.5 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Adresse
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="address"
                  type="text"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="w-full rounded-lg border border-border bg-secondary/50 py-2.5 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Securite
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Mot de passe actuel
              </label>
              <input
                id="currentPassword"
                type="password"
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Entrez votre mot de passe actuel"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="newPassword"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Nouveau mot de passe
                </label>
                <input
                  id="newPassword"
                  type="password"
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Min. 6 caracteres"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmNewPassword"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Confirmer
                </label>
                <input
                  id="confirmNewPassword"
                  type="password"
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Confirmez le mot de passe"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
            saved
              ? "bg-accent text-accent-foreground"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          {saved ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Modifications enregistrees
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Enregistrer les modifications
            </>
          )}
        </button>
      </form>
    </div>
  )
}
