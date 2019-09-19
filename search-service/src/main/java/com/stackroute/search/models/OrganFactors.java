package com.stackroute.search.models;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import java.util.ArrayList;

@NodeEntity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("OrganFactors")
public class OrganFactors {

    @Id
    private String name;

    @Relationship(type = "HAS_FACTORS")
    private ArrayList<FactorsRanges> factors;
}
