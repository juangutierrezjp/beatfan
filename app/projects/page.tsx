import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import ProjectCard, { type Project } from "@/components/project-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, ListFilter, CheckCircle } from "lucide-react"
import { getAllArtTokens } from "@/lib/api"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Función para convertir ArtTokens a Projects (para compatibilidad con el componente existente)
function artTokenToProject(artToken: any, index: number): Project {
  return {
    id: artToken.id || `token-${index}`,
    artistName: "Artista", // Placeholder - en una app real esto vendría de tu BD
    title: artToken.name,
    thumbnailUrl: `/placeholder.svg?width=400&height=225&query=${encodeURIComponent(artToken.name)}`,
    shortDescription: `Proyecto tokenizado: ${artToken.symbol}`,
    fundingGoal: 1000, // Placeholder - en una app real esto vendría de tu BD
    currentFunding: Math.floor(Math.random() * 1000), // Simulado
    daysRemaining: Math.floor(Math.random() * 60) + 1, // Simulado
    pricePerToken: 0.1, // Placeholder
    genre: "Música", // Placeholder
  }
}

interface PageProps {
  searchParams: { success?: string; id?: string; error?: string }
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  let projects: Project[] = []
  let error: string | null = null

  try {
    // Obtener ArtTokens reales de la API
    const artTokens = await getAllArtTokens()
    console.log("Fetched ArtTokens:", artTokens)

    // Convertir ArtTokens a Projects para mostrar en la UI
    projects = artTokens.map((token, index) => artTokenToProject(token, index))
  } catch (err) {
    console.error("Error fetching projects:", err)
    error = "Error al cargar los proyectos. Intenta de nuevo más tarde."

    // Fallback a datos dummy si la API falla
    projects = [
      {
        id: "fallback-1",
        artistName: "Artista Demo",
        title: "Proyecto Demo",
        thumbnailUrl: "/placeholder.svg?width=400&height=225",
        shortDescription: "Este es un proyecto de demostración.",
        fundingGoal: 1000,
        currentFunding: 500,
        daysRemaining: 15,
        pricePerToken: 0.1,
        genre: "Demo",
      },
    ]
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2">
            Explora <span className="text-primary">Proyectos</span> Musicales
          </h1>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Descubre, apoya y sé parte del próximo gran éxito musical.
          </p>

          {/* Mensaje de éxito */}
          {searchParams.success === "project_created" && (
            <Alert className="mt-4 bg-green-500/10 border-green-500/20">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertTitle className="text-green-400">¡Proyecto creado exitosamente!</AlertTitle>
              {searchParams.id && (
                <AlertDescription className="text-green-300">ID del ArtToken: {searchParams.id}</AlertDescription>
              )}
            </Alert>
          )}

          {/* Mensaje de error */}
          {searchParams.error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {searchParams.error === "missing_fields"
                  ? "Por favor, completa todos los campos requeridos."
                  : "Error al crear el proyecto. Intenta de nuevo."}
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </header>

        <div className="mb-8 p-4 bg-card border border-border rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input type="search" placeholder="Buscar por artista, título, género..." className="pl-10 w-full" />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <ListFilter className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Filtrar por género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los Géneros</SelectItem>
                  <SelectItem value="latin-pop">Latin Pop</SelectItem>
                  <SelectItem value="electronic">Electronic</SelectItem>
                  <SelectItem value="hip-hop">Hip Hop</SelectItem>
                  <SelectItem value="folk">Folk</SelectItem>
                  <SelectItem value="future-bass">Future Bass</SelectItem>
                  <SelectItem value="acoustic">Acoustic</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <ListFilter className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="funding">En Financiación</SelectItem>
                  <SelectItem value="funded">Financiado</SelectItem>
                  <SelectItem value="demo-uploaded">Demo Subido</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto font-button">Buscar</Button>
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No hay proyectos disponibles</h2>
            <p className="text-muted-foreground">
              Vuelve más tarde o considera crear tu propio proyecto si eres artista.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
