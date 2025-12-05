package fr.ndi_2025.chat_api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {

    private Integer id;
    private String text;
    private String speaker;
    private Long timestamp;
}

