import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, MessageCircle, Music2 } from "lucide-react" // Placeholder for TikTok

export default function HeroSection() {
  return (
    <section className="relative w-full h-[calc(100vh-3.5rem)] min-h-[600px] flex items-center justify-center text-white overflow-hidden">
      <Image
        src="/images/hero-bg.png"
        alt="Concert background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-30"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-background z-10"></div>
      <div className="container relative z-20 mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight uppercase">Apoya el Arte</h1>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase mb-6">
          Comparte el <span className="text-primary">Éxito</span>.
        </h2>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-4">
          <span className="text-secondary font-semibold">Tokenizamos</span> canciones, álbumes y discos.
        </p>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
          Colabora con artistas y comparte <span className="text-secondary font-semibold">ingresos reales</span>.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-button"
          >
            <Link href="/projects">Explorar Proyectos</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg font-button"
          >
            <Link href="/auth/signup?role=artist">Soy Artista</Link>
          </Button>
        </div>
        <div className="flex justify-center items-center space-x-6">
          <Link href="#" className="text-slate-400 hover:text-white">
            <Instagram size={28} />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="text-slate-400 hover:text-white">
            <Music2 size={28} /> {/* Placeholder for TikTok */}
            <span className="sr-only">TikTok</span>
          </Link>
          <Button
            variant="outline"
            className="rounded-full h-14 w-14 p-0 border-secondary text-secondary hover:bg-secondary/10 font-button"
          >
            <MessageCircle size={28} />
            <span className="sr-only">Chat</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
