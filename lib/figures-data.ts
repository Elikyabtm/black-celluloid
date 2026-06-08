export interface FigureData {
  id: string
  name: string
  years: string
  theme: string
  color: string
  entry: {
    phrase: string
    film?: string
  }
  system: {
    dates: string[]
  }
  choice: {
    quote: string
    quoteAuthor?: string
    left: {
      title: string
      items: string[]
    }
    right: {
      title: string
      items: string[]
    }
    center?: {
      title: string
      items: string[]
    }
  }
  signature: {
    title: string
    events: { year: string; text: string }[]
  }
  friction: {
    position1: string
    position2: string
    data: string
  }
  exit: {
    phrase: string
    links: { id: string; name: string; phrase: string }[]
  }
}

export const figures: FigureData[] = [
  {
    id: "hattie-mcdaniel",
    name: "Hattie McDaniel",
    years: "1895-1952",
    theme: "Visibilité / Enfermement",
    color: "#8B7355",
    entry: {
      phrase: "Elle a remporté l'Oscar qu'elle n'avait pas le droit de célébrer.",
      film: "Gone with the Wind"
    },
    system: {
      dates: [
        "1930 — Le Code Hays interdit les relations romantiques interraciales à l'écran",
        "1940 — Les rôles disponibles pour les actrices noires : domestiques, nourrices, comic relief",
        "1940 — L'hôtel Ambassador de Los Angeles pratique la ségrégation raciale"
      ]
    },
    choice: {
      quote: "Je préfère jouer une femme de chambre que l'être.",
      left: {
        title: "Ce que l'industrie lui proposait",
        items: ["Plus de 300 films", "Tous des rôles de domestiques", "Figures de service", "Comic relief"]
      },
      right: {
        title: "Ce qu'elle voulait jouer",
        items: ["Rôles dramatiques complexes", "Personnages centraux", "Femmes ordinaires", "Jamais obtenu"]
      }
    },
    signature: {
      title: "La nuit des Oscars — 27 février 1940",
      events: [
        { year: "", text: "L'équipe de Gone with the Wind arrive à l'Ambassador Hotel" },
        { year: "", text: "Hattie McDaniel arrive séparément — l'hôtel pratique la ségrégation" },
        { year: "", text: "Elle est placée à une table isolée, loin du reste de l'équipe" },
        { year: "", text: "Son nom est annoncé. Elle remporte l'Oscar de la meilleure actrice dans un second rôle." },
        { year: "", text: "Elle est la première femme noire à recevoir cette récompense" },
        { year: "", text: "Elle pleure. Elle remercie l'Académie." },
        { year: "", text: "Elle repart seule." }
      ]
    },
    friction: {
      position1: "La NAACP condamnait McDaniel pour avoir accepté ces rôles, estimant qu'elle trahissait la communauté noire.",
      position2: "McDaniel défendait ses choix : dans un système fermé, elle a choisi la survie et la dignité qu'elle pouvait atteindre.",
      data: "Après son Oscar, le nombre de rôles disponibles pour les actrices noires n'a pas augmenté. Les rôles proposés à McDaniel sont restés les mêmes."
    },
    exit: {
      phrase: "La reconnaissance peut être une forme d'enfermement.",
      links: [
        { id: "dorothy-dandridge", name: "Dorothy Dandridge", phrase: "La même industrie. Le même piège. Dix ans plus tard." },
        { id: "halle-berry", name: "Halle Berry", phrase: "Soixante ans plus tard, une autre première fois. Une autre impasse." }
      ]
    }
  },
  {
    id: "dorothy-dandridge",
    name: "Dorothy Dandridge",
    years: "1922-1965",
    theme: "Icône construite pour être détruite",
    color: "#C4A484",
    entry: {
      phrase: "Hollywood l'a faite icône. Puis l'a laissée mourir.",
      film: "Life Magazine Cover"
    },
    system: {
      dates: [
        "1954 — Le Code Hays est encore en vigueur. Les relations romantiques interraciales sont interdites à l'écran.",
        "1954 — Brown v. Board of Education — la déségrégation légale commence. Hollywood ne suit pas.",
        "1954 — Les rôles romantiques centraux dans les grandes productions : réservés aux actrices blanches."
      ]
    },
    choice: {
      quote: "Je ne pouvais pas être la fille d'à côté. Ils ne savaient pas quoi faire de moi.",
      left: {
        title: "Ce que Hollywood a fait d'elle",
        items: ["Couverture de Life", "Comparaisons à Monroe", "Icône glamour internationale", "Qualificatifs : exotique, envoûtante, tropicale"]
      },
      right: {
        title: "Ce qu'elle n'a jamais pu être",
        items: ["Une femme ordinaire", "Un rôle romantique ordinaire", "Rôles refusés car interraciaux", "Rôles refusés car trop centraux"]
      }
    },
    signature: {
      title: "La chute",
      events: [
        { year: "1954", text: "Nomination à l'Oscar pour Carmen Jones" },
        { year: "1957", text: "Island in the Sun — scandale pour une relation interraciale suggérée" },
        { year: "1959", text: "Porgy and Bess — dernier grand rôle" },
        { year: "1960", text: "Les propositions s'arrêtent" },
        { year: "1962", text: "Elle déclare faillite" },
        { year: "1965", text: "Elle meurt à 42 ans, seule, dans son appartement" }
      ]
    },
    friction: {
      position1: "Hollywood réhabilite Dandridge après sa mort — documentaires, biographies, hommages. Halle Berry l'incarne en 1999.",
      position2: "L'industrie qui l'a détruite écrit le récit de sa vie. Le mécanisme de réhabilitation posthume permet de se racheter une image.",
      data: "Nombre d'actrices noires ayant accédé à des rôles romantiques centraux dans les grandes productions hollywoodiennes entre 1955 et 1975 : presque zéro."
    },
    exit: {
      phrase: "Le système ne détruit pas celles qu'il ignore. Il détruit celles qu'il a choisies.",
      links: [
        { id: "hattie-mcdaniel", name: "Hattie McDaniel", phrase: "Reconnue pour s'être soumise. Elle aussi a payé le prix." },
        { id: "gabourey-sidibe", name: "Gabourey Sidibe", phrase: "Célébrée. Puis abandonnée. Le même mécanisme, soixante ans plus tard." }
      ]
    }
  },
  {
    id: "pam-grier",
    name: "Pam Grier",
    years: "1949-",
    theme: "Puissance subversive produite dans les conditions du système",
    color: "#CD853F",
    entry: {
      phrase: "Elle incarnait la femme noire qui prend le pouvoir. Financée par des studios blancs.",
      film: "Coffy"
    },
    system: {
      dates: [
        "1968 — Assassinat de Martin Luther King. Le mouvement des droits civiques se radicalise.",
        "1970 — Hollywood identifie le public noir urbain comme marché inexploité.",
        "1971 — Lancement de la Blaxploitation. American International Pictures finance les premiers films."
      ]
    },
    choice: {
      quote: "Mes personnages n'avaient pas besoin d'être sauvées. Elles se sauvaient elles-mêmes.",
      left: {
        title: "Les archétypes classiques",
        items: ["Mammy — soumise, maternelle", "Jezebel — hypersexualisée", "Sapphire — agressive, colérique", "Fonction : servir le récit blanc"]
      },
      right: {
        title: "Les personnages de Grier",
        items: ["Coffy — indépendante, vengeresse", "Foxy Brown — puissante, centrale", "Rupture avec les archétypes", "Contrôle de leur destin"]
      },
      center: {
        title: "Qui profite",
        items: ["Studios blancs financent", "Studios blancs distribuent", "Profits vers Hollywood", "Résistance conditionnelle"]
      }
    },
    signature: {
      title: "Chronologie de la Blaxploitation",
      events: [
        { year: "1971", text: "Sweet Sweetback's Baadasssss Song — premier film, autoproduit par Melvin Van Peebles" },
        { year: "1972", text: "Hollywood récupère le mouvement. Les studios blancs prennent le contrôle." },
        { year: "1972", text: "La Coalition Against Blaxploitation est fondée par la NAACP" },
        { year: "1973", text: "Coffy sort. Succès commercial massif." },
        { year: "1974", text: "Foxy Brown sort. Grier exprime ses premières ambivalences." },
        { year: "1975", text: "Le mouvement s'essouffle. Hollywood se tourne vers d'autres marchés." }
      ]
    },
    friction: {
      position1: "La Coalition Against Blaxploitation : ces films reproduisent des stéréotypes, criminalisent la communauté noire, hypersexualisent les femmes.",
      position2: "Grier et ses fans : ces films ont donné une visibilité et une puissance inédites aux personnages noirs, surtout féminins.",
      data: "Après la fin de la Blaxploitation, le nombre de rôles centraux pour les actrices noires dans les productions hollywoodiennes mainstream s'effondre."
    },
    exit: {
      phrase: "La résistance produite dans les conditions du système qu'elle conteste reste une résistance conditionnelle.",
      links: [
        { id: "halle-berry", name: "Halle Berry", phrase: "Vingt ans plus tard. La puissance à l'écran. Le même plafond après." },
        { id: "halle-bailey", name: "Halle Bailey", phrase: "Aujourd'hui encore, la visibilité a un prix et des conditions." }
      ]
    }
  },
  {
    id: "halle-berry",
    name: "Halle Berry",
    years: "1966-",
    theme: "La victoire symbolique ne change pas les structures",
    color: "#B8860B",
    entry: {
      phrase: "La première. La seule. Vingt ans de silence après elle.",
      film: "Oscar 2002"
    },
    system: {
      dates: [
        "1929-2002 — En 73 ans de cérémonie des Oscars, aucune femme noire n'a remporté le prix de la meilleure actrice.",
        "2002 — Halle Berry est la première.",
        "2024 — Elle est toujours la seule."
      ]
    },
    choice: {
      quote: "Ce moment est tellement plus grand que moi.",
      quoteAuthor: "Discours des Oscars 2002",
      left: {
        title: "Le rôle de l'Oscar",
        items: ["Monster's Ball (2001)", "Femme noire dans la souffrance", "Scène sexuelle explicite", "Qualificatifs : courageuse, bouleversante"]
      },
      right: {
        title: "Ce que l'Oscar lui ouvre",
        items: ["Catwoman (2004)", "Storm dans X-Men", "Franchises de super-héroïnes", "Rôles fantastiques, impersonnels"]
      }
    },
    signature: {
      title: "Avant et après l'Oscar",
      events: [
        { year: "1992", text: "Boomerang — rôle dramatique ancré dans le réel" },
        { year: "1995", text: "Losing Isaiah — complexe, dramatique" },
        { year: "1999", text: "Introducing Dorothy Dandridge — biopic" },
        { year: "2001", text: "Monster's Ball — Oscar" },
        { year: "2002", text: "Die Another Day — James Bond" },
        { year: "2003", text: "X-Men 2 — franchise fantastique" },
        { year: "2004", text: "Catwoman — univers fantastique" },
        { year: "2006", text: "X-Men: The Last Stand — marginalisation progressive" }
      ]
    },
    friction: {
      position1: "Whoopi Goldberg, après son Oscar en 1991 : « Si tu ne vois pas de représentation, tu dois la créer toi-même. »",
      position2: "La victoire de Berry célébrée comme ouverture historique. La réalité de sa carrière après comme fermeture différente.",
      data: "Entre 2002 et 2022, aucune femme noire ne remporte l'Oscar de la meilleure actrice. Vingt ans. Le symbole de l'ouverture est aussi le symbole du plafond."
    },
    exit: {
      phrase: "Être la première ne garantit pas qu'il y en aura d'autres.",
      links: [
        { id: "hattie-mcdaniel", name: "Hattie McDaniel", phrase: "La première reconnaissance. Le même enfermement." },
        { id: "viola-davis", name: "Viola Davis", phrase: "La plus récompensée après elle. Les mêmes structures." }
      ]
    }
  },
  {
    id: "viola-davis",
    name: "Viola Davis",
    years: "1965-",
    theme: "Le droit à la complexité arraché",
    color: "#8B4513",
    entry: {
      phrase: "La plus récompensée de sa génération. Elle regrette certains de ces rôles.",
      film: "Award Ceremony"
    },
    system: {
      dates: [
        "2015 — Lancement du mouvement #OscarsSoWhite",
        "2008-2020 — Moins de 3% des rôles principaux féminins au cinéma attribués à des femmes noires",
        "2022 — Davis révèle dans ses mémoires qu'elle était payée significativement moins que ses homologues blancs"
      ]
    },
    choice: {
      quote: "J'ai dit oui à The Help. C'est le plus grand regret de ma carrière.",
      left: {
        title: "Trauma et souffrance",
        items: ["The Help — domestique", "Fences — lutte et marginalité", "Ma Rainey's Black Bottom — douleur", "Femmes puissantes mais dans la douleur"]
      },
      right: {
        title: "Puissance épique et fantastique",
        items: ["The Woman King — guerrière", "Suicide Squad — figure d'autorité", "Univers hors du réel", "Pouvoir déplacé dans le fantastique"]
      },
      center: {
        title: "L'absent",
        items: ["L'ordinaire", "La complexité quotidienne", "La banalité", "Absente"]
      }
    },
    signature: {
      title: "Le cas The Woman King (2022)",
      events: [
        { year: "", text: "Des femmes noires guerrières et souveraines au centre d'un récit épique" },
        { year: "", text: "La presse célèbre une avancée historique de représentation" },
        { year: "", text: "Figures féminines noires plurielles, complexes, centrales" },
        { year: "", text: "Rupture avec les archétypes dominants" },
        { year: "", text: "Critique : le film édulcore le rôle des Agojie dans la traite des esclaves" },
        { year: "", text: "À quel prix accède-t-on à une représentation positive ?" }
      ]
    },
    friction: {
      position1: "Les critiques féministes noires de The Help : un film sur la souffrance noire raconté depuis un regard blanc, salué par Hollywood.",
      position2: "La défense : une visibilité réelle pour des actrices noires dans des rôles complexes.",
      data: "68% des rôles centraux attribués à des actrices noires dans les films à plus de 50 millions de dollars de budget entre 2015 et 2025 sont dans des univers fantastiques, épiques ou de super-héros."
    },
    exit: {
      phrase: "Être puissante à l'écran n'est pas la même chose qu'être ordinaire.",
      links: [
        { id: "halle-berry", name: "Halle Berry", phrase: "Récompensée. Marginalisée. Le même chemin." },
        { id: "lupita-nyongo", name: "Lupita Nyong'o", phrase: "Célébrée. Puis enfermée dans l'altérité." }
      ]
    }
  },
  {
    id: "gabourey-sidibe",
    name: "Gabourey Sidibe",
    years: "1983-",
    theme: "Visibilité explosive / abandon structurel",
    color: "#A0522D",
    entry: {
      phrase: "Du jour au lendemain, tout le monde la célébrait. Puis plus personne.",
      film: "Oscars 2010"
    },
    system: {
      dates: [
        "2009 — Première présidence Obama. L'Amérique se raconte une histoire de progrès racial.",
        "2009 — Precious sort. Salué unanimement comme une représentation courageuse et authentique.",
        "2010 — Sidibe est nommée à l'Oscar de la meilleure actrice. Elle a 26 ans."
      ]
    },
    choice: {
      quote: "Ce soir, tout le monde est amoureux de moi.",
      left: {
        title: "La célébration",
        items: ["Couvertures de magazines", "Invitations aux cérémonies", "Discours sur sa révélation", "Effervescence de l'industrie"]
      },
      right: {
        title: "Le vide",
        items: ["Nombre de rôles principaux cinéma 2010-2020 : 0", "Silence de l'industrie", "Trajectoire vers la télévision", "Abandon structurel"]
      }
    },
    signature: {
      title: "L'abandon",
      events: [
        { year: "2009", text: "Precious. Nomination à l'Oscar." },
        { year: "2011", text: "Tower Heist. Rôle secondaire mineur." },
        { year: "2013", text: "Difficult People. Télévision." },
        { year: "2015", text: "Empire. Série télévisée. Rôle récurrent." },
        { year: "2020", text: "Empire se termine." },
        { year: "", text: "Cinéma : silence." }
      ]
    },
    friction: {
      position1: "La critique de bell hooks sur Precious : le film fait de la souffrance extrême la condition de la visibilité pour les corps qui ne correspondent pas aux standards.",
      position2: "La défense du film : une histoire racontée avec courage et honnêteté.",
      data: "Qu'est-ce que la représentation veut dire quand elle s'arrête au moment où la caméra se détourne ?"
    },
    exit: {
      phrase: "L'industrie célèbre ce qu'elle ne sait pas intégrer.",
      links: [
        { id: "dorothy-dandridge", name: "Dorothy Dandridge", phrase: "Célébrée. Détruite. Le même mécanisme, une autre époque." },
        { id: "lupita-nyongo", name: "Lupita Nyong'o", phrase: "Oscarisée la même décennie. Une autre forme du même abandon." }
      ]
    }
  },
  {
    id: "lupita-nyongo",
    name: "Lupita Nyong'o",
    years: "1983-",
    theme: "La diversité internationale comme vitrine",
    color: "#6B4423",
    entry: {
      phrase: "Elle est devenue le visage de la diversité. Son visage a disparu dans Star Wars.",
      film: "12 Years a Slave / Star Wars"
    },
    system: {
      dates: [
        "2015 — Mouvement #OscarsSoWhite. Hollywood sous pression de diversifier.",
        "2014 — Le mouvement Black Lives Matter remet le colorisme au centre du débat public.",
        "2014 — 65 à 70% des rôles principaux féminins noirs attribués à des actrices à peau claire ou métisses."
      ]
    },
    choice: {
      quote: "Quand j'étais enfant, je priais pour avoir la peau plus claire.",
      quoteAuthor: "Essence Black Women in Hollywood Awards, 2014",
      left: {
        title: "Son image publique",
        items: ["Icône de beauté noire", "Peau foncée assumée", "Discours sur le colorisme", "Couvertures de magazines"]
      },
      right: {
        title: "Ses rôles à l'écran",
        items: ["12 Years a Slave — souffrance et trauma", "Star Wars — motion capture, visage invisible", "Black Panther — guerrière", "Us — figure horrifique"]
      }
    },
    signature: {
      title: "La disparition du visage",
      events: [
        { year: "", text: "Lupita Nyong'o en photo publique : présente, visible, reconnue" },
        { year: "", text: "Maz Kanata dans Star Wars : créature numérique" },
        { year: "", text: "Son visage a disparu" },
        { year: "", text: "Sa voix reste" },
        { year: "", text: "Son corps n'existe plus" },
        { year: "", text: "Hollywood lui a donné un rôle central dans l'une des franchises les plus vues de l'histoire. Et a effacé son visage." }
      ]
    },
    friction: {
      position1: "Le colorisme rendu visible : comparaison sobre entre ses rôles et ceux obtenus par des actrices à peau claire de sa génération.",
      position2: "La célébration de sa trajectoire comme preuve que la diversité progresse.",
      data: "Sur les 10 rôles principaux féminins les plus vus au box-office mondial entre 2013 et 2023, combien sont attribués à des actrices à peau foncée dans des rôles ancrés dans le réel ordinaire ?"
    },
    exit: {
      phrase: "Être visible ne signifie pas avoir le droit d'être ordinaire.",
      links: [
        { id: "gabourey-sidibe", name: "Gabourey Sidibe", phrase: "Oscarisées la même décennie. Deux formes du même effacement." },
        { id: "halle-bailey", name: "Halle Bailey", phrase: "Après elle, une autre actrice à peau foncée dans un rôle fantastique. Une sirène." }
      ]
    }
  },
  {
    id: "halle-bailey",
    name: "Halle Bailey",
    years: "2000-",
    theme: "Le casting comme champ de bataille",
    color: "#4A3728",
    entry: {
      phrase: "Son premier grand rôle romantique au cinéma. Elle jouait une sirène.",
      film: "The Little Mermaid"
    },
    system: {
      dates: [
        "2020 — Hollywood affiche ses engagements diversité après la mort de George Floyd.",
        "2024-2026 — La proportion de femmes de couleur dans les rôles principaux chute de 37% à 14-15%.",
        "2023 — The Little Mermaid sort. La controverse éclate immédiatement."
      ]
    },
    choice: {
      quote: "Ariel n'a jamais été noire.",
      quoteAuthor: "Réactions en ligne",
      left: {
        title: "La controverse",
        items: ["#NotMyAriel — millions d'occurrences", "Rejet du casting", "Résistance au changement", "Hostilité ouverte"]
      },
      right: {
        title: "L'autre réalité",
        items: ["Vidéo virale de petites filles noires", "Découvrant une princesse qui leur ressemble", "Millions de vues", "L'impact réel de la représentation"]
      }
    },
    signature: {
      title: "Le fantastique comme condition",
      events: [
        { year: "2018-2022", text: "Grown-ish. Série télévisée. Rôle ancré dans le réel, quotidien, romantique." },
        { year: "2023", text: "The Little Mermaid. Sirène. Univers fantastique." },
        { year: "2023", text: "The Color Purple. Nettie. Rôle dramatique musical." },
        { year: "", text: "Comparaison : son rôle dans Grown-ish (femme ordinaire) vs premier grand rôle cinéma (sirène)" },
        { year: "", text: "Pourquoi le premier grand rôle romantique accordé à une actrice noire à peau foncée est-il celui d'une créature non humaine ?" }
      ]
    },
    friction: {
      position1: "Une avancée symbolique forte, une représentation qui compte pour des millions d'enfants noirs.",
      position2: "Diversifier des personnages historiquement blancs dans des univers fantastiques est-il une transformation réelle, ou un substitut qui évite de créer de nouvelles figures noires originales ?",
      data: "Sur les 10 plus grands rôles principaux obtenus par des actrices noires à peau foncée dans les productions hollywoodiennes à gros budget entre 2013 et 2023 — combien sont dans des univers fantastiques ?"
    },
    exit: {
      phrase: "La représentation dans le fantastique est réelle. Et elle a des limites réelles.",
      links: [
        { id: "lupita-nyongo", name: "Lupita Nyong'o", phrase: "Avant elle, une autre actrice à peau foncée. Un autre univers hors du réel." },
        { id: "hattie-mcdaniel", name: "Hattie McDaniel", phrase: "Au début, les rôles de service. Aujourd'hui, les univers fantastiques. Les conditions changent. Le mécanisme reste." }
      ]
    }
  }
]

export const fantasyData = {
  title: "Le fantastique comme espace de relégation",
  question: "Quand Hollywood cast une femme noire dans un rôle central, où la place-t-il ?",
  realRoles: [
    { film: "Precious", actress: "Sidibe", note: "souffrance" },
    { film: "The Help", actress: "Davis", note: "souffrance" },
    { film: "12 Years a Slave", actress: "Nyong'o", note: "trauma" },
    { film: "Monster's Ball", actress: "Berry", note: "souffrance" },
    { film: "The Color Purple", actress: "Bailey", note: "adaptation" }
  ],
  fantasyRoles: [
    { film: "X-Men", actress: "Berry" },
    { film: "Catwoman", actress: "Berry" },
    { film: "Star Wars", actress: "Nyong'o" },
    { film: "Black Panther", actress: "Nyong'o" },
    { film: "Us", actress: "Nyong'o" },
    { film: "The Little Mermaid", actress: "Bailey" },
    { film: "The Woman King", actress: "Davis" },
    { film: "Suicide Squad", actress: "Davis" }
  ]
}
