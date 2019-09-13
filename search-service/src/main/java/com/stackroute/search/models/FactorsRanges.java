package com.stackroute.search.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.Id;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FactorsRanges {

    @Id
    private String name;

    private String title;

    private List<Object> ranges;
}
