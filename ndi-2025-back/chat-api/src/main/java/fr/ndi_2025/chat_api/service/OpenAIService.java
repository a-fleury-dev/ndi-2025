package fr.ndi_2025.chat_api.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.ndi_2025.chat_api.dto.MessageDto;
import fr.ndi_2025.chat_api.dto.OpenAIMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Service
@RequiredArgsConstructor
public class OpenAIService {

    @Value("${openai.api-key}")
    private String apiKey;

    @Value("${openai.model}")
    private String model;

    @Value("${openai.temperature}")
    private double temperature;

    @Value("${openai.max-tokens}")
    private int maxTokens;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

    /**
     * Obtient une réponse de Trompe basée sur les messages de conversation
     */
    public String getCompletionFromTrompe(List<MessageDto> messages) throws IOException {
        List<OpenAIMessage> systemInstructions = loadInstructions("instructions/trompe.json");
        return getCompletion(systemInstructions, messages);
    }

    /**
     * Obtient une réponse du scientifique basée sur les messages de conversation
     */
    public String getCompletionFromScientist(List<MessageDto> messages) throws IOException {
        List<OpenAIMessage> systemInstructions = loadInstructions("instructions/scientist.json");
        return getCompletion(systemInstructions, messages);
    }

    /**
     * Charge les instructions depuis un fichier JSON
     */
    private List<OpenAIMessage> loadInstructions(String instructionsPath) throws IOException {
        ClassPathResource resource = new ClassPathResource(instructionsPath);
        try (InputStream inputStream = resource.getInputStream()) {
            return objectMapper.readValue(inputStream, new TypeReference<List<OpenAIMessage>>() {});
        }
    }

    /**
     * Envoie une requête à l'API OpenAI et retourne la réponse
     */
    private String getCompletion(List<OpenAIMessage> systemInstructions, List<MessageDto> conversationMessages) {
        try {
            // Préparer les messages : instructions système + messages de conversation
            List<OpenAIMessage> allMessages = new ArrayList<>(systemInstructions);

            // Convertir les messages de conversation au format OpenAI
            for (MessageDto msg : conversationMessages) {
                String role = convertSpeakerToRole(msg.getSpeaker());
                allMessages.add(new OpenAIMessage(role, msg.getText()));
            }

            // Préparer le corps de la requête
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", model);
            requestBody.put("messages", allMessages);
            requestBody.put("temperature", temperature);
            requestBody.put("max_tokens", maxTokens);

            // Préparer les headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            // Envoyer la requête
            Map<String, Object> response = restTemplate.postForObject(OPENAI_API_URL, entity, Map.class);

            // Extraire la réponse
            if (response != null && response.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                    return (String) message.get("content");
                }
            }

            return "Désolé, je n'ai pas pu générer une réponse.";

        } catch (Exception e) {
            e.printStackTrace();
            return "Erreur lors de la communication avec l'API OpenAI : " + e.getMessage();
        }
    }

    /**
     * Convertit le type de speaker (user/trompe/scientist) en rôle OpenAI (user/assistant)
     */
    private String convertSpeakerToRole(String speaker) {
        return switch (speaker.toLowerCase()) {
            case "user" -> "user";
            case "trompe", "scientist" -> "assistant";
            default -> "user";
        };
    }
}

