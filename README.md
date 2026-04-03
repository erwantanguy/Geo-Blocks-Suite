# GEO Blocks Suite

Plugin WordPress proposant des blocs Gutenberg optimisés pour le SEO et le GEO (Generative Engine Optimization), avec génération automatique de données structurées JSON-LD Schema.org.

## Version

**1.3.0**

## Auteur

Erwan Tanguy - [Ticoët](https://www.ticoet.fr/)

## Description

GEO Blocks Suite fournit 11 blocs Gutenberg conçus pour améliorer la visibilité de vos contenus auprès des moteurs de recherche traditionnels (Google, Bing) et des moteurs de recherche génératifs (ChatGPT, Perplexity, Claude, Gemini).

Chaque bloc génère automatiquement les données structurées Schema.org correspondantes, facilitant l'extraction et la citation de vos contenus par les IA.

---

## Vue d'ensemble des blocs

| Bloc | Schema.org | Impact GEO | Cas d'usage principal |
|------|------------|------------|----------------------|
| **TL;DR GEO** | `WebPageElement` | ⭐⭐⭐ | Résumé extractible en début d'article |
| **How-To GEO** | `HowTo` | ⭐⭐⭐ | Tutoriels, guides pas-à-pas |
| **Définition GEO** | `DefinedTerm` | ⭐⭐⭐ | Répondre à "Qu'est-ce que..." |
| **FAQ GEO** | `FAQPage` | ⭐⭐⭐ | Questions fréquentes |
| **Pros/Cons GEO** | `Review` | ⭐⭐ | Comparatifs, avis produits/services |
| **Stats GEO** | `Observation` | ⭐⭐ | Chiffres clés, données sourcées |
| **Author Box GEO** | `Person` | ⭐⭐ | Crédibilité E-E-A-T |
| **Blockquote GEO** | `Quotation` | ⭐⭐ | Citations d'experts |
| **Image GEO** | `ImageObject` | ⭐ | Images avec métadonnées complètes |
| **Video GEO** | `VideoObject` | ⭐⭐ | Vidéos enrichies |
| **Audio GEO** | `AudioObject` | ⭐ | Podcasts, audio |

---

## Recommandations par type de page

### Page d'accueil
- **Author Box GEO** : Présenter le fondateur/équipe
- **Stats GEO** : Chiffres clés de l'entreprise
- **FAQ GEO** : Questions fréquentes sur l'activité

### Article de blog
- **TL;DR GEO** : En tout début d'article (obligatoire pour GEO)
- **How-To GEO** : Si tutoriel ou guide
- **Définition GEO** : Pour les termes techniques
- **Blockquote GEO** : Citations d'experts
- **Image/Video GEO** : Médias enrichis
- **Author Box GEO** : En fin d'article

### Page produit/service
- **Pros/Cons GEO** : Avantages/inconvénients
- **Stats GEO** : Chiffres de performance
- **FAQ GEO** : Questions sur le produit

### Page de comparatif
- **Pros/Cons GEO** : Pour chaque option
- **Stats GEO** : Données comparatives
- **Définition GEO** : Expliquer les critères

---

## Blocs de contenu structuré

### TL;DR GEO

Résumé court (280 caractères max) en début d'article pour extraction rapide par les IA.

**Quand l'utiliser :**
- En tout début d'article de blog
- Pour résumer l'essentiel d'une page longue
- Avant un tutoriel complexe

**Options disponibles :**
| Option | Valeurs | Défaut |
|--------|---------|--------|
| Titre | "En bref", "TL;DR", "À retenir", "L'essentiel", "Résumé", personnalisé | "TL;DR" |
| Style | Bleu, Vert, Orange, Violet, Minimal | Bleu |
| Icône | Oui/Non | Oui |

**Bonnes pratiques GEO :**
- Maximum 280 caractères (limite Twitter = limite IA)
- Répondre directement à l'intention de recherche
- Inclure le mot-clé principal
- Éviter les formulations vagues

**JSON-LD généré :**
```json
{
  "@context": "https://schema.org",
  "@type": "WebPageElement",
  "name": "TL;DR",
  "abstract": "Résumé concis du contenu de la page..."
}
```

---

### How-To GEO

Tutoriel étape par étape avec durée estimée et niveau de difficulté.

**Quand l'utiliser :**
- Guides pratiques et tutoriels
- Recettes
- Procédures techniques
- Instructions d'installation

**Options disponibles :**
| Option | Description |
|--------|-------------|
| Titre du tutoriel | Nom du guide |
| Durée totale | Temps estimé (ex: "30 minutes") |
| Difficulté | Facile / Moyen / Difficile |
| Étapes | Liste réorganisable par glisser-déposer |
| Numérotation | Afficher les numéros d'étapes |

**Bonnes pratiques GEO :**
- Titre clair commençant par "Comment..."
- 3 à 10 étapes maximum
- Chaque étape = une action concrète
- Durée réaliste

**JSON-LD généré :**
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment créer un site WordPress",
  "totalTime": "PT30M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "EUR",
    "value": "0"
  },
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Choisir un hébergeur",
      "text": "Description détaillée de l'étape..."
    }
  ]
}
```

---

### Définition GEO

Définition de terme avec source optionnelle. Format optimisé pour les requêtes "Qu'est-ce que...".

**Quand l'utiliser :**
- Expliquer un terme technique
- Créer un glossaire
- Répondre aux requêtes définitionnelles

**Options disponibles :**
| Option | Description |
|--------|-------------|
| Terme | Le mot ou expression à définir |
| Définition | Explication complète |
| Source | Nom de la source (optionnel) |
| URL source | Lien vers la source (optionnel) |
| Style | Dictionnaire, Carte, Surligné, Minimal |

**Bonnes pratiques GEO :**
- Première phrase = définition directe
- 50-150 mots pour la définition
- Citer une source reconnue si possible
- Utiliser le terme exact dans la définition

**JSON-LD généré :**
```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "GEO",
  "description": "Le Generative Engine Optimization est l'optimisation des contenus pour les moteurs de recherche génératifs...",
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": "Glossaire SEO"
  }
}
```

---

### FAQ GEO

Questions/réponses en accordéon avec Schema.org FAQPage.

**Quand l'utiliser :**
- Section FAQ dédiée
- Questions fréquentes en fin d'article
- Page de support/aide

**Options disponibles :**
| Option | Description |
|--------|-------------|
| Nom de la FAQ | Titre pour le Schema.org (ex: "FAQ sur le GEO") |
| Questions/Réponses | Liste illimitée, réorganisable |
| Accordéon | Comportement ouvert/fermé |

**Bonnes pratiques GEO :**
- Questions naturelles (comment, pourquoi, quand...)
- Réponses complètes (50-300 mots)
- 5-10 questions par bloc
- Une seule FAQ par page (éviter les doublons Schema)

**JSON-LD généré :**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "name": "FAQ sur le GEO",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que le GEO ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le GEO (Generative Engine Optimization) est..."
      }
    }
  ]
}
```

