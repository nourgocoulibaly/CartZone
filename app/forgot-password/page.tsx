"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Zap, Mail, ArrowLeft, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setSent(true)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {sent ? "Email envoye" : "Mot de passe oublie"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {sent
              ? "Verifiez votre boite de reception"
              : "Entrez votre email pour reinitialiser votre mot de passe"}
          </p>
        </div>

        {sent ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6">
              <CheckCircle2 className="mb-3 h-10 w-10 text-accent" />
              <p className="text-center text-sm text-muted-foreground">
                Un email de reinitialisation a ete envoye a{" "}
                <span className="font-medium text-foreground">{email}</span>.
                Suivez les instructions pour creer un nouveau mot de passe.
              </p>
            </div>
            <Link
              href="/login"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Retour a la connexion
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-6">
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
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Envoi...
                </>
              ) : (
                "Envoyer le lien"
              )}
            </button>

            <Link
              href="/login"
              className="flex w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour a la connexion
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}
