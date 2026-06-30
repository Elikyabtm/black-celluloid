import { notFound } from "next/navigation"
import { HattiePage } from "@/components/figures/hattie-page"
import { DorothyPage } from "@/components/figures/dorothy-page"
import { PamPage } from "@/components/figures/pam-page"
import { HalleBerryPage } from "@/components/figures/halle-berry-page"
import { ViolaPage } from "@/components/figures/viola-page"
import { GaboureySidibePage } from "@/components/figures/gabourey-page"
import { LupitaPage } from "@/components/figures/lupita-page"
import { HalleBaileyPage } from "@/components/figures/halle-bailey-page"
import { CustomCursor } from "@/components/custom-cursor"
import { ScrollToTop } from "@/components/scroll-to-top"
import { BackToHub } from "@/components/back-to-hub"
import { MarkVisited } from "@/components/mark-visited"

const figureComponents: Record<string, React.ComponentType> = {
  "hattie-mcdaniel": HattiePage,
  "dorothy-dandridge": DorothyPage,
  "pam-grier": PamPage,
  "halle-berry": HalleBerryPage,
  "viola-davis": ViolaPage,
  "gabourey-sidibe": GaboureySidibePage,
  "lupita-nyongo": LupitaPage,
  "halle-bailey": HalleBaileyPage,
}

const figureNames: Record<string, string> = {
  "hattie-mcdaniel": "Hattie McDaniel",
  "dorothy-dandridge": "Dorothy Dandridge",
  "pam-grier": "Pam Grier",
  "halle-berry": "Halle Berry",
  "viola-davis": "Viola Davis",
  "gabourey-sidibe": "Gabourey Sidibe",
  "lupita-nyongo": "Lupita Nyong'o",
  "halle-bailey": "Halle Bailey",
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(figureComponents).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const name = figureNames[slug]
  
  if (!name) {
    return { title: "Figure not found" }
  }

  return {
    title: `${name} — Black Celluloid`,
    description: `Découvrez l'histoire de ${name} dans Black Celluloid`,
  }
}

export default async function FigureRoute({ params }: Props) {
  const { slug } = await params
  const FigureComponent = figureComponents[slug]

  if (!FigureComponent) {
    notFound()
  }

  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <BackToHub />
      <MarkVisited id={slug} />
      <FigureComponent />
    </>
  )
}