---

## Blocs d'évaluation

### Pros/Cons GEO

Liste avantages/inconvénients avec Schema.org Review complet.

**Quand l'utiliser :**
- Avis sur un produit/service
- Comparatifs
- Tests et reviews

**Options disponibles :**
| Option | Description |
|--------|-------------|
| Titre | Titre du bloc (optionnel) |
| Label Avantages | "Avantages", "Points forts", personnalisé |
| Label Inconvénients | "Inconvénients", "Points faibles", personnalisé |
| Disposition | Côte à côte / Empilé |

**Options Schema.org (obligatoires pour validation Google) :**
| Option | Description |
|--------|-------------|
| Référence @id | URL#id d'une entité existante (ex: `https://site.com/page#software`) |
| Nom du produit/service | Requis si pas de référence @id |
| Type d'élément | Product, SoftwareApplication, Service, Organization, LocalBusiness, Book, Course, Event, Movie, CreativeWork |
| Nom de l'auteur | Personne qui émet l'avis |

**Bonnes pratiques GEO :**
- Toujours remplir les champs Schema.org
- Équilibrer avantages et inconvénients (crédibilité)
- 3-6 points par colonne
- Utiliser la référence @id si l'entité existe ailleurs sur la page

**JSON-LD généré :**
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "name": "Avantages et Inconvénients",
  "itemReviewed": {
    "@id": "https://site.com/page#software"
  },
  "author": {
    "@type": "Person",
    "name": "Erwan Tanguy"
  },
  "positiveNotes": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Interface intuitive" }
    ]
  },
  "negativeNotes": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Prix élevé" }
    ]
  }
}
```

---

### Stats GEO

Chiffre clé mis en avant avec source obligatoire.

**Quand l'utiliser :**
- Mettre en avant une statistique importante
- Données chiffrées citables
- Arguments quantitatifs

**Options disponibles :**
| Option | Description |
|--------|-------------|
| Valeur | Le chiffre (ex: "87") |
| Unité | %, €, M, k, personnalisé |
| Description | Ce que représente le chiffre |
| Source | Organisme/étude source |
| URL source | Lien vers la source |
| Année | Date de la donnée |
| Taille | Petit, Moyen, Grand |
| Style | Bleu, Violet, Vert, Rouge, Minimal |

**Bonnes pratiques GEO :**
- Toujours citer la source
- Données récentes (< 2 ans)
- Un seul chiffre par bloc (clarté)
- Description contextualisante

**JSON-LD généré :**
```json
{
  "@context": "https://schema.org",
  "@type": "Observation",
  "name": "Taux de conversion e-commerce",
  "value": {
    "@type": "QuantitativeValue",
    "value": 87,
    "unitText": "%"
  },
  "observationDate": "2026",
  "measuredProperty": "Taux de conversion",
  "observedNode": {
    "@type": "Organization",
    "name": "INSEE"
  }
}
```

---

## Blocs E-E-A-T

### Author Box GEO

Encart auteur avec photo, bio et liens sociaux pour renforcer l'E-E-A-T.

**Quand l'utiliser :**
- En fin d'article de blog
- Page "À propos"
- Signatures d'experts

**Options disponibles :**
| Option | Description |
|--------|-------------|
| Photo | Depuis la médiathèque |
| Nom | Nom complet de l'auteur |
| Titre/Fonction | Poste, expertise |
| Biographie | Description courte (2-3 phrases) |
| Site web | URL personnelle |
| LinkedIn | Profil LinkedIn |
| Twitter/X | Compte Twitter |
| Email | Adresse de contact |
| Style | Classique, Carte, Minimal, Horizontal |

**Bonnes pratiques GEO :**
- Photo professionnelle
- Titre précis (expertise reconnue)
- Bio orientée crédibilité
- Liens vérifiables (LinkedIn important)

**JSON-LD généré :**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Erwan Tanguy",
  "jobTitle": "Consultant SEO/GEO",
  "description": "Expert en optimisation pour les moteurs génératifs...",
  "image": "https://site.com/photo.jpg",
  "url": "https://ticoet.fr",
  "sameAs": [
    "https://linkedin.com/in/erwantanguy",
    "https://twitter.com/erwantanguy"
  ]
}
```

