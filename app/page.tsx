import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import HeroSection from "@/components/hero-section"
import HowItWorksSection from "@/components/how-it-works-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Music, Users, BarChart3 } from "lucide-react"

// Placeholder for featured projects section
function FeaturedProjectsSection() {
  // Dummy data for projects
  const projects = [
    {
      id: 1,
      artist: "Elena Nova",
      title: "Eco del Silencio",
      progress: 75,
      image: "/placeholder.svg?width=400&height=300",
    },
    {
      id: 2,
      artist: "The Groove Syndicate",
      title: "Ciudad Neón",
      progress: 40,
      image: "/placeholder.svg?width=400&height=300",
    },
    {
      id: 3,
      artist: "Marco Rhythms",
      title: "Amanecer Acústico",
      progress: 90,
      image: "/placeholder.svg?width=400&height=300",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Proyectos <span className="text-primary">Destacados</span>
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Descubre y apoya a los artistas que están cambiando el juego.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-card rounded-lg shadow-xl overflow-hidden border border-border">
              <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-md text-primary mb-1">{project.artist}</p>
                <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                  <div className="bg-secondary h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{project.progress}% financiado</p>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 font-button">
                  <Link href={`/projects/${project.id}`}>Ver Proyecto</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-primary text-primary hover:bg-primary/10 font-button"
          >
            <Link href="/projects">Explorar Todos los Proyectos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

// Brief explanation section
function BriefExplanationSection() {
  const features = [
    {
      icon: Music,
      title: "Tokeniza tu Música",
      description:
        "Artistas, conviertan sus canciones en activos digitales y financien sus proyectos directamente con sus fans.",
      color: "text-primary",
    },
    {
      icon: Users,
      title: "Apoya a tus Artistas",
      description: "Fans, inviertan en la música que aman y compartan el éxito de sus artistas favoritos.",
      color: "text-secondary",
    },
    {
      icon: BarChart3,
      title: "Ingresos Compartidos",
      description:
        "Un modelo transparente donde los ingresos generados por la música se distribuyen entre los artistas y sus seguidores.",
      color: "text-primary",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            ¿Qué es <span className="text-primary">BeatFAN</span>?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            BeatFAN es la plataforma donde la música y la tecnología blockchain se encuentran. Empoderamos a los
            artistas para que se conecten con sus fans de una manera nueva y significativa, permitiendo a los fans
            invertir en la música que aman y compartir el éxito.
          </p>
          <p className="mt-3 text-lg text-muted-foreground max-w-3xl mx-auto">
            Si no se alcanza la meta de financiación de un proyecto,{" "}
            <span className="font-semibold text-slate-300">se devuelve el 100% del dinero</span> a los fans.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-slate-900 rounded-lg shadow-lg border border-border">
              <feature.icon className={`w-12 h-12 mx-auto mb-4 ${feature.color}`} />
              <h3 className={`text-2xl font-semibold mb-2 ${feature.color}`}>{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <BriefExplanationSection />
        <HowItWorksSection />
        <FeaturedProjectsSection />
      </main>
      <Footer />
    </div>
  )
}
