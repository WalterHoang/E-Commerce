package eCommerce.entities;

import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="category")
public class Category {


    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name="id")
    @ApiModelProperty(name = "id", required = true, example = "1", value = "An id for category types.")
    private Integer id;

    @NotNull
    @Column(name="category")
    @ApiModelProperty(name = "category", required = true, example = "Baseball", value = "A name for the category names")
    private String category;

    @ManyToMany(mappedBy = "category")
    @ApiModelProperty(name = "products", required = true, example = "{'id':1}", value = "A set of products types.")
    private Set<Product> products = new HashSet<>();

    public Category() {
    }

    public Category(Integer id, @NotNull String category) {
        this.id = id;
        this.category = category;
    }

    public Category(Integer id, @NotNull String category, Set<Product> products) {
        this.id = id;
        this.category = category;
        this.products = products;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}