---

### Blockquote GEO

Citation avec auteur et source pour renforcer la crédibilité.

**Quand l'utiliser :**
- Citation d'expert
- Témoignage client
- Référence à une étude

**Options disponibles :**
| Option | Description |
|--------|-------------|
| Citation | Texte de la citation |
| Auteur | Nom de la personne citée |
| Fonction | Titre/poste de l'auteur |
| Source | Nom de la source (livre, article...) |
| URL | Lien vers la source |

**Bonnes pratiques GEO :**
- Citations courtes (< 300 caractères)
- Auteurs reconnus dans le domaine
- Source vérifiable
- Pertinence avec le contenu

**JSON-LD généré :**
```json
{
  "@context": "https://schema.org",
  "@type": "Quotation",
  "text": "Le contenu est roi, mais le contexte est le royaume.",
  "author": {
    "@type": "Person",
    "name": "Gary Vaynerchuk",
    "jobTitle": "Entrepreneur"
  },
  "isBasedOn": {
    "@type": "CreativeWork",
    "name": "Crushing It!",
    "url": "https://exemple.com/source"
  }
}
```

---

## Blocs médias

### Image GEO

Image avec métadonnées complètes et Schema.org ImageObject.

**Quand l'utiliser :**
- Images importantes dans le contenu
- Infographies
- Photos avec droits d'auteur

