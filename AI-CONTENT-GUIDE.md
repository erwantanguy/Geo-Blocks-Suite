# Guide IA - Adaptation de contenus avec GEO Blocks Suite

> Ce document est conçu pour être utilisé comme instruction/contexte par une IA (ChatGPT, Claude, etc.) afin d'adapter des contenus web en utilisant les blocs Gutenberg GEO.

---

## Instructions générales

Quand tu adaptes un contenu pour WordPress avec les blocs GEO :

1. **Analyse le contenu source** et identifie les éléments extractibles
2. **Choisis les blocs appropriés** selon le type de contenu
3. **Remplis TOUS les champs** de chaque bloc (pas seulement les obligatoires)
4. **Respecte les limites de caractères** indiquées
5. **Génère le JSON des attributs** pour chaque bloc

---

## Blocs disponibles et leurs champs

### 1. TL;DR GEO

**Usage** : Résumé en début d'article (OBLIGATOIRE pour tout article)

**Champs** :
```json
{
  "title": "TL;DR",
  "content": "Résumé de 280 caractères maximum...",
  "style": "blue",
  "showIcon": true
}
```

| Champ | Type | Valeurs possibles | Obligatoire |
|-------|------|-------------------|-------------|
| `title` | string | "TL;DR", "En bref", "À retenir", "L'essentiel", "Résumé", ou personnalisé | Oui |
| `content` | string | Max 280 caractères | Oui |
| `style` | string | "blue", "green", "orange", "purple", "minimal" | Oui |
| `showIcon` | boolean | true/false | Non |

**Règles** :
- Maximum 280 caractères (limite Twitter = limite IA)
- Doit répondre directement à l'intention de recherche
- Inclure le mot-clé principal
- Pas de formulations vagues ("Dans cet article...")

**Exemple de sortie** :
```
[TL;DR]
Titre: En bref
Contenu: Le GEO (Generative Engine Optimization) optimise vos contenus pour être cités par les IA comme ChatGPT et Perplexity. Contrairement au SEO qui vise le classement, le GEO vise la citation comme source fiable.
Style: blue
Icône: oui
```

---

### 2. How-To GEO

**Usage** : Tutoriels, guides pas-à-pas, procédures

**Champs** :
```json
{
  "title": "Comment créer un site WordPress",
  "totalTime": "PT30M",
  "difficulty": "medium",
  "showNumbers": true,
  "steps": [
    {
      "title": "Choisir un hébergeur",
      "content": "Description détaillée de l'étape..."
    }
  ]
}
```

| Champ | Type | Valeurs possibles | Obligatoire |
|-------|------|-------------------|-------------|
| `title` | string | Commence par "Comment..." | Oui |
| `totalTime` | string | Format ISO 8601 (PT30M, PT1H, PT2H30M) | Oui |
| `difficulty` | string | "easy", "medium", "hard" | Oui |
| `showNumbers` | boolean | true/false | Non |
| `steps` | array | Liste d'objets {title, content} | Oui |

**Règles** :
- Titre clair commençant par "Comment..."
- 3 à 10 étapes maximum
- Chaque étape = une action concrète et vérifiable
- Durée réaliste et honnête

**Exemple de sortie** :
```
[HOW-TO GEO]
Titre: Comment optimiser un article pour le GEO
Durée: PT45M (45 minutes)
Difficulté: medium
Numérotation: oui

Étapes:
1. Analyser l'intention de recherche
   → Identifiez ce que l'utilisateur veut vraiment savoir...

2. Ajouter un TL;DR en introduction
   → Résumez l'essentiel en moins de 280 caractères...

3. Structurer avec des H2/H3 clairs
   → Chaque section doit être compréhensible isolément...

4. Ajouter des sources et citations
   → Minimum 3 sources fiables par article...

5. Inclure une FAQ
   → 5-10 questions naturelles liées au sujet...
```

---

### 3. Définition GEO

**Usage** : Répondre aux requêtes "Qu'est-ce que...", glossaires

**Champs** :
```json
{
  "term": "GEO",
  "definition": "Le Generative Engine Optimization est...",
  "source": "Search Engine Journal",
  "sourceUrl": "https://exemple.com/source",
  "style": "dictionary"
}
```

