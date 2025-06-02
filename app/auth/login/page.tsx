import Link from "next/link"
import { redirect } from "next/navigation" // Import redirect
import { cookies } from "next/headers" // Import cookies
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Music } from "lucide-react"

export default function LoginPage() {
  const handleLogin = async (formData: FormData) => {
    "use server"
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    console.log("Login attempt:", { email, password })

    // MVP/Hackathon: Simular inicio de sesión exitoso si los campos no están vacíos
    if (email && password) {
      console.log("Simulated successful login for:", email)
      // En una aplicación real, aquí verificarías las credenciales
      // y establecerías una sesión (por ejemplo, con cookies o un token JWT).

      // Establecer una cookie para simular la sesión
      cookies().set("isLoggedIn", "true", { path: "/", maxAge: 60 * 60 * 24 * 7 }) // Cookie por 7 días
      // Opcional: podrías guardar el rol del usuario en una cookie también
      // cookies().set("userRole", "fan", { path: "/" }); // Ejemplo

      // Redirigir a una página después del inicio de sesión, por ejemplo, a los proyectos.
      // Podrías redirigir a un dashboard específico basado en el rol del usuario.
      redirect("/projects")
    } else {
      // Opcional: manejar el caso de campos vacíos, aunque `required` en los inputs debería prevenirlo.
      console.log("Login attempt failed: email or password empty.")
      // Podrías redirigir de nuevo a la página de login con un mensaje de error.
      // redirect("/auth/login?error=InvalidCredentials")
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
        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
        <CardDescription>Ingresa tu email y contraseña para acceder a tu cuenta.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="tu@email.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-button">
            Iniciar Sesión
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 text-sm">
        <Link href="#" className="text-xs text-muted-foreground hover:text-primary self-end">
          ¿Olvidaste tu contraseña?
        </Link>
        <p className="text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <Link href="/auth/signup" className="font-medium text-primary hover:underline">
            Regístrate
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
