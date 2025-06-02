import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Music, DollarSign, TrendingUp, Star, Eye, Play, Wallet } from "lucide-react"
import { getAllArtTokens } from "@/lib/api"

export default async function FanDashboardPage() {
  // Verificar autenticación y rol
  const isLoggedIn = cookies().get("isLoggedIn")?.value === "true"
  const userRole = cookies().get("userRole")?.value

  if (!isLoggedIn || userRole !== "fan") {
    redirect("/auth/login")
  }

  // Obtener proyectos disponibles
  let availableProjects: any[] = []
  try {
    const allTokens = await getAllArtTokens()
    availableProjects = allTokens.slice(0, 4) // Mostrar algunos proyectos
  } catch (error) {
    console.error("Error fetching projects:", error)
  }

  // Datos simulados para el dashboard del fan
  const fanStats = {
    projectsSupported: 3,
    totalInvested: 150,
    estimatedReturns: 18.5,
    favoriteGenre: "Electronic",
  }

  // Proyectos que el fan está apoyando (simulado)
  const supportedProjects = [
    {
      id: "1",
      name: "Eco del Silencio",
      artist: "Elena Nova",
      invested: 50,
      tokens: 500,
      currentValue: 55,
      progress: 75,
    },
    {
      id: "2",
      name: "Ciudad Neón",
      artist: "The Groove Syndicate",
      invested: 75,
      tokens: 750,
      currentValue: 82,
      progress: 60,
    },
    {
      id: "3",
      name: "Amanecer Acústico",
      artist: "Marco Rhythms",
      invested: 25,
      tokens: 250,
      currentValue: 28,
      progress: 90,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Panel de <span className="text-secondary">Fan</span>
            </h1>
            <p className="text-muted-foreground">Descubre, apoya y sigue a tus artistas favoritos.</p>
          </div>
          <Button asChild className="mt-4 md:mt-0 bg-secondary hover:bg-secondary/90 font-button">
            <Link href="/projects">
              <Heart className="mr-2 h-4 w-4" />
              Explorar Proyectos
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proyectos Apoyados</CardTitle>
              <Heart className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fanStats.projectsSupported}</div>
              <p className="text-xs text-muted-foreground">Artistas únicos</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invertido</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${fanStats.totalInvested}</div>
              <p className="text-xs text-muted-foreground">En ArtTokens</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Retornos Estimados</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{fanStats.estimatedReturns}%</div>
              <p className="text-xs text-muted-foreground">Valor actual vs invertido</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Género Favorito</CardTitle>
              <Star className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fanStats.favoriteGenre}</div>
              <p className="text-xs text-muted-foreground">Basado en tus inversiones</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mis Inversiones */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="mr-2 h-5 w-5 text-primary" />
                Mis Inversiones
              </CardTitle>
              <CardDescription>Proyectos que estás apoyando actualmente.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {supportedProjects.map((project) => (
                <div key={project.id} className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">{project.artist}</p>
                    </div>
                    <Badge variant="secondary">{project.tokens} tokens</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-muted-foreground">Invertido</p>
                      <p className="font-semibold">${project.invested}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Valor Actual</p>
                      <p
                        className={`font-semibold ${project.currentValue > project.invested ? "text-green-400" : "text-red-400"}`}
                      >
                        ${project.currentValue}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progreso del proyecto</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href={`/projects/${project.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Play className="h-4 w-4 mr-1" />
                      Escuchar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Proyectos Recomendados */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5 text-secondary" />
                Recomendados para Ti
              </CardTitle>
              <CardDescription>Nuevos proyectos que podrían interesarte.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableProjects.slice(0, 3).map((project, index) => (
                <div key={project.id || index} className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">Token: {project.symbol}</p>
                    </div>
                    <Badge variant="outline">Nuevo</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">Proyecto musical tokenizado en la blockchain.</p>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href={`/projects/${project.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalles
                      </Link>
                    </Button>
                    <Button size="sm" className="flex-1 bg-secondary hover:bg-secondary/90">
                      <Heart className="h-4 w-4 mr-1" />
                      Apoyar
                    </Button>
                  </div>
                </div>
              ))}

              <div className="text-center pt-4">
                <Button variant="outline" asChild className="font-button">
                  <Link href="/projects">Ver Todos los Proyectos</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-border mt-8">
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Descubre y apoya nuevos talentos musicales.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col font-button" asChild>
                <Link href="/projects">
                  <Music className="h-6 w-6 mb-2" />
                  Explorar Proyectos
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col font-button">
                <TrendingUp className="h-6 w-6 mb-2" />
                Ver Portfolio
              </Button>
              <Button variant="outline" className="h-20 flex-col font-button">
                <Star className="h-6 w-6 mb-2" />
                Mis Favoritos
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
