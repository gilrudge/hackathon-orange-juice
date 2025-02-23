package com.hackathon.backendorange.dto;

import com.hackathon.backendorange.enums.TagsEnum;
import lombok.AllArgsConstructor;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {

    private Long id;

    private String titulo;

    private String descricao;

    private TagsEnum tags;

    private String links;

    private String date;

    private String image;

    private String image_id;

    private String image_originalName;

    private Long idUser;
}
