import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CreateProjectForm from "@/components/create-project-form"

export default async function CreateProjectPage() {
  // Verificar que el usuario esté logueado y sea artista
  const isLoggedIn = cookies().get("isLoggedIn")?.value === "true"
  const userRole = cookies().get("userRole")?.value

  if (!isLoggedIn || userRole !== "artist") {
    redirect("/auth/login")
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-border shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                Crear Nuevo <span className="text-primary">Proyecto</span>
              </CardTitle>
              <CardDescription className="text-center">
                Tokeniza tu música y conecta con tus fans para financiar tu proyecto.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateProjectForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
