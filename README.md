# Geo-Blocks-Suite

![WordPress Plugin](https://img.shields.io/badge/WordPress-Plugin-blue)
![Version](https://img.shields.io/badge/version-2.1.9-green)
![License](https://img.shields.io/badge/license-GPL2%2B-orange)
![Gutenberg](https://img.shields.io/badge/Gutenberg-Compatible-blueviolet)

> **Blocs Gutenberg optimisés pour le GEO (Generative Engine Optimization) avec génération automatique de JSON-LD Schema.org**

Enrichissez vos contenus WordPress avec des médias structurés que les moteurs d'IA (ChatGPT, Claude, Perplexity) peuvent facilement comprendre, indexer et citer.

---

## 🎯 Objectifs

- 📊 **Structurer** le contenu multimédia pour les IA génératives
- 🤖 **Générer automatiquement** du JSON-LD Schema.org pour chaque média
- 🔍 **Améliorer la visibilité** dans les résultats des moteurs IA
- 💬 **Faciliter les citations** par les assistants conversationnels
- ⚖️ **Respecter les licences** et attributions des contenus

---

## 🧩 Les 3 blocs disponibles

| Bloc | Type Schema.org | Fonctionnalités clés |
|------|----------------|---------------------|
| **ImageGEO** | `ImageObject` | Upload, métadonnées, lightbox, alt automatique |
| **VideoGEO** | `VideoObject` | Hébergement local ou YouTube/Vimeo, embed auto |
| **AudioGEO** | `AudioObject` | Upload audio, transcription, lecteur intégré |

---

## 🖼️ ImageGEO

### Objectif
Ajouter des images avec métadonnées complètes et JSON-LD automatique.

### Fonctionnalités

- ✅ Upload ou sélection depuis la médiathèque WordPress
- ✅ **Champs métadonnées** :
  - **Titre** (`name`)
  - **Description** (`description`) → attribut `alt`
  - **Légende** (`caption`)
  - **Licence** (`license`) - URL Creative Commons
- ✅ **Lightbox intégrée** pour affichage plein écran
- ✅ **JSON-LD ImageObject** généré automatiquement

### Structure HTML générée

```html
<figure class="geo-media geo-image">
    <a href="[URL_FULL]" class="geo-lightbox" data-geo-src="[URL_FULL]">
        <img src="[URL_THUMB]" alt="[DESCRIPTION]">
    </a>
    <figcaption>[LÉGENDE]</figcaption>
</figure>

<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "name": "Titre de l'image",
    "description": "Description",
    "caption": "Légende",
    "contentUrl": "https://example.com/image.jpg",
    "license": "https://creativecommons.org/licenses/by-sa/4.0/"
}
</script>
```

### ✨ Bonnes pratiques

- ✅ Toujours remplir le champ **Description** (utilisé pour `alt`)
- ✅ Ajouter une **Licence** explicite (Creative Commons recommandé)
- ✅ Utiliser des images optimisées (WebP privilégié)
- ✅ Ajouter une légende descriptive pour le contexte

---

## 🎥 VideoGEO

### Objectif
Intégrer des vidéos (hébergées ou externes) avec métadonnées Schema.org.

### Fonctionnalités

- ✅ **Upload vidéo** directement sur WordPress
- ✅ **Vidéos externes** : YouTube, Vimeo (détection automatique)
- ✅ **Champs métadonnées** :
  - **Titre** (`name`)
  - **Description** (`description`)
  - **Licence** (`license`)
- ✅ **JSON-LD VideoObject** généré automatiquement
- ✅ **Conversion automatique** des URLs YouTube/Vimeo en embed

### Structure HTML générée

```html
<!-- Vidéo hébergée -->
<figure class="geo-media geo-video">
    <video src="[URL]" controls></video>
    <figcaption>[TITRE]</figcaption>
</figure>

<!-- Vidéo externe (YouTube/Vimeo) -->
<figure class="geo-media geo-video">
    <iframe src="https://youtube.com/embed/[ID]" allowfullscreen></iframe>
    <figcaption>[TITRE]</figcaption>
</figure>

<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Titre de la vidéo",
    "description": "Description",
    "contentUrl": "https://example.com/video.mp4",
    "license": "https://creativecommons.org/licenses/by-sa/4.0/"
}
</script>
```

### 📹 Formats supportés

| Type | Formats |
|------|---------|
| **Hébergement local** | MP4, WebM, OGG |
| **YouTube** | URL standard ou `youtu.be` (conversion auto) |
| **Vimeo** | URL standard (conversion auto en player) |

### ✨ Bonnes pratiques

- ✅ Privilégier les **vidéos externes** (YouTube/Vimeo) pour économiser la bande passante
- ✅ Toujours remplir **Titre et Description** pour le référencement
- ✅ Indiquer la **Licence** même pour YouTube (CC BY, etc.)

---

## 🎧 AudioGEO

### Objectif
Intégrer des fichiers audio avec métadonnées complètes et transcription optionnelle.

### Fonctionnalités

- ✅ Upload de fichiers audio (MP3, OGG, WAV)
- ✅ **Champs métadonnées** :
  - **Titre** (`name`)
  - **Description** (`description`)
  - **Licence** (`license`)
  - **Transcription** (`transcript`) - Texte intégral
- ✅ **JSON-LD AudioObject** généré automatiquement
- ✅ Affichage de la transcription sous le lecteur

### Structure HTML générée

```html
<figure class="geo-media geo-audio">
    <audio src="[URL]" controls style="width: 100%;"></audio>
    <figcaption>[TITRE]</figcaption>
</figure>

<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "AudioObject",
    "name": "Titre de l'audio",
    "description": "Description",
    "contentUrl": "https://example.com/audio.mp3",
    "license": "https://creativecommons.org/licenses/by-sa/4.0/",
    "transcript": "Texte intégral de l'enregistrement..."
}
</script>
```

### ✨ Bonnes pratiques

- ✅ **Toujours ajouter une transcription** : essentiel pour accessibilité et GEO
- ✅ Utiliser le format **MP3** (meilleure compatibilité)
- ✅ Indiquer la **Licence** et les crédits (auteur, compositeur)
- ✅ Optimiser qualité/poids (128-192 kbps pour la voix)

---

## ⚙️ Fonctionnalités techniques

### 🤖 Génération automatique de JSON-LD

Chaque bloc génère son propre **script JSON-LD Schema.org** dans le contenu :

- ✅ **Indexation optimale** par les moteurs de recherche
- ✅ **Compréhension précise** par les IA génératives
- ✅ **Attribution correcte** des licences et crédits
- ✅ **Rich Snippets** dans les résultats Google

### 🖼️ Lightbox pour les images

Lightbox JavaScript intégrée sans dépendance externe :

- Navigation clavier (flèches, Échap)
- Responsive design
- Accessibilité WCAG

### 🎨 Styles globaux

CSS automatiquement chargé pour :

- Mise en forme cohérente des médias
- Responsive design
- Accessibilité (contraste, taille de police)

---

## 🔗 Intégration avec GEO Authority Suite

Les blocs MediaGEO sont **automatiquement détectés** par l'audit de contenu :

| Média | Impact GEO | Points |
|-------|-----------|--------|
| **Images** | Moyen | +15 max |
| **Vidéos** | Élevé | +10 |
| **Audio** | Faible | +5 |

### Classes CSS détectées

```css
.geo-image  /* Images MediaGEO */
.geo-video  /* Vidéos MediaGEO */
.geo-audio  /* Audio MediaGEO */
```

---

## 🚀 Workflow d'utilisation

### 1️⃣ Ajouter un bloc MediaGEO

1. Dans Gutenberg, cliquer sur **+** (Ajouter un bloc)
2. Rechercher **"GEO"** ou le type de média
3. Sélectionner **ImageGEO**, **VideoGEO** ou **AudioGEO**

### 2️⃣ Uploader le média

- **Upload** : Glisser-déposer ou parcourir
- **Médiathèque** : Sélectionner fichier existant
- **URL externe** : Pour YouTube/Vimeo (VideoGEO uniquement)

### 3️⃣ Remplir les métadonnées

| Champ | Description |
|-------|-------------|
| **Titre** | Nom explicite du média |
| **Description** | Contexte, contenu, auteur |
| **Licence** | URL Creative Commons |
| **Transcription** | Texte intégral (AudioGEO) |

### 4️⃣ Publier

- ✅ JSON-LD généré automatiquement en front-end
- ✅ Média comptabilisé dans l'**audit GEO**
- ✅ Contenu structuré citatable par les IA

---

## 📈 Avantages pour le GEO

### 1. Citations précises par les IA

Les métadonnées permettent aux IA de :
- ✅ Comprendre le **contexte exact** du média
- ✅ Attribuer correctement la **source et l'auteur**
- ✅ Respecter les **licences** lors des citations

### 2. Amélioration du score GEO

| Type d'article | Score GEO |
|---------------|-----------|
| Sans média | ≤ 50 |
| FAQ + Citations + Médias | ≥ 80 |

### 3. Référencement enrichi

- 🎯 **Rich Snippets** (images, vidéos)
- 📊 Amélioration du **CTR** (taux de clic)
- 🏆 Valorisation dans les **Knowledge Panels** Google

### 4. Accessibilité

- ♿ Attributs **alt** automatiques pour images
- 📝 **Transcriptions** pour contenus audio
- 🏗️ Structure sémantique **HTML5** (`<figure>`, `<figcaption>`)

---

## 🛠️ Compatibilité

### Prérequis

- **WordPress** : 5.8+
- **PHP** : 7.4+
- **Éditeur** : Gutenberg activé

### Compatibilité testée

| Catégorie | Compatible |
|-----------|-----------|
| **Thèmes** | Tous les thèmes Gutenberg |
| **Plugins SEO** | Yoast, Rank Math, All in One SEO |
| **Médias** | Médiathèque WordPress native |

---

## ⚖️ Licences recommandées

Pour le GEO, privilégier les **licences ouvertes** :

| Licence | URL | Usage |
|---------|-----|-------|
| **CC BY 4.0** | [creativecommons.org/licenses/by/4.0/](https://creativecommons.org/licenses/by/4.0/) | Attribution simple |
| **CC BY-SA 4.0** | [creativecommons.org/licenses/by-sa/4.0/](https://creativecommons.org/licenses/by-sa/4.0/) | Partage à l'identique |
| **CC BY-NC 4.0** | [creativecommons.org/licenses/by-nc/4.0/](https://creativecommons.org/licenses/by-nc/4.0/) | Non commercial |
| **CC0** | [publicdomain/zero/1.0/](https://creativecommons.org/publicdomain/zero/1.0/) | Domaine public |

---

## 🚀 Installation

1. Téléchargez le plugin depuis ce dépôt
2. Uploadez dans `/wp-content/plugins/`
3. Activez depuis **Extensions > Extensions installées**
4. Les blocs apparaissent automatiquement dans Gutenberg

---

## 📚 Ressources

- [Schema.org ImageObject](https://schema.org/ImageObject)
- [Schema.org VideoObject](https://schema.org/VideoObject)
- [Schema.org AudioObject](https://schema.org/AudioObject)
- [Creative Commons Licenses](https://creativecommons.org/licenses/)
- [Schema.org Validator](https://validator.schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## 👨‍💻 Auteur

**Erwan Tanguy - Ticoët**  
🌐 [ticoet.fr](https://www.ticoet.fr/)

---

## 📝 Licence

GPL2+  
Distribué sous licence GNU General Public License v2 ou ultérieure.

---

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Committez (`git commit -m 'Ajout fonctionnalité'`)
4. Pushez (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

---

## 🐛 Support

- 📋 [Issues GitHub](../../issues)
- 🌐 Contact : [ticoet.fr](https://www.ticoet.fr/)

---

## 📊 Changelog

### Version 2.1.9
- ✅ Blocs ImageGEO, VideoGEO, AudioGEO opérationnels
- ✅ Génération JSON-LD automatique
- ✅ Lightbox intégrée pour images
- ✅ Détection automatique YouTube/Vimeo
- ✅ Support des transcriptions audio
- ✅ Intégration GEO Authority Suite

---

## 🏆 Pourquoi MediaGEO ?

> **"Les IA génératives indexent mieux le contenu structuré"**

En ajoutant des métadonnées Schema.org à vos médias, vous :
- 📈 Augmentez vos chances d'être **cité par ChatGPT, Claude, Perplexity**
- 🎯 Améliorez votre **ranking dans les résultats IA**
- ⚖️ Garantissez le **respect des licences** de vos contenus
- ♿ Rendez votre site plus **accessible** (alt, transcriptions)

**MediaGEO = Votre contenu multimédia optimisé pour l'ère de l'IA** 🚀
