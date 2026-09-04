# GEO Blocks Suite — Fiche rédactionnelle

> **Plugin WordPress** — Blocs Gutenberg optimisés pour le **SEO**, l’**AEO** (Answer Engine Optimization) et le **GEO** (Generative Engine Optimization).

---

## Téléchargement

- **Version actuelle :** 1.3.2
- **Fichier ZIP :** [https://dl.ticoet.me/downloads/pluginsWP/geo-blocks-suite/geo-blocks-suite.zip](https://dl.ticoet.me/downloads/pluginsWP/geo-blocks-suite/geo-blocks-suite.zip)
- **Mise à jour :** automatique via le tableau de bord WordPress (plugin-update-checker)

---

## Qu’est-ce que GEO Blocks Suite ?

**GEO Blocks Suite** ajoute à Gutenberg une collection de blocs de contenu structurés. Chaque bloc génère un balisage HTML sémantique **et** un bloc JSON-LD Schema.org correspondant.

Contrairement aux blocs natifs de WordPress, ces blocs sont conçus pour être **lus, compris et cités** par les moteurs de recherche classiques **et** les IA génératives (ChatGPT, Claude, Perplexity, Gemini, etc.).

---

## Pourquoi ce plugin est utile pour SEO / AEO / GEO

| Objectif | Comment GEO Blocks Suite aide |
|---|---|
| **SEO classique** | JSON-LD Schema.org + balisage sémantique = meilleure compréhension par Google |
| **AEO** | Réponses structurées (FAQ, How-To, Définition) = plus de chances d’apparaître en position zéro |
| **GEO** | Contenus citationnables (stats, témoignages, pros/cons, citations) = sources fiables pour les IA |
| **Core Web Vitals** | Images avec `width`/`height`, vidéos optimisées = moins de CLS |
| **E-E-A-T** | Auteur, sources, licences, avis = renforce la crédibilité du contenu |

---

## Les blocs disponibles

### 1. TL;DR GEO
- **But :** résumer un contenu en quelques lignes.
- **Intérêt GEO :** les IA aiment les résumés explicites pour citer ou reformuler.
- **Schema.org :** pas de type dédié, mais balisage sémantique fort.

### 2. How-To GEO
- **But :** décomposer une procédure en étapes.
- **Intérêt AEO :** déclenche les rich snippets "HowTo" dans Google.
- **Schema.org :** `HowTo`, `HowToStep`.

### 3. FAQ GEO
- **But :** questions / réponses structurées.
- **Intérêt AEO :** rich snippet FAQ très courant.
- **Schema.org :** `FAQPage`, `Question`, `Answer`.

### 4. Definition GEO
- **But :** définir un terme.
- **Intérêt AEO :** cible les requêtes "Qu'est-ce que...".
- **Schema.org :** `DefinedTerm`.

### 5. Pros / Cons GEO
- **But :** lister avantages et inconvénients.
- **Intérêt GEO :** format très citable par les IA comparatives.
- **Schema.org :** `ItemList`.

### 6. Stats GEO
- **But :** mettre en avant un chiffre clé.
- **Intérêt GEO :** chiffres et statistiques sont fréquemment cités par les IA.
- **Schema.org :** `Observation`.

### 7. Author Box GEO
- **But :** présenter l’auteur de l’article.
- **Intérêt E-E-A-T :** renforce l’expertise et l’autorité.
- **Schema.org :** `Person`.

### 8. Blockquote GEO
- **But :** citation structurée avec source.
- **Intérêt GEO :** citations = sources crédibles pour les IA.
- **Schema.org :** `Quotation`.

### 9. Témoignage GEO *(nouveau en v1.3.2)*
- **But :** avis client structuré.
- **Intérêt SEO/GEO :** renforce la confiance, source de contenu citationnable.
- **Schema.org :** `Review` (avec note) ou `Recommendation` (sans note).

### 10. Image GEO
- **But :** image avec métadonnées complètes.
- **Intérêt SEO :** JSON-LD `ImageObject` + dimensions `width`/`height` pour éviter le CLS.
- **Schema.org :** `ImageObject`.

### 11. Video GEO
- **But :** vidéo avec métadonnées.
- **Intérêt SEO :** JSON-LD `VideoObject` avec `uploadDate`, `duration`, `thumbnailUrl`.
- **Spécificité iOS :** `playsinline`, `preload="metadata"`, fragment `#t=0.001` pour forcer l’aperçu sur iPhone.
- **Schema.org :** `VideoObject`.

### 12. Audio GEO
- **But :** fichier audio avec métadonnées.
- **Intérêt SEO :** JSON-LD `AudioObject`.
- **Schema.org :** `AudioObject`.

---

## Mise à jour automatique

Le plugin intègre **plugin-update-checker**. Dès qu’une nouvelle version est publiée sur `dl.ticoet.me`, WordPress affiche la mise à jour dans :

**Tableau de bord → Mises à jour**

Le processus est identique à celui d’un plugin WordPress.org : un clic suffit.

---

## Installation

1. Télécharger le ZIP : [geo-blocks-suite.zip](https://dl.ticoet.me/downloads/pluginsWP/geo-blocks-suite/geo-blocks-suite.zip)
2. Dans WordPress : **Extensions → Ajouter → Téléverser une extension**
3. Sélectionner le ZIP et activer le plugin
4. Les blocs apparaissent dans l’éditeur Gutenberg, catégorie **Texte**

---

## Exemple d’utilisation concrète

Sur la page d’un karting indoor, on peut composer l’article avec :

- **TL;DR** en haut de page
- **Stats** : *600m de piste couverte*
- **How-To** : *Comment réserver une session ?*
- **FAQ** : *Quel âge minimum ?*
- **Témoignage** : avis client avec note
- **Image** : photo de la piste avec `width`/`height`
- **Video** : bande-annonce avec `uploadDate`
- **Author Box** : présentation de l’auteur

Résultat : une page riche, structurée, facilement exploitable par Google et les IA.

---

## Compatibilité

- **WordPress :** 6.0+
- **PHP :** 7.4+
- **Éditeur :** Gutenberg (blocs natifs)

---

## À qui s’adresse ce plugin ?

- Agences SEO / AEO / GEO
- Référenceurs et content managers
- Sites locaux (commerce, restaurant, loisirs)
- Sites de contenu voulant structurer leurs informations pour les IA

---

## Auteur

**Erwan Tanguy — Ticoët**
- Site : [https://www.ticoet.fr/](https://www.ticoet.fr/)
- Téléchargement : [https://dl.ticoet.me/downloads/pluginsWP/geo-blocks-suite/](https://dl.ticoet.me/downloads/pluginsWP/geo-blocks-suite/)
