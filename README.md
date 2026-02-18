# GEO Blocks Suite

Plugin WordPress proposant des blocs Gutenberg optimisés pour le SEO et le GEO (Generative Engine Optimization), avec génération automatique de données structurées JSON-LD Schema.org.

## Version

**1.2.0**

## Auteur

Erwan Tanguy - [Ticoët](https://www.ticoet.fr/)

## Description

GEO Blocks Suite fournit 11 blocs Gutenberg conçus pour améliorer la visibilité de vos contenus auprès des moteurs de recherche traditionnels (Google, Bing) et des moteurs de recherche génératifs (ChatGPT, Perplexity, Claude, Gemini).

Chaque bloc génère automatiquement les données structurées Schema.org correspondantes, facilitant l'extraction et la citation de vos contenus par les IA.

## Blocs disponibles

### Blocs de contenu structuré

| Bloc | Description | Schema.org |
|------|-------------|------------|
| **TL;DR GEO** | Résumé court (280 car. max) pour extraction rapide par les IA | `WebPageElement` + `abstract` |
| **How-To GEO** | Tutoriel étape par étape avec durée et difficulté | `HowTo` + `HowToStep` |
| **Définition GEO** | Définition de terme avec source optionnelle | `DefinedTerm` |
| **FAQ GEO** | Questions/réponses en accordéon | `FAQPage` + `Question` |

### Blocs d'évaluation

| Bloc | Description | Schema.org |
|------|-------------|------------|
| **Pros/Cons GEO** | Liste avantages/inconvénients | `Review` + `positiveNotes`/`negativeNotes` |
| **Stats GEO** | Chiffre clé mis en avant avec source | `Observation` |

### Blocs E-E-A-T

| Bloc | Description | Schema.org |
|------|-------------|------------|
| **Author Box GEO** | Encart auteur avec photo, bio et liens sociaux | `Person` + `sameAs` |
| **Blockquote GEO** | Citation avec auteur et source | `Quotation` + `Person` |

### Blocs médias

| Bloc | Description | Schema.org |
|------|-------------|------------|
| **Image GEO** | Image avec légende et métadonnées enrichies | `ImageObject` |
| **Video GEO** | Vidéo avec durée, thumbnail et transcription | `VideoObject` |
| **Audio GEO** | Audio/Podcast avec métadonnées | `AudioObject` |

## Installation

1. Télécharger le dossier `geo-blocks-suite`
2. Le placer dans `/wp-content/plugins/`
3. Activer le plugin dans l'administration WordPress
4. Les blocs sont disponibles dans l'éditeur Gutenberg (rechercher "GEO")

## Utilisation

### TL;DR GEO

Idéal en début d'article pour résumer l'essentiel en 1-3 phrases.

**Options :**
- Titre : "En bref", "TL;DR", "À retenir", "L'essentiel", "Résumé" ou personnalisé
- Styles : Bleu, Vert, Orange, Violet, Minimal
- Icône : Affichage optionnel

**Conseil GEO :** Moins de 280 caractères pour une extraction optimale.

### How-To GEO

Pour les tutoriels et guides pratiques.

**Options :**
- Durée totale estimée
- Niveau de difficulté (Facile/Moyen/Difficile)
- Étapes réorganisables par glisser-déposer
- Numérotation optionnelle

### Définition GEO

Pour répondre aux requêtes "Qu'est-ce que...".

**Options :**
- Terme à définir
- Définition complète
- Source et URL (optionnels)
- Styles : Dictionnaire, Carte, Surligné, Minimal

### FAQ GEO

Pour les sections questions fréquentes.

**Options :**
- Questions/réponses illimitées
- Accordéon interactif
- Réorganisation par glisser-déposer

### Pros/Cons GEO

Pour les comparatifs et avis.

**Options :**
- Listes avantages/inconvénients dynamiques
- Disposition : Côte à côte ou empilé
- Labels personnalisables

### Stats GEO

Pour mettre en avant un chiffre clé.

**Options :**
- Valeur et unité (%, €, M, etc.)
- Description
- Source, URL et année
- Tailles : Petit, Moyen, Grand
- Styles : Bleu, Violet, Vert, Rouge, Minimal

### Author Box GEO

Pour renforcer l'E-E-A-T (Expertise, Experience, Authoritativeness, Trustworthiness).

**Options :**
- Photo depuis la médiathèque
- Nom, titre/fonction, biographie
- Liens : Site web, LinkedIn, Twitter, Email
- Styles : Classique, Carte, Minimal, Horizontal

### Blockquote GEO

Pour les citations avec attribution.

**Options :**
- Texte de la citation
- Auteur et sa fonction
- Source et URL

### Image GEO / Video GEO / Audio GEO

Pour les médias enrichis avec métadonnées complètes.

## Données structurées générées

Chaque bloc génère automatiquement un script JSON-LD dans le HTML :

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment créer un site WordPress",
  "step": [...]
}
</script>
```

Ces données sont lisibles par :
- Google Search Console
- Bing Webmaster Tools
- Les crawlers IA (GPTBot, ClaudeBot, PerplexityBot, etc.)

## Compatibilité

- WordPress 6.0+
- PHP 7.4+
- Éditeur Gutenberg (bloc natif)

## Changelog

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

## Licence

GPL2+

## Support

Pour toute question ou suggestion : [ticoet.fr](https://www.ticoet.fr/)
