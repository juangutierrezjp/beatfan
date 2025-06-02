import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UploadCloud, Users, BarChart, Gift, TrendingUp } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "El artista crea y sube su canción",
    description: "Los artistas comparten su música y visión con la comunidad.",
    icon: UploadCloud,
    color: "text-secondary", // Pink
    bgColor: "bg-secondary/10",
  },
  {
    id: 2,
    title: "Se tokeniza una parte de sus derechos",
    description: "Convertimos los derechos musicales en ArtTokens digitales, listos para los fans.",
    icon: Gift,
    color: "text-primary", // Purple
    bgColor: "bg-primary/10",
  },
  {
    id: 3,
    title: "Los fans compran fracciones (ArtTokens)",
    description: "Los seguidores apoyan directamente a sus artistas favoritos adquiriendo ArtTokens.",
    icon: Users,
    color: "text-secondary", // Pink
    bgColor: "bg-secondary/10",
  },
  {
    id: 4,
    title: "El artista invierte ayudado por BeatFAN",
    description: "Los fondos recaudados impulsan la producción, marketing y carrera del artista.",
    icon: TrendingUp,
    color: "text-primary", // Purple
    bgColor: "bg-primary/10",
  },
  {
    id: 5,
    title: "Se reparten los ingresos de la canción",
    description: "Los poseedores de ArtTokens participan en los ingresos generados por la música.",
    icon: BarChart,
    color: "text-secondary", // Pink
    bgColor: "bg-secondary/10",
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Cómo <span className="text-primary">Funciona</span> BeatFAN
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Una plataforma transparente y revolucionaria para artistas y fans. Conectamos talento con apoyo, creando un
          nuevo ecosistema musical.
        </p>
        <div className="relative">
          {/* Optional: decorative line connecting steps, for simplicity not included now */}
          <div className="grid md:grid-cols-1 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col md:flex-row items-start gap-6 p-6 rounded-lg shadow-lg ${step.bgColor} border border-border`}
              >
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-full ${step.bgColor} border-2 ${step.color.replace("text-", "border-")} flex items-center justify-center mb-4 md:mb-0`}
                >
                  <step.icon className={`${step.color} w-8 h-8`} />
                </div>
                <div className="flex-grow">
                  <h3 className={`text-2xl font-semibold mb-2 ${step.color}`}>
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-button">
            <Link href="/auth/signup">Únete a BeatFAN Hoy</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
