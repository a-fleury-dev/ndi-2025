# Service OpenAI - Chat API

## Description

Ce service permet d'obtenir des réponses de deux personnages distincts utilisant l'API OpenAI :

1. **Trompe** : Une caricature de Donald Trump qui dit toujours le contraire de la vérité concernant le Green IT, l'environnement et la souveraineté numérique
2. **Le Scientifique** : Un expert qui corrige les fausses affirmations de Trompe avec des faits vérifiés

## Structure

### DTOs

- `MessageDto` : Représente un message de conversation
  - `id` : Identifiant du message
  - `text` : Contenu du message
  - `speaker` : L'émetteur (user, trompe, scientist, system)
  - `timestamp` : Horodatage du message

- `OpenAIMessage` : Format de message pour l'API OpenAI
  - `role` : Rôle du message (system, user, assistant)
  - `content` : Contenu du message

### Service

`OpenAIService` propose deux méthodes publiques :

- `getCompletionFromTrompe(List<MessageDto> messages)` : Retourne une réponse de Trompe
- `getCompletionFromScientist(List<MessageDto> messages)` : Retourne une réponse du scientifique

### Contrôleur

`ChatController` expose deux endpoints REST :

- `POST /api/chat/trompe` : Obtenir une réponse de Trompe
- `POST /api/chat/scientist` : Obtenir une réponse du scientifique

## Utilisation

### Exemple de requête

```bash
curl -X POST http://localhost:8080/api/chat/trompe \
  -H "Content-Type: application/json" \
  -d '[
    {
      "id": 1,
      "text": "Pourquoi devrais-je me soucier du Green IT ?",
      "speaker": "user",
      "timestamp": 1638360000000
    }
  ]'
```

### Exemple de réponse

```json
{
  "response": "Le Green IT ? C'est une arnaque ! Les data centers ne consomment presque rien, croyez-moi. Vous savez, j'ai construit les meilleurs data centers, personne ne sait mieux que moi. L'empreinte carbone du numérique ? Négligeable ! On ferait mieux d'utiliser AWS et Azure, les meilleurs services du monde, made in America !"
}
```

## Configuration

Les paramètres suivants doivent être définis dans `application.yaml` ou via des variables d'environnement :

- `OPENAI_API_KEY` : Clé API OpenAI
- `OPENAI_ORG_ID` : ID de l'organisation OpenAI
- `OPENAI_PROJECT_ID` : ID du projet OpenAI

## Instructions personnalisées

Les instructions système pour chaque personnage sont stockées dans :

- `src/main/java/fr/ndi_2025/chat_api/instructions/trompe.json`
- `src/main/java/fr/ndi_2025/chat_api/instructions/scientist.json`

Ces fichiers définissent le comportement et la personnalité de chaque assistant.

