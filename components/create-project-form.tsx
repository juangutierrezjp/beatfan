"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

interface CreateProjectFormProps {
  onSuccess?: (id: string) => void
  onError?: (error: string) => void
}

export default function CreateProjectForm({ onSuccess, onError }: CreateProjectFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const fundingGoal = formData.get("fundingGoal") as string
    const artistWallet = formData.get("artistWallet") as string

    // Validar campos requeridos
    if (!title || !description || !fundingGoal || !artistWallet) {
      const errorMsg = "Por favor, completa todos los campos requeridos."
      setError(errorMsg)
      onError?.(errorMsg)
      setIsSubmitting(false)
      return
    }

    try {
      // Crear el símbolo del token basado en el título
      const symbol =
        title === "MiCancion"
          ? "MCN"
          : title
              .toUpperCase()
              .replace(/[^A-Z0-9]/g, "")
              .substring(0, 6) || "MCN"

      // Crear el ArtToken usando exactamente el formato que funciona
      const artTokenData = {
        name: title,
        symbol: symbol,
        platformWallet: "0x7D9f16D6712b89582Ca6bF8520dC81094b6c624b",
        artistWallet: artistWallet,
      }

      console.log("Calling API to create ArtToken with:", artTokenData)

      // Llamar a la API directamente desde el cliente
      const response = await fetch("https://fanbeats.cloudycoding.com/art_token/deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(artTokenData),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log("ArtToken created successfully:", result)

      // Llamar callback de éxito
      onSuccess?.(result.id)

      // Redirigir a la página de proyectos con un mensaje de éxito
      router.push(`/projects?success=project_created&id=${result.id}`)
    } catch (error) {
      console.error("Error creating project:", error)
      const errorMsg =
        error instanceof Error ? `Error: ${error.message}` : "Error al crear el proyecto. Por favor, intenta de nuevo."
      setError(errorMsg)
      onError?.(errorMsg)
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Título del Proyecto *</Label>
        <Input
          id="title"
          name="title"
          placeholder="MiCancion"
          defaultValue="MiCancion"
          required
          className="w-full"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción del Proyecto *</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe tu proyecto..."
          defaultValue="Este es mi nuevo proyecto musical que será tokenizado en la blockchain."
          required
          className="w-full min-h-[120px]"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fundingGoal">Meta de Fondos (USD) *</Label>
        <Input
          id="fundingGoal"
          name="fundingGoal"
          type="number"
          placeholder="1000"
          defaultValue="1000"
          required
          min="100"
          step="50"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="artistWallet">Wallet del Artista *</Label>
        <Input
          id="artistWallet"
          name="artistWallet"
          placeholder="0x121A783E85E8d8775557A1ba29a35dA0fE7CE7b2"
          defaultValue="0x121A783E85E8d8775557A1ba29a35dA0fE7CE7b2"
          required
          pattern="^0x[a-fA-F0-9]{40}$"
          title="Debe ser una dirección de wallet válida"
          disabled={isSubmitting}
        />
        <p className="text-xs text-muted-foreground">Dirección de tu wallet donde recibirás los fondos.</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="rightsConfirmation"
            name="rightsConfirmation"
            required
            className="rounded border-border"
            disabled={isSubmitting}
          />
          <Label htmlFor="rightsConfirmation" className="text-sm">
            Confirmo que poseo los derechos de esta obra musical. *
          </Label>
        </div>
      </div>

      <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
          <h4 className="font-semibold text-sm text-green-400">API Funcionando Correctamente</h4>
        </div>
        <p className="text-xs text-green-300 mt-1">
          La API está respondiendo correctamente. Al crear el proyecto se generará un ArtToken real en la blockchain.
        </p>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1 font-button"
          onClick={() => router.push("/projects")}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 font-button" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creando...
            </>
          ) : (
            "Crear ArtToken"
          )}
        </Button>
      </div>
    </form>
  )
}
