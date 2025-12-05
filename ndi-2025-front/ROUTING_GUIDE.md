# Guide de Routing React Router
Ce guide explique comment ajouter, modifier ou supprimer des pages dans l'application NIRD.
## 📋 Table des matières
1. [Architecture du routing](#architecture-du-routing)
2. [Ajouter une nouvelle page](#ajouter-une-nouvelle-page)
3. [Modifier les liens de navigation](#modifier-les-liens-de-navigation)
4. [Supprimer une page](#supprimer-une-page)
5. [Bonnes pratiques](#bonnes-pratiques)
---
## Architecture du routing
L'application utilise **React Router v7** avec une configuration centralisée.
### Fichiers principaux
```
app/
├── routes.ts              # Configuration centralisée des routes
├── routes/                # Dossier contenant toutes les pages
│   ├── home.tsx          # Page d'accueil (/)
│   ├── about.tsx         # Page à propos (/about)
│   ├── elderly.tsx       # Page inclusion personnes âgées (/elderly)
│   ├── women.tsx         # Page femmes dans l'informatique (/women)
│   ├── chatbot.tsx       # Page chatbot (/chatbot)
│   ├── reconditioning.tsx # Page reconditionnement (/reconditioning)
|   └── nird.tsx
└── components/
    ├── Header.tsx         # Header avec logos
    ├── HeroSection.tsx    # Section héro avec zones interactives
    ├── Footer.tsx         # Footer
    └── PageLayout.tsx     # Layout réutilisable pour les pages
```
---
## Ajouter une nouvelle page
### Étape 1 : Créer le fichier de la page
Créez un nouveau fichier dans `app/routes/` :
```tsx
// app/routes/ma-nouvelle-page.tsx
import type { Route } from "./+types/ma-nouvelle-page";
import { PageLayout } from "../components/PageLayout";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ma Nouvelle Page - NIRD" },
    { name: "description", content: "Description de ma page" },
  ];
}
export default function MaNouvellePage() {
  return (
    <PageLayout>
      <h1 className="text-4xl font-bold mb-6">Ma Nouvelle Page</h1>
      <p className="text-lg">Contenu de ma page...</p>
    </PageLayout>
  );
}
```
### Étape 2 : Enregistrer la route
Ajoutez la route dans `app/routes.ts` :
```typescript
import { type RouteConfig, index, route } from "@react-router/dev/routes";
export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("elderly", "routes/elderly.tsx"),
  route("women", "routes/women.tsx"),
  route("chatbot", "routes/chatbot.tsx"),
  route("reconditioning", "routes/reconditioning.tsx"),
  route("ma-nouvelle-page", "routes/ma-nouvelle-page.tsx"), // ✨ Nouvelle route
] satisfies RouteConfig;
```
> 💡 **Note** : Le premier paramètre (`"ma-nouvelle-page"`) définit l'URL (`/ma-nouvelle-page`)
### Étape 3 : Ajouter un lien dans la navigation
#### Option A : Ajouter une zone interactive sur la page d'accueil
Modifiez `app/components/HeroSection.tsx` :
```tsx
const zones: Zone[] = [
  // ...zones existantes...
  {
    id: 'ma-nouvelle-page',
    label: 'Ma Nouvelle\nPage',
    position: 'top-[50%] right-[5%]', // Ajustez la position
    hoverColor: 'hover:bg-[#FF6B6B]/20' // Choisissez une couleur
  }
];
```
#### Option B : Ajouter un lien dans le Footer
Modifiez `app/components/Footer.tsx` :
```tsx
<Link to="/ma-nouvelle-page" className="hover:text-[#9F33E6] transition-colors">
  Ma Nouvelle Page
</Link>
```
---
## Modifier les liens de navigation
### Modifier les zones interactives de la page d'accueil
Éditez `app/components/HeroSection.tsx` :
```tsx
const zones: Zone[] = [
  {
    id: 'elderly',              // Route correspondante (sans le /)
    label: 'Inclusion\nPersonnes\nâgées', // Texte affiché (\n = retour à la ligne)
    position: 'top-[15%] right-[10%]',    // Position CSS
    hoverColor: 'hover:bg-[#F12FFD]/20'   // Couleur au survol
  },
  // ...
];
```
### Propriétés des zones :
- **`id`** : Correspond au nom de la route (sans le `/`)
- **`label`** : Texte affiché. Utilisez `\n` pour les retours à la ligne
- **`position`** : Classes Tailwind CSS pour positionner la zone (ex: `top-[15%] right-[10%]`)
- **`hoverColor`** : Classe Tailwind pour la couleur de survol (ex: `hover:bg-[#F12FFD]/20`)
---
## Supprimer une page
### Étape 1 : Supprimer la route
Supprimez la ligne correspondante dans `app/routes.ts` :
```typescript
export default [
  index("routes/home.tsx"),
  // route("chatbot", "routes/chatbot.tsx"), // ❌ Supprimée
  route("about", "routes/about.tsx"),
  // ...
] satisfies RouteConfig;
```
### Étape 2 : Supprimer le fichier
Supprimez le fichier de la page :
```bash
rm app/routes/chatbot.tsx
```
### Étape 3 : Retirer les liens de navigation
Supprimez la zone correspondante dans `app/components/HeroSection.tsx` :
```tsx
const zones: Zone[] = [
  // Supprimez l'objet avec id: 'chatbot'
  {
    id: 'elderly',
    label: 'Inclusion\nPersonnes\nâgées',
    // ...
  },
  // ...
];
```
---
## Bonnes pratiques
### 1. Utiliser PageLayout pour la cohérence
Toutes les pages (sauf la page d'accueil) doivent utiliser le composant `PageLayout` :
```tsx
import { PageLayout } from "../components/PageLayout";
export default function MaPage() {
  return (
    <PageLayout>
      {/* Votre contenu ici */}
    </PageLayout>
  );
}
```
Le `PageLayout` inclut automatiquement :
- Le Header avec les logos
- Le Footer avec les liens
- Un gradient de fond cohérent
- Un bouton "Retour à l'accueil"
### 2. Définir les métadonnées SEO
Utilisez toujours la fonction `meta` pour le référencement :
```tsx
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Titre de la page - NIRD" },
    { name: "description", content: "Description pour les moteurs de recherche" },
  ];
}
```
### 3. Convention de nommage des routes
- **Fichiers** : kebab-case (ex: `ma-nouvelle-page.tsx`)
- **Composants** : PascalCase (ex: `MaNouvellePage`)
- **URLs** : kebab-case (ex: `/ma-nouvelle-page`)
### 4. Structure d'une page type
```tsx
import type { Route } from "./+types/nom-page";
import { PageLayout } from "../components/PageLayout";
// Métadonnées SEO
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Titre - NIRD" },
    { name: "description", content: "Description" },
  ];
}
// Composant de la page
export default function NomPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Titre Principal</h1>
        <p className="text-lg mb-4">Contenu...</p>
      </div>
    </PageLayout>
  );
}
```
### 5. Chemins des images
Les images doivent être placées dans `/public/` et référencées depuis la racine :
```tsx
<img src="/mon-image.png" alt="Description" />
```
---
## Exemples rapides
### Exemple 1 : Remplacer la page "Chatbot" par "Contact"
1. Renommer le fichier :
   ```bash
   mv app/routes/chatbot.tsx app/routes/contact.tsx
   ```
2. Modifier `app/routes.ts` :
   ```typescript
   route("contact", "routes/contact.tsx"),
   ```
3. Modifier `app/components/HeroSection.tsx` :
   ```tsx
   {
     id: 'contact',
     label: 'Nous\ncontacter',
     position: 'bottom-[25%] right-[10%]',
     hoverColor: 'hover:bg-[#FFD700]/20'
   }
   ```
### Exemple 2 : Ajouter une page "Blog"
1. Créer `app/routes/blog.tsx` :
   ```tsx
   import type { Route } from "./+types/blog";
   import { PageLayout } from "../components/PageLayout";
   export function meta({}: Route.MetaArgs) {
     return [
       { title: "Blog - NIRD" },
       { name: "description", content: "Nos derniers articles" },
     ];
   }
   export default function Blog() {
     return (
       <PageLayout>
         <h1 className="text-4xl font-bold mb-6">Blog</h1>
         <p>Nos derniers articles...</p>
       </PageLayout>
     );
   }
   ```
2. Ajouter dans `app/routes.ts` :
   ```typescript
   route("blog", "routes/blog.tsx"),
   ```
3. Ajouter un lien dans `app/components/Footer.tsx` :
   ```tsx
   <Link to="/blog" className="hover:text-[#9F33E6] transition-colors">
     Blog
   </Link>
   ```
---
## 🆘 Besoin d'aide ?
- **Documentation React Router** : https://reactrouter.com/
- **Documentation Tailwind CSS** : https://tailwindcss.com/docs
---
## 📝 Notes importantes
- Les modifications dans `app/routes.ts` nécessitent un redémarrage du serveur de développement
- Les modifications dans les composants sont appliquées instantanément (hot reload)
- Toujours tester les liens après avoir ajouté/supprimé des routes
- Vérifier que les imports TypeScript sont corrects (ex: `import type { Route } from "./+types/ma-page"`)
