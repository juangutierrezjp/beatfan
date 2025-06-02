import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tag, Clock, DollarSign } from "lucide-react"

export interface Project {
  id: string
  artistName: string
  title: string
  thumbnailUrl: string
  shortDescription: string
  fundingGoal: number
  currentFunding: number
  daysRemaining: number
  pricePerToken: number
  genre?: string // Optional genre
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const fundingPercentage = (project.currentFunding / project.fundingGoal) * 100

  return (
    <Card className="flex flex-col overflow-hidden border-border shadow-lg hover:shadow-primary/20 transition-shadow duration-300 h-full">
      <CardHeader className="p-0 relative">
        <Image
          src={
            project.thumbnailUrl || `/placeholder.svg?width=400&height=225&query=${encodeURIComponent(project.title)}`
          }
          alt={`Cover art for ${project.title}`}
          width={400}
          height={225}
          className="w-full h-48 object-cover"
        />
        {project.genre && (
          <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs flex items-center">
            <Tag size={12} className="mr-1" /> {project.genre}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-semibold mb-1 text-primary group-hover:text-primary-dark">
          {project.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground mb-2">{project.artistName}</p>
        <p className="text-xs text-slate-400 mb-3 h-10 overflow-hidden">{project.shortDescription}</p>

        <div className="mb-3">
          <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
            <span>{`$${project.currentFunding.toLocaleString()} / $${project.fundingGoal.toLocaleString()}`}</span>
            <span>{fundingPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={fundingPercentage} className="h-2 [&>div]:bg-secondary" />
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <Clock size={14} className="mr-1 text-secondary" /> {project.daysRemaining} días restantes
          </div>
          <div className="flex items-center">
            <DollarSign size={14} className="mr-1 text-secondary" /> ${project.pricePerToken}/Token
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 font-button">
          <Link href={`/projects/${project.id}`}>Ver Proyecto</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
