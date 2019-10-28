package eCommerce.entities;

import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="demographic")
public class Demographic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(name = "id", required = true, example = "1", value = "An id for demographic types.")
    private Integer id;

    @NotNull
    @Column(name="demographic")
    @ApiModelProperty(name = "demographic", required = true, example = "Baseball", value = "A name for the demographic names")
    private String demographic;

    @ManyToMany(mappedBy = "demographic")
    @ApiModelProperty(name = "products", required = true, example = "{'id':1}", value = "A set of products types.")
    private Set<Product> products = new HashSet<>();

    public Demographic() {    }

    public Demographic(Integer id, String demographic) {
        this.id = id;
        this.demographic = demographic;
    }

    public Demographic(Integer id, String demographic, Set<Product> products) {
        this.id = id;
        this.demographic = demographic;
        this.products = products;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDemographic() {
        return demographic;
    }

    public void setDemographic(String demographic) {
        this.demographic = demographic;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}