**Options disponibles :**
| Option | Description |
|--------|-------------|
| Image | Depuis la médiathèque |
| Titre | Nom de l'image |
| Description | Alt text détaillé |
| Légende | Texte sous l'image |
| Licence | URL Creative Commons ou autre |
| Crédit (creditText) | Mention du photographe/créateur |
| Copyright (copyrightNotice) | Notice de droits (ex: "© 2026 Ticoët") |
| Page d'acquisition (acquireLicensePage) | URL pour acheter/obtenir la licence |
| Nom du créateur | Nom de l'auteur de l'image |

**Bonnes pratiques GEO :**
- Description alt détaillée (pas juste "image")
- Toujours créditer le créateur
- Licence explicite (Creative Commons recommandé)
- Noms de fichiers descriptifs

**JSON-LD généré :**
```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "name": "Dashboard GEO Bot Monitor",
  "description": "Capture d'écran du tableau de bord montrant les statistiques de crawl IA",
  "caption": "Interface principale de GEO Bot Monitor",
  "contentUrl": "https://site.com/image.webp",
  "license": "https://creativecommons.org/licenses/by-sa/4.0/",
  "creditText": "Erwan Tanguy",
  "copyrightNotice": "© 2026 Ticoët",
  "acquireLicensePage": "https://ticoet.fr/contact",
  "creator": {
    "@type": "Person",
    "name": "Erwan Tanguy"
  }
}
```

---

### Video GEO

Vidéo avec durée, thumbnail et métadonnées enrichies.

**Quand l'utiliser :**
- Vidéos YouTube/Vimeo embarquées
- Vidéos hébergées localement
- Tutoriels vidéo

**Options disponibles :**
| Option | Description |
|--------|-------------|
| URL vidéo | YouTube, Vimeo ou fichier local |
| Titre | Nom de la vidéo |
| Description | Résumé du contenu |
| Durée | Format ISO 8601 (PT5M30S) |
| Thumbnail | Image de prévisualisation |
| Transcription | Texte intégral (optionnel) |
| Date de publication | Date de mise en ligne |

**Bonnes pratiques GEO :**
- Titre descriptif avec mot-clé
- Thumbnail personnalisée
- Transcription pour accessibilité + GEO
- Durée précise