| Champ | Type | Valeurs possibles | Obligatoire |
|-------|------|-------------------|-------------|
| `term` | string | Le terme à définir | Oui |
| `definition` | string | 50-150 mots | Oui |
| `source` | string | Nom de la source | Non |
| `sourceUrl` | string | URL de la source | Non |
| `style` | string | "dictionary", "card", "highlighted", "minimal" | Oui |

**Règles** :
- Première phrase = définition directe et concise
- 50-150 mots pour la définition complète
- Citer une source reconnue si possible
- Utiliser le terme exact dans la définition

**Exemple de sortie** :
```
[DÉFINITION GEO]
Terme: GEO (Generative Engine Optimization)
Définition: Le GEO est l'ensemble des techniques d'optimisation de contenu visant à être cité comme source fiable par les moteurs de recherche génératifs (ChatGPT, Perplexity, Gemini, Claude). Contrairement au SEO traditionnel qui optimise le classement dans les résultats, le GEO optimise la probabilité d'être sélectionné comme source dans les réponses générées par l'IA.
Source: Search Engine Journal
URL: https://www.searchenginejournal.com/geo-optimization/
Style: dictionary
```

---

### 4. FAQ GEO

**Usage** : Questions fréquentes, fin d'article

**Champs** :
```json
{
  "faqName": "FAQ sur le GEO",
  "items": [
    {
      "question": "Qu'est-ce que le GEO ?",
      "answer": "Le GEO (Generative Engine Optimization) est..."
    }
  ]
}
```

| Champ | Type | Valeurs possibles | Obligatoire |
|-------|------|-------------------|-------------|
| `faqName` | string | Nom descriptif de la FAQ | Oui |
| `items` | array | Liste d'objets {question, answer} | Oui |

**Règles** :
- 5-10 questions par FAQ
- Questions naturelles (comment, pourquoi, quand, est-ce que...)
- Réponses complètes : 50-300 mots par réponse
- Une seule FAQ par page (éviter doublons Schema)
- Questions basées sur les intentions réelles (fan-out)

**Exemple de sortie** :
```
[FAQ GEO]
Nom: FAQ sur l'optimisation GEO

Q1: Qu'est-ce que le GEO ?
R1: Le GEO (Generative Engine Optimization) est l'optimisation des contenus pour les moteurs de recherche génératifs comme ChatGPT, Perplexity ou Gemini. L'objectif est d'être cité comme source fiable dans les réponses générées par l'IA.

Q2: Le GEO remplace-t-il le SEO ?
R2: Non, le GEO complète le SEO. Le SEO reste nécessaire pour le classement dans Google. Le GEO ajoute une couche d'optimisation pour être sélectionné comme source par les IA.

Q3: Comment mesurer sa visibilité GEO ?
R3: Plusieurs méthodes : suivre les mentions de marque dans les réponses IA, analyser les logs serveur pour les bots IA (GPTBot, ClaudeBot), utiliser des outils de suivi de citations.

Q4: Quels sont les facteurs les plus importants en GEO ?
R4: Les citations sourcées (+40%), les statistiques (+37%), les sources crédibles (+30%), et la structure claire du contenu (+25%) sont les facteurs les plus impactants selon les études.

Q5: Faut-il bloquer les bots IA ?
R5: Non, sauf cas spécifique. Si vous voulez être cité par les IA, vous devez autoriser leurs crawlers (GPTBot, ClaudeBot, PerplexityBot) à indexer votre contenu.
```

---

### 5. Pros/Cons GEO

**Usage** : Comparatifs, avis produits/services, tests

**Champs** :
```json
{
  "title": "Avantages et inconvénients de [Produit]",
  "prosLabel": "Avantages",
  "consLabel": "Inconvénients",
  "layout": "side-by-side",
  "pros": ["Point positif 1", "Point positif 2"],
  "cons": ["Point négatif 1", "Point négatif 2"],
  "itemReviewedId": "https://site.com/page#product-id",
  "itemReviewedName": "Nom du produit",
  "itemReviewedType": "SoftwareApplication",
  "authorName": "Nom de l'auteur"
}
```

