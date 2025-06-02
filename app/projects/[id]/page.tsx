import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Users,
  DollarSign,
  CalendarClock,
  Target,
  Info,
  Music2,
  Share2,
  Edit3,
  PlusCircle,
  CheckCircle,
  ListChecks,
  MessageSquare,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react"
import { cookies } from "next/headers"
import { getArtTokenById } from "@/lib/api"
import type { Project } from "@/components/project-card"

// Mock user types for conditional rendering
type UserRole = "public" | "fan" | "artist_owner" | "artist_other"

// Función para crear datos dummy de proyecto
function createDummyProject(id: string): Project & {
  fullDescription: string
  artistBio: string
  demoUrl?: string
  totalTokens: number
  tokensForSale: number
  milestones: { title: string; status: "pending" | "completed"; description: string }[]
  updates: { date: string; title: string; content: string }[]
  supportersCount: number
  artTokenInfo?: any
} {
  return {
    id: id,
    artistName: "Artista Demo",
    title: "Proyecto Demo",
    thumbnailUrl: `/placeholder.svg?width=800&height=450&query=Proyecto Demo`,
    shortDescription: "Este es un proyecto de demostración.",
    fundingGoal: 1000,
    currentFunding: 500,
    daysRemaining: 15,
    pricePerToken: 0.1,
    genre: "Demo",
    fullDescription:
      "Este es un proyecto de demostración para mostrar la funcionalidad de la plataforma. En una aplicación real, esta información vendría de tu base de datos junto con el ArtToken correspondiente.",
    artistBio: "Artista de demostración para mostrar cómo funciona la plataforma.",
    demoUrl: "https://www.example.com/demo.mp3",
    totalTokens: 10000,
    tokensForSale: 5000,
    supportersCount: 50,
    milestones: [
      {
        title: "Proyecto Creado",
        status: "completed",
        description: "El proyecto ha sido creado en la plataforma.",
      },
      {
        title: "Demo Grabado",
        status: "pending",
        description: "Las maquetas iniciales de todas las canciones están listas.",
      },
      {
        title: "Producción en Estudio",
        status: "pending",
        description: "Grabación profesional de instrumentos y voces.",
      },
    ],
    updates: [
      {
        date: new Date().toISOString().split("T")[0],
        title: "Proyecto Creado",
        content: "¡Hemos creado este proyecto de demostración! Gracias por explorar BeatFAN.",
      },
    ],
  }
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  // Verificar que el ID no sea "create" (esto no debería pasar ahora, pero por seguridad)
  if (params.id === "create") {
    notFound()
  }

  const isLoggedIn = cookies().get("isLoggedIn")?.value === "true"
  const userRole = cookies().get("userRole")?.value

  let currentUserRole: UserRole = "public"
  if (isLoggedIn) {
    if (userRole === "artist") {
      currentUserRole = "artist_owner" // Simplificado - en una app real verificarías si es el dueño
    } else {
      currentUserRole = "fan"
    }
  }

  let project: Project & {
    fullDescription: string
    artistBio: string
    demoUrl?: string
    totalTokens: number
    tokensForSale: number
    milestones: { title: string; status: "pending" | "completed"; description: string }[]
    updates: { date: string; title: string; content: string }[]
    supportersCount: number
    artTokenInfo?: any
  }

  let error: string | null = null
  let isRealArtToken = false

  try {
    // Intentar obtener información del ArtToken real
    console.log(`Attempting to fetch ArtToken with ID: ${params.id}`)
    const artToken = await getArtTokenById(params.id)
    console.log("Successfully fetched ArtToken:", artToken)
    isRealArtToken = true

    // Crear un proyecto basado en el ArtToken real
    project = {
      id: params.id,
      artistName: "Artista", // En una app real, esto vendría de tu BD
      title: artToken.name,
      thumbnailUrl: `/placeholder.svg?width=800&height=450&query=${encodeURIComponent(artToken.name)}`,
      shortDescription: `Proyecto tokenizado: ${artToken.symbol}`,
      fundingGoal: 1000, // En una app real, esto vendría de tu BD
      currentFunding: Math.floor(Math.random() * 1000), // Simulado
      daysRemaining: Math.floor(Math.random() * 60) + 1, // Simulado
      pricePerToken: 0.1, // En una app real, esto vendría de tu BD
      genre: "Música",
      fullDescription: `Este es el proyecto "${artToken.name}" (${artToken.symbol}). Los fondos recaudados se utilizarán para la producción profesional, masterización y campaña de marketing. Cada ArtToken representa una fracción simbólica de este proyecto musical.

Información técnica del token:
- Nombre: ${artToken.name}
- Símbolo: ${artToken.symbol}
- Wallet del Artista: ${artToken.artistWallet}
- Wallet de la Plataforma: ${artToken.platformWallet}

Este token ha sido desplegado exitosamente en la blockchain y está listo para la colaboración de los fans.`,
      artistBio:
        "Artista independiente comprometido con crear música de calidad y conectar con su audiencia a través de la tokenización.",
      demoUrl: "https://www.example.com/demo.mp3", // Placeholder
      totalTokens: 10000, // En una app real, esto vendría de tu BD
      tokensForSale: 5000, // En una app real, esto vendría de tu BD
      supportersCount: Math.floor(Math.random() * 200) + 10, // Simulado
      milestones: [
        {
          title: "ArtToken Creado",
          status: "completed",
          description: "El token ha sido desplegado exitosamente en la blockchain.",
        },
        {
          title: "Demo Grabado",
          status: "pending",
          description: "Las maquetas iniciales de todas las canciones están listas.",
        },
        {
          title: "Producción en Estudio",
          status: "pending",
          description: "Grabación profesional de instrumentos y voces.",
        },
        {
          title: "Lanzamiento Digital",
          status: "pending",
          description: "El álbum estará disponible en todas las plataformas.",
        },
      ],
      updates: [
        {
          date: new Date().toISOString().split("T")[0],
          title: "¡ArtToken Creado!",
          content: `El token ${artToken.symbol} ha sido creado exitosamente en la blockchain. ¡Gracias por el apoyo!`,
        },
      ],
      artTokenInfo: artToken,
    }
  } catch (err) {
    console.error("Error fetching ArtToken:", err)

    // Si el ID parece ser un UUID válido pero no se encuentra, mostrar 404
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (uuidRegex.test(params.id)) {
      // Es un UUID válido pero no se encontró el ArtToken
      notFound()
    }

    // Para IDs simples como "1", "2", etc., mostrar proyecto dummy con advertencia
    error = "Este es un proyecto de demostración. Los ArtTokens reales tienen IDs únicos."
    project = createDummyProject(params.id)
  }

  const fundingPercentage = (project.currentFunding / project.fundingGoal) * 100

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-md flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-yellow-200 font-medium">Proyecto de Demostración</p>
              <p className="text-xs text-yellow-300 mt-1">{error}</p>
              <p className="text-xs text-yellow-300 mt-1">
                Para ver ArtTokens reales, visita la{" "}
                <Link href="/projects" className="underline hover:text-yellow-100">
                  página de proyectos
                </Link>{" "}
                donde se muestran los tokens creados a través de la API.
              </p>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="relative mb-8">
          <Image
            src={project.thumbnailUrl || "/placeholder.svg"}
            alt={`Banner for ${project.title}`}
            width={1200}
            height={400}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-lg"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-1">{project.title}</h1>
            <p className="text-xl md:text-2xl text-slate-300">por {project.artistName}</p>
            {project.artTokenInfo && (
              <div className="mt-2 space-y-1">
                <p className="text-sm text-slate-400">Token: {project.artTokenInfo.symbol}</p>
                <p className="text-xs text-slate-500">
                  Wallet: {project.artTokenInfo.artistWallet?.substring(0, 10)}...
                </p>
              </div>
            )}
            {isRealArtToken && (
              <div className="mt-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-300 border border-green-500/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  ArtToken Real
                </span>
              </div>
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 border-slate-400 text-white font-button"
          >
            <Share2 size={20} />
            <span className="sr-only">Compartir</span>
          </Button>
          {currentUserRole === "artist_owner" && (
            <Button variant="secondary" className="absolute bottom-6 right-6 font-button">
              <Edit3 size={18} className="mr-2" /> Editar Proyecto
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Demo Player (Placeholder) */}
            {project.demoUrl && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Music2 size={24} className="mr-2 text-primary" /> Escucha un Avance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md text-center">
                    <p className="text-sm text-muted-foreground mb-2">Reproductor de audio incrustado aquí.</p>
                    <audio controls src={project.demoUrl} className="w-full">
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ArtToken Info */}
            {project.artTokenInfo && (
              <Card className="border-border bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <Info size={24} className="mr-2" /> Información del ArtToken
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Nombre:</span> {project.artTokenInfo.name}
                    </div>
                    <div>
                      <span className="font-semibold">Símbolo:</span> {project.artTokenInfo.symbol}
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-semibold">Wallet del Artista:</span>{" "}
                      <code className="text-xs bg-muted px-1 py-0.5 rounded break-all">
                        {project.artTokenInfo.artistWallet}
                      </code>
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-semibold">Wallet de la Plataforma:</span>{" "}
                      <code className="text-xs bg-muted px-1 py-0.5 rounded break-all">
                        {project.artTokenInfo.platformWallet}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tabs for Description, Milestones, Updates */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted">
                <TabsTrigger value="description">Descripción</TabsTrigger>
                <TabsTrigger value="milestones">Hitos</TabsTrigger>
                <TabsTrigger value="updates">Actualizaciones</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4 p-6 bg-card rounded-lg border border-border">
                <h3 className="text-2xl font-semibold mb-3 text-primary">Sobre el Proyecto</h3>
                <p className="text-slate-300 whitespace-pre-line leading-relaxed">{project.fullDescription}</p>
                <h3 className="text-2xl font-semibold mt-6 mb-3 text-primary">Sobre el Artista</h3>
                <p className="text-slate-300 whitespace-pre-line leading-relaxed">{project.artistBio}</p>
              </TabsContent>
              <TabsContent value="milestones" className="mt-4 p-6 bg-card rounded-lg border border-border">
                <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center">
                  <ListChecks size={24} className="mr-2" /> Hoja de Ruta del Proyecto
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {project.milestones.map((milestone, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger
                        className={`text-lg hover:no-underline ${milestone.status === "completed" ? "text-green-400" : "text-slate-300"}`}
                      >
                        <div className="flex items-center">
                          {milestone.status === "completed" ? (
                            <CheckCircle size={20} className="mr-2 text-green-400" />
                          ) : (
                            <CalendarClock size={20} className="mr-2 text-primary" />
                          )}
                          {milestone.title}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-400 pl-8">
                        {milestone.description}
                        {currentUserRole === "artist_owner" && milestone.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-2 border-secondary text-secondary hover:bg-secondary/10 font-button"
                          >
                            Marcar como Completado
                          </Button>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              <TabsContent value="updates" className="mt-4 p-6 bg-card rounded-lg border border-border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold text-primary flex items-center">
                    <MessageSquare size={24} className="mr-2" /> Actualizaciones del Artista
                  </h3>
                  {currentUserRole === "artist_owner" && (
                    <Button variant="secondary" className="font-button">
                      <PlusCircle size={18} className="mr-2" /> Publicar Actualización
                    </Button>
                  )}
                </div>
                <div className="space-y-6">
                  {project.updates.length > 0 ? (
                    project.updates.map((update, index) => (
                      <div key={index} className="p-4 bg-muted rounded-md border border-border/50">
                        <p className="text-xs text-slate-500 mb-1">{new Date(update.date).toLocaleDateString()}</p>
                        <h4 className="text-lg font-semibold text-slate-200 mb-1">{update.title}</h4>
                        <p className="text-sm text-slate-400">{update.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">Aún no hay actualizaciones para este proyecto.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center">
                  <Target size={24} className="mr-2" /> Meta de Financiación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Progress value={fundingPercentage} className="h-3 [&>div]:bg-secondary" />
                <div className="text-3xl font-bold text-slate-100">
                  ${project.currentFunding.toLocaleString()}{" "}
                  <span className="text-base font-normal text-muted-foreground">
                    de ${project.fundingGoal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users size={16} className="mr-1 text-secondary" /> {project.supportersCount} Patrocinadores
                  </div>
                  <div className="flex items-center">
                    <CalendarClock size={16} className="mr-1 text-secondary" /> {project.daysRemaining} días restantes
                  </div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <DollarSign size={16} className="mr-1 text-secondary" /> ${project.pricePerToken} por ArtToken
                  </div>
                  <div className="flex items-center">
                    <Info size={16} className="mr-1 text-secondary" /> {project.tokensForSale.toLocaleString()} /{" "}
                    {project.totalTokens.toLocaleString()} Tokens
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conditional CTA / Purchase Section */}
            {currentUserRole === "public" && (
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 font-button" asChild>
                    <Link href="/auth/login?redirect=/projects/1">Regístrate/Inicia Sesión para Apoyar</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentUserRole === "fan" && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl text-secondary">Apoya este Proyecto</CardTitle>
                  <CardDescription>Compra ArtTokens y sé parte del éxito.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="token-amount" className="text-xs text-muted-foreground">
                      Cantidad de ArtTokens a Comprar
                    </Label>
                    <Input id="token-amount" type="number" placeholder="Ej: 10" className="mt-1" defaultValue="1" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Costo Total Estimado:{" "}
                      <span className="font-semibold text-slate-200">
                        ${project.pricePerToken * 1 /* Default value */}
                      </span>
                    </p>
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-button"
                    disabled={!isRealArtToken}
                  >
                    {isRealArtToken ? "Comprar ArtTokens" : "Demo - No Disponible"}
                  </Button>
                  {!isRealArtToken && (
                    <p className="text-xs text-muted-foreground text-center">
                      La compra solo está disponible para ArtTokens reales.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            <Card className="border-border bg-muted">
              <CardHeader>
                <CardTitle className="text-lg text-slate-300 flex items-center">
                  <ShieldCheck size={20} className="mr-2 text-primary" /> Política de Devolución
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400">
                  Si no se alcanza la meta de ${project.fundingGoal.toLocaleString()} antes del{" "}
                  {new Date(Date.now() + project.daysRemaining * 24 * 60 * 60 * 1000).toLocaleDateString()}, se
                  devolverá el 100% del dinero a todos los patrocinadores.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
