import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Music, LogOut, LayoutDashboard, Plus } from "lucide-react"

export default async function Navbar() {
  const isLoggedIn = cookies().get("isLoggedIn")?.value === "true"
  const userRole = cookies().get("userRole")?.value

  const handleLogout = async () => {
    "use server"
    cookies().delete("isLoggedIn")
    cookies().delete("userRole")
    redirect("/")
  }

  let dashboardLink = "/projects" // Default link
  if (isLoggedIn) {
    if (userRole === "artist") {
      dashboardLink = "/dashboard/artist"
    } else if (userRole === "fan") {
      dashboardLink = "/dashboard/fan"
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Music className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl font-display">BeatFAN</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4 lg:space-x-6">
          <Link
            href="/projects"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Explorar Proyectos
          </Link>
          {!isLoggedIn && (
            <Link
              href="/auth/signup?role=artist"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              ¿Eres Artista?
            </Link>
          )}
          {isLoggedIn && userRole === "artist" && (
            <Link
              href="/projects/create"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Crear Proyecto
            </Link>
          )}
        </nav>
        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <>
              {userRole === "artist" && (
                <Button variant="ghost" asChild className="font-button">
                  <Link href="/projects/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Proyecto
                  </Link>
                </Button>
              )}
              <Button variant="ghost" asChild className="font-button">
                <Link href={dashboardLink}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Mi Panel
                </Link>
              </Button>
              <form action={handleLogout}>
                <Button variant="outline" type="submit" className="font-button">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="font-button">
                <Link href="/auth/login">Inicia Sesión</Link>
              </Button>
              <Button asChild className="font-button">
                <Link href="/auth/signup">Regístrate</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