| Champ | Type | Valeurs possibles | Obligatoire |
|-------|------|-------------------|-------------|
| `title` | string | Titre du bloc | Non |
| `prosLabel` | string | "Avantages", "Points forts", personnalisé | Oui |
| `consLabel` | string | "Inconvénients", "Points faibles", personnalisé | Oui |
| `layout` | string | "side-by-side", "stacked" | Oui |
| `pros` | array | Liste de strings | Oui |
| `cons` | array | Liste de strings | Oui |
| `itemReviewedId` | string | URL#id d'une entité existante | Si entité existe |
| `itemReviewedName` | string | Nom du produit/service | Si pas d'id |
| `itemReviewedType` | string | "Product", "SoftwareApplication", "Service", "Organization", "LocalBusiness", "Book", "Course", "Event", "Movie", "CreativeWork" | Oui |
| `authorName` | string | Nom de l'auteur de l'avis | Oui |

**Règles** :
- Équilibrer avantages et inconvénients (crédibilité)
- 3-6 points par colonne
- Champs Schema.org OBLIGATOIRES pour validation Google
- Utiliser `itemReviewedId` si l'entité est déjà déclarée ailleurs

**Exemple de sortie** :
```
[PROS/CONS GEO]
Titre: Avantages et inconvénients de ChatGPT Plus
Layout: side-by-side

Avantages:
✅ Accès prioritaire même en période de forte charge
✅ Accès à GPT-4 et aux derniers modèles
✅ Plugins et fonctionnalités avancées
✅ Génération d'images avec DALL-E

Inconvénients:
❌ Prix de 20$/mois
❌ Limite de messages avec GPT-4
❌ Pas toujours plus précis que la version gratuite
❌ Dépendance à un service externe

Schema.org:
- Type évalué: SoftwareApplication
- Nom: ChatGPT Plus
- Auteur: Erwan Tanguy
```

---

### 6. Stats GEO

**Usage** : Chiffres clés, données sourcées, arguments quantitatifs

**Champs** :
```json
{
  "value": "87",
  "unit": "%",
  "description": "des entreprises utilisent l'IA en 2026",
  "source": "McKinsey",
  "sourceUrl": "https://mckinsey.com/...",
  "year": "2026",
  "size": "large",
  "style": "blue"
}
```

| Champ | Type | Valeurs possibles | Obligatoire |
|-------|------|-------------------|-------------|
| `value` | string | Le chiffre | Oui |
| `unit` | string | "%", "€", "$", "M", "k", personnalisé | Oui |
| `description` | string | Ce que représente le chiffre | Oui |
| `source` | string | Organisme/étude source | Oui |
| `sourceUrl` | string | URL de la source | Oui |
| `year` | string | Année de la donnée | Oui |
| `size` | string | "small", "medium", "large" | Oui |
| `style` | string | "blue", "purple", "green", "red", "minimal" | Oui |

**Règles** :
- TOUJOURS citer la source avec URL
- Données récentes (< 2 ans idéalement)
- Un seul chiffre par bloc
- Description contextualisante

**Exemple de sortie** :
```
[STATS GEO]
Valeur: 50
Unité: %
Description: du trafic organique aura disparu d'ici 2028 au profit des IA génératives
Source: Gartner
URL: https://gartner.com/...
Année: 2024
Taille: large
Style: red
```

---

### 7. Author Box GEO

**Usage** : Fin d'article, page équipe, crédibilité E-E-A-T

**Champs** :
```json
{
  "name": "Erwan Tanguy",
  "title": "Consultant SEO/GEO",
  "bio": "Expert en optimisation pour les moteurs génératifs avec 10 ans d'expérience...",
  "imageUrl": "https://site.com/photo.jpg",
  "website": "https://ticoet.fr",
  "linkedin": "https://linkedin.com/in/erwantanguy",
  "twitter": "https://twitter.com/erwantanguy",
  "email": "contact@ticoet.fr",
  "style": "card"
}
```

| Champ | Type | Valeurs possibles | Obligatoire |
|-------|------|-------------------|-------------|
| `name` | string | Nom complet | Oui |
| `title` | string | Fonction/expertise | Oui |
| `bio` | string | 2-3 phrases orientées crédibilité | Oui |
| `imageUrl` | string | URL de la photo | Oui |
| `website` | string | URL personnelle | Non |
| `linkedin` | string | Profil LinkedIn | Recommandé |
| `twitter` | string | Compte Twitter/X | Non |
| `email` | string | Email de contact | Non |
| `style` | string | "classic", "card", "minimal", "horizontal" | Oui |

