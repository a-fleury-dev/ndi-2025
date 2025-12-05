package fr.ndi_2025.chat_api.controller;

import fr.ndi_2025.chat_api.dto.MessageDto;
import fr.ndi_2025.chat_api.service.OpenAIService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final OpenAIService openAIService;

    public ChatController(OpenAIService openAIService) {
        this.openAIService = openAIService;
    }

    /**
     * Endpoint pour obtenir une réponse de Trompe
     */
    @PostMapping("/trompe")
    public ResponseEntity<Map<String, String>> getTrompeResponse(@RequestBody List<MessageDto> messages) {
        try {
            log.info("Trompe: {}", messages);
            String response = openAIService.getCompletionFromTrompe(messages);
            return ResponseEntity.ok(Map.of("response", response));
        } catch (IOException e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Erreur lors de la génération de la réponse: " + e.getMessage()));
        }
    }

    /**
     * Endpoint pour obtenir une réponse du scientifique
     */
    @PostMapping("/scientist")
    public ResponseEntity<Map<String, String>> getScientistResponse(@RequestBody List<MessageDto> messages) {
        try {
            log.info("Scientifique: {}", messages);
            String response = openAIService.getCompletionFromScientist(messages);
            return ResponseEntity.ok(Map.of("response", response));
        } catch (IOException e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Erreur lors de la génération de la réponse: " + e.getMessage()));
        }
    }
}

