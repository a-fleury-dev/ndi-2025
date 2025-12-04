# 🚀 Nuit de l'Info 2025

Projet développé dans le cadre de la **Nuit de l'Info 2025** - Un événement de développement web collaboratif.

## 📁 Structure du projet

Le projet est composé de deux parties principales :

```
ndi-2025/
├── ndi-2025-front/    # Application React (React Router 7 + TypeScript)
└── ndi-2025-back/     # Backend Java Spring Boot + Keycloak
    ├── auth-service/  # Service d'authentification
    └── keycloak/      # Configuration Keycloak
```

## 🛠️ Installation et lancement

### Prérequis
- Node.js (v18+)
- Java 17+
- Docker & Docker Compose
- Maven

### 1️⃣ Lancer le backend

```bash
cd ndi-2025-back

# Démarrer les services (PostgreSQL + Keycloak)
docker-compose up -d

# Compiler et lancer le service d'authentification
cd auth-service
mvn clean install
mvn spring-boot:run
```

### 2️⃣ Lancer le frontend

```bash
cd ndi-2025-front

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📝 Règles Git

### Création de branches

Toujours créer une branche depuis `main` avec un préfixe descriptif :

- `feat/...` : Nouvelle fonctionnalité
- `fix/...` : Correction de bug
- `refactor/...` : Refactorisation du code
- `docs/...` : Documentation
- `chore/...` : Tâches diverses (config, dépendances, etc.)

**Exemple :**
```bash
git checkout -b feat/user-authentication
git checkout -b fix/login-button
```

### Format des commits

Utiliser la convention **Conventional Commits** :

```
<type>(<scope>): <description>

[corps optionnel]
```

**Types principaux :**
- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `refactor` : Refactorisation
- `docs` : Documentation
- `style` : Formatage, ponctuation
- `test` : Ajout/modification de tests
- `chore` : Maintenance

**Exemples :**
```bash
git commit -m "feat(auth): add login page"
git commit -m "fix(api): resolve token expiration issue"
git commit -m "docs(readme): update installation steps"
```

### Pull Requests (PR)

⚠️ **Les PR sont obligatoires** - Ne jamais push directement sur `main` !

1. Créer une branche depuis `main`
2. Faire vos modifications et commits
3. Push votre branche : `git push origin feat/ma-fonctionnalite`
4. Créer une PR sur GitHub/GitLab
5. Attendre la revue et l'approbation
6. Merger la PR

**Titre de PR :** Utiliser le même format que les commits
```
feat(auth): implement user authentication
```

## 🤝 Workflow de développement

```bash
# 1. Récupérer les dernières modifications
git checkout main
git pull origin main

# 2. Créer une nouvelle branche
git checkout -b feat/ma-feature

# 3. Faire vos modifications et commits
git add .
git commit -m "feat(scope): description"

# 4. Push et créer une PR
git push origin feat/ma-feature
```

## 📚 Technologies utilisées

**Frontend :**
- React 19
- React Router 7
- TypeScript
- TailwindCSS
- Vite

**Backend :**
- Java 17
- Spring Boot
- Keycloak (authentification)
- PostgreSQL
- Maven

---

**Bon courage pour la Nuit de l'Info ! 🌙💻**

