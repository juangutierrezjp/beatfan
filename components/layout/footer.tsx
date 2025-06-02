import Link from "next/link"
import { Instagram, MessageCircle, Youtube, Music2 } from "lucide-react" // Assuming TikTok icon might be Music2 or similar

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 bg-background">
      <div className="container max-w-screen-2xl text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold">
            Descubre más de <span className="text-secondary">Nosotros</span>
          </h3>
          <p className="text-muted-foreground mt-2">Conéctate con la comunidad BeatFAN y sigue nuestras redes.</p>
        </div>
        <div className="flex justify-center space-x-6 mb-6">
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Instagram size={24} />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Music2 size={24} /> {/* Placeholder for TikTok */}
            <span className="sr-only">TikTok</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Youtube size={24} />
            <span className="sr-only">YouTube</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <MessageCircle size={24} />
            <span className="sr-only">Comunidad</span>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} BeatFAN. Todos los derechos reservados.
        </p>
        <div className="mt-2 space-x-4">
          <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary">
            Términos de Servicio
          </Link>
          <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary">
            Política de Privacidad
          </Link>
        </div>
      </div>
    </footer>
  )
}