**JSON-LD généré :**
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Tutoriel GEO Blocks Suite",
  "description": "Comment utiliser les blocs GEO pour optimiser vos contenus",
  "contentUrl": "https://youtube.com/watch?v=xxxxx",
  "thumbnailUrl": "https://site.com/thumbnail.jpg",
  "duration": "PT5M30S",
  "uploadDate": "2026-04-01",
  "transcript": "Bienvenue dans ce tutoriel..."
}
```

---

### Audio GEO

Audio/Podcast avec métadonnées complètes.

**Quand l'utiliser :**
- Épisodes de podcast
- Interviews audio
- Fichiers MP3 embarqués

**Options disponibles :**
| Option | Description |
|--------|-------------|
| Fichier audio | MP3, OGG, WAV |
| Titre | Nom de l'épisode |
| Description | Résumé du contenu |
| Durée | Format ISO 8601 |
| Transcription | Texte intégral (recommandé) |
| Date de publication | Date de mise en ligne |

**Bonnes pratiques GEO :**
- Transcription complète (essentiel pour GEO)
- Titre avec mots-clés
- Description riche

**JSON-LD généré :**
```json
{
  "@context": "https://schema.org",
  "@type": "AudioObject",
  "name": "Podcast GEO #12 - L'avenir du SEO",
  "description": "Discussion sur l'impact des IA génératives sur le référencement",
  "contentUrl": "https://site.com/podcast-12.mp3",
  "duration": "PT45M",
  "transcript": "Transcription complète de l'épisode..."
}
```

---

## Installation

1. Télécharger le dossier `geo-blocks-suite`
2. Le placer dans `/wp-content/plugins/`
3. Activer le plugin dans l'administration WordPress
4. Les blocs sont disponibles dans l'éditeur Gutenberg (rechercher "GEO")

## Compatibilité

- WordPress 6.0+
- PHP 7.4+
- Éditeur Gutenberg (bloc natif)
- Compatible avec : Yoast, Rank Math, SEOPress, All in One SEO

## Validation

Testez vos données structurées :
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

---

## Changelog

### 1.3.0
- Amélioration : Pros/Cons GEO - Support référence @id pour itemReviewed
- Amélioration : Pros/Cons GEO - Champs author et itemReviewed obligatoires
- Amélioration : Image GEO - Champs creditText, copyrightNotice, acquireLicensePage, creator
- Amélioration : FAQ GEO - Champ faqName pour nommer la FAQ
- Correction : Accents dans les labels (Inconvénients)
- Documentation : README complet pour utilisation par IA

### 1.2.0
- Ajout : How-To GEO
- Ajout : Définition GEO
- Ajout : Pros/Cons GEO
- Ajout : Author Box GEO
- Ajout : Stats GEO

### 1.1.0
- Ajout : TL;DR GEO

### 1.0.1
- Ajout : Audio GEO
- Corrections mineures

### 1.0.0
- Version initiale
- Blocs : Blockquote GEO, FAQ GEO, Image GEO, Video GEO

---

## Licence

GPL2+

## Support

Pour toute question ou suggestion : [ticoet.fr](https://www.ticoet.fr/)

---

## Guide IA : Optimisation de contenu avec GEO Blocks

### Checklist par type de contenu

**Article informatif :**
- [ ] TL;DR GEO en début d'article
- [ ] Définition GEO pour les termes clés
- [ ] Image GEO avec métadonnées complètes
- [ ] FAQ GEO pour les questions connexes
- [ ] Author Box GEO en fin d'article

**Tutoriel/Guide :**
- [ ] TL;DR GEO résumant l'objectif
- [ ] How-To GEO avec étapes détaillées
- [ ] Image/Video GEO pour illustrer
- [ ] Stats GEO pour les données chiffrées
- [ ] Author Box GEO (crédibilité technique)

**Page produit/service :**
- [ ] Pros/Cons GEO avec review complet
- [ ] Stats GEO pour les performances
- [ ] FAQ GEO sur le produit
- [ ] Blockquote GEO (témoignages)

**Comparatif :**
- [ ] TL;DR GEO avec conclusion rapide
- [ ] Définition GEO des critères
- [ ] Pros/Cons GEO par option
- [ ] Stats GEO comparatives

### Priorités d'implémentation

1. **Essentiel** : TL;DR + FAQ + Author Box
2. **Recommandé** : How-To (si tutoriel) + Définition (si termes techniques)
3. **Complémentaire** : Pros/Cons + Stats + Blockquote
4. **Médias** : Image/Video/Audio selon contenu
