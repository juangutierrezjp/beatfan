import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Plus, Music, DollarSign, Users, TrendingUp, Eye, Edit3, BarChart3 } from "lucide-react"
import { getAllArtTokens } from "@/lib/api"

export default async function ArtistDashboardPage() {
  // Verificar autenticación y rol
  const isLoggedIn = cookies().get("isLoggedIn")?.value === "true"
  const userRole = cookies().get("userRole")?.value

  if (!isLoggedIn || userRole !== "artist") {
    redirect("/auth/login")
  }

  // Obtener proyectos del artista (simulado - en una app real filtrarías por artista)
  let artistProjects: any[] = []
  try {
    const allTokens = await getAllArtTokens()
    // En una app real, filtrarías por el ID del artista
    artistProjects = allTokens.slice(0, 3) // Mostrar solo los primeros 3 como ejemplo
  } catch (error) {
    console.error("Error fetching artist projects:", error)
  }

  // Datos simulados para el dashboard
  const dashboardStats = {
    totalProjects: artistProjects.length,
    totalFunding: 2500,
    totalSupporters: 45,
    monthlyGrowth: 12.5,
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Panel de <span className="text-primary">Artista</span>
            </h1>
            <p className="text-muted-foreground">Gestiona tus proyectos musicales y conecta con tus fans.</p>
          </div>
          <Button asChild className="mt-4 md:mt-0 bg-primary hover:bg-primary/90 font-button">
            <Link href="/projects/create">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Proyecto
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proyectos Activos</CardTitle>
              <Music className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">+1 desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fondos Recaudados</CardTitle>
              <DollarSign className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardStats.totalFunding}</div>
              <p className="text-xs text-muted-foreground">+{dashboardStats.monthlyGrowth}% este mes</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Supporters</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalSupporters}</div>
              <p className="text-xs text-muted-foreground">+8 nuevos esta semana</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crecimiento</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{dashboardStats.monthlyGrowth}%</div>
              <p className="text-xs text-muted-foreground">Comparado al mes anterior</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mis Proyectos */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Music className="mr-2 h-5 w-5 text-primary" />
                Mis Proyectos
              </CardTitle>
              <CardDescription>Gestiona y monitorea tus proyectos musicales.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {artistProjects.length > 0 ? (
                artistProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">Token: {project.symbol}</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Progreso</span>
                          <span>{Math.floor(Math.random() * 100)}%</span>
                        </div>
                        <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/projects/${project.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Music className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No tienes proyectos aún</h3>
                  <p className="text-muted-foreground mb-4">
                    Crea tu primer proyecto musical y comienza a conectar con tus fans.
                  </p>
                  <Button asChild className="bg-primary hover:bg-primary/90 font-button">
                    <Link href="/projects/create">
                      <Plus className="mr-2 h-4 w-4" />
                      Crear Primer Proyecto
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actividad Reciente */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-secondary" />
                Actividad Reciente
              </CardTitle>
              <CardDescription>Últimas interacciones con tus proyectos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Nuevo supporter en "MiCancion"</p>
                    <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Proyecto alcanzó 50% de financiación</p>
                    <p className="text-xs text-muted-foreground">Hace 1 día</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Nuevo comentario en tu proyecto</p>
                    <p className="text-xs text-muted-foreground">Hace 2 días</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-border mt-8">
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Herramientas para gestionar tu carrera musical.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col font-button" asChild>
                <Link href="/projects/create">
                  <Plus className="h-6 w-6 mb-2" />
                  Crear Proyecto
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col font-button">
                <BarChart3 className="h-6 w-6 mb-2" />
                Ver Analíticas
              </Button>
              <Button variant="outline" className="h-20 flex-col font-button">
                <Users className="h-6 w-6 mb-2" />
                Gestionar Fans
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
