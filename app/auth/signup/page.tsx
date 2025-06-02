import Link from "next/link"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Music } from "lucide-react"

export default function SignupPage() {
  const handleSignup = async (formData: FormData) => {
    "use server"
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const role = formData.get("role") as string // 'fan' or 'artist'

    console.log("Signup attempt:", { name, email, password, role })

    if (name && email && password && role) {
      console.log("Simulated successful signup for:", email, "as", role)
      // En una aplicación real, aquí crearías el usuario en la BD.

      // Establecer cookies para simular la sesión
      cookies().set("isLoggedIn", "true", { path: "/", maxAge: 60 * 60 * 24 * 7 }) // Cookie por 7 días
      cookies().set("userRole", role, { path: "/", maxAge: 60 * 60 * 24 * 7 })

      // Redirigir después del registro.
      // Podrías redirigir a un dashboard específico o a la página de proyectos.
      if (role === "artist") {
        redirect("/dashboard/artist") // Asumiendo que esta página existirá
      } else {
        redirect("/dashboard/fan") // Asumiendo que esta página existirá
      }
      // O simplemente a /projects si los dashboards no están listos
      // redirect("/projects")
    } else {
      console.log("Signup attempt failed: missing fields.")
      // Podrías redirigir de nuevo a la página de signup con un mensaje de error.
      // redirect("/auth/signup?error=MissingFields")
    }
  }

  return (
    <Card className="w-full max-w-md border-border shadow-xl">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <Link href="/" className="flex items-center space-x-2 text-primary">
            <Music className="h-8 w-8" />
            <span className="text-3xl font-bold font-display">BeatFAN</span>
          </Link>
        </div>
        <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
        <CardDescription>Únete a BeatFAN como Artista o Fan.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre Completo</Label>
            <Input id="name" name="name" placeholder="Tu Nombre" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="tu@email.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Soy un...</Label>
            <Select name="role" defaultValue="fan" required>
              <SelectTrigger id="role">
                <SelectValue placeholder="Selecciona tu rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fan">Fan</SelectItem>
                <SelectItem value="artist">Artista</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-button">
            Registrarse
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm">
        <p className="text-muted-foreground mx-auto">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/auth/login" className="font-medium text-primary hover:underline">
            Inicia Sesión
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