**Règles** :
- Photo professionnelle obligatoire
- Titre précis démontrant l'expertise
- Bio orientée crédibilité (années d'expérience, certifications, clients notables)
- LinkedIn fortement recommandé (signal E-E-A-T)

**Exemple de sortie** :
```
[AUTHOR BOX GEO]
Nom: Erwan Tanguy
Titre: Consultant SEO/GEO & Développeur WordPress
Bio: Expert en référencement et optimisation pour les moteurs génératifs depuis 2015. Créateur de la suite d'outils GEO pour WordPress. Accompagne les entreprises culturelles dans leur stratégie de visibilité digitale.
Photo: https://ticoet.fr/photo-erwan.jpg
Site web: https://ticoet.fr
LinkedIn: https://linkedin.com/in/erwantanguy
Style: card
```

---

### 8. Blockquote GEO

**Usage** : Citations d'experts, témoignages, références

**Champs** :
```json
{
  "quote": "Le contenu est roi, mais le contexte est le royaume.",
  "author": "Gary Vaynerchuk",
  "authorTitle": "Entrepreneur et auteur",
  "source": "Crushing It!",
  "sourceUrl": "https://exemple.com/source"
}
```

| Champ | Type | Valeurs possibles | Obligatoire |
|-------|------|-------------------|-------------|
| `quote` | string | Texte de la citation (< 300 car.) | Oui |
| `author` | string | Nom de la personne citée | Oui |
| `authorTitle` | string | Fonction/titre | Non |
| `source` | string | Livre, article, conférence... | Recommandé |
| `sourceUrl` | string | Lien vers la source | Recommandé |

**Règles** :
- Citations courtes (< 300 caractères)
- Auteurs reconnus dans le domaine
- Source vérifiable quand possible
- Pertinence avec le contenu de l'article

**Exemple de sortie** :
```
[BLOCKQUOTE GEO]
Citation: "Les IA préfèrent les contenus prouvés, sourcés et clairs. Améliorer les signaux E-E-A-T augmente significativement les chances d'être cité."
Auteur: AWI Agency
Titre: Experts SEO/GEO
Source: Livre Blanc GEO 2026
URL: https://awi.com/livre-blanc-geo
```

---

### 9. Image GEO

**Usage** : Images importantes avec métadonnées complètes

**Champs** :
```json
{
  "imageUrl": "https://site.com/image.webp",
  "name": "Dashboard GEO Bot Monitor",
  "description": "Capture d'écran du tableau de bord montrant les statistiques de crawl IA",
  "caption": "Interface principale de GEO Bot Monitor v1.1",
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "creditText": "Erwan Tanguy",
  "copyrightNotice": "© 2026 Ticoët",
  "acquireLicensePage": "https://ticoet.fr/contact",
  "creatorName": "Erwan Tanguy"
}
```

| Champ | Type | Valeurs possibles | Obligatoire |
|-------|------|-------------------|-------------|
| `imageUrl` | string | URL de l'image | Oui |
| `name` | string | Titre de l'image | Oui |
| `description` | string | Alt text détaillé | Oui |
| `caption` | string | Légende visible | Non |
| `license` | string | URL Creative Commons ou autre | Recommandé |
| `creditText` | string | Crédit photographe/créateur | Recommandé |
| `copyrightNotice` | string | Notice © | Recommandé |
| `acquireLicensePage` | string | URL pour obtenir licence | Non |
| `creatorName` | string | Nom du créateur | Recommandé |

**Exemple de sortie** :
```
[IMAGE GEO]
URL: https://ticoet.fr/images/geo-dashboard.webp
Titre: Tableau de bord GEO Bot Monitor
Description: Capture d'écran montrant la répartition des visites de robots IA par catégorie (SEO, GEO/IA, Réseaux sociaux) avec graphiques d'évolution sur 30 jours
Légende: Interface de monitoring des crawlers IA
Licence: https://creativecommons.org/licenses/by-sa/4.0/
Crédit: Erwan Tanguy
Copyright: © 2026 Ticoët
Créateur: Erwan Tanguy
```

---

### 10. Video GEO

**Usage** : Vidéos YouTube/Vimeo ou hébergées

**Champs** :
```json
{
  "videoUrl": "https://youtube.com/watch?v=xxxxx",
  "name": "Tutoriel GEO Blocks Suite",
  "description": "Comment utiliser les blocs GEO pour optimiser vos contenus WordPress",
  "duration": "PT5M30S",
  "thumbnailUrl": "https://site.com/thumbnail.jpg",
  "uploadDate": "2026-04-01",
  "transcript": "Bienvenue dans ce tutoriel..."
}
```

| Champ | Type | Valeurs possibles | Obligatoire |
|-------|------|-------------------|-------------|
| `videoUrl` | string | YouTube, Vimeo ou fichier | Oui |
| `name` | string | Titre de la vidéo | Oui |
| `description` | string | Résumé du contenu | Oui |
| `duration` | string | Format ISO 8601 (PT5M30S) | Oui |
| `thumbnailUrl` | string | Image de prévisualisation | Recommandé |
| `uploadDate` | string | Date YYYY-MM-DD | Oui |
| `transcript` | string | Transcription texte | Recommandé |

---

### 11. Audio GEO

**Usage** : Podcasts, interviews audio

**Champs** :
```json
{
  "audioUrl": "https://site.com/podcast.mp3",
  "name": "Podcast GEO #12 - L'avenir du SEO",
  "description": "Discussion sur l'impact des IA génératives",
  "duration": "PT45M",
  "uploadDate": "2026-04-01",
  "transcript": "Transcription complète..."
}
```

| Champ | Type | Valeurs possibles | Obligatoire |
|-------|------|-------------------|-------------|
| `audioUrl` | string | MP3, OGG, WAV | Oui |
| `name` | string | Titre de l'épisode | Oui |
| `description` | string | Résumé | Oui |
| `duration` | string | Format ISO 8601 | Oui |
| `uploadDate` | string | Date YYYY-MM-DD | Oui |
| `transcript` | string | Transcription COMPLÈTE | OBLIGATOIRE pour GEO |

---

## Template de sortie pour l'IA

Quand tu adaptes un contenu, génère la sortie dans ce format :

```
# Adaptation GEO pour : [Titre de l'article]

## Structure recommandée

### 1. TL;DR (début d'article)
[TL;DR GEO]
Titre: En bref
Contenu: [280 caractères max]
Style: blue

### 2. Contenu principal
[Paragraphe d'introduction]

[DÉFINITION GEO] (si terme technique)
Terme: ...
Définition: ...

[Sections H2/H3 avec contenu]

[STATS GEO] (si donnée chiffrée importante)
Valeur: ...
Source: ...

[BLOCKQUOTE GEO] (si citation d'expert)
Citation: ...
Auteur: ...

[HOW-TO GEO] (si tutoriel)
Titre: Comment...
Étapes: ...

### 3. FAQ (fin d'article)
[FAQ GEO]
Nom: FAQ sur [sujet]
Q1: ...
R1: ...

### 4. Auteur (fin d'article)
[AUTHOR BOX GEO]
Nom: ...
Bio: ...
```

---

## Checklist avant validation

- [ ] TL;DR présent en début d'article (< 280 car.)
- [ ] Tous les champs obligatoires remplis pour chaque bloc
- [ ] Sources citées avec URLs pour Stats et Blockquotes
- [ ] FAQ avec 5-10 questions naturelles
- [ ] Author Box avec LinkedIn
- [ ] Pros/Cons avec champs Schema.org complets
- [ ] Images avec description alt détaillée

---

## Exemples de transformation

### Contenu source :
> "L'intelligence artificielle transforme le référencement. Selon une étude de Gartner, 50% du trafic organique pourrait disparaître d'ici 2028."

### Contenu adapté GEO :

```
[TL;DR GEO]
Titre: En bref
Contenu: L'IA transforme le SEO en GEO. D'ici 2028, 50% du trafic organique sera capté par les moteurs génératifs. L'enjeu : être cité comme source, pas juste être classé.
Style: blue

[STATS GEO]
Valeur: 50
Unité: %
Description: du trafic organique disparaîtra d'ici 2028 au profit des IA
Source: Gartner
URL: https://gartner.com/...
Année: 2024
Style: red
Taille: large

[DÉFINITION GEO]
Terme: GEO (Generative Engine Optimization)
Définition: Ensemble des techniques d'optimisation visant à être cité comme source fiable par les moteurs de recherche génératifs (ChatGPT, Perplexity, Gemini).
Style: dictionary
```
