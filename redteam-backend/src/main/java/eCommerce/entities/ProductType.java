package eCommerce.entities;

import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="product_type")
public class ProductType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    @ApiModelProperty(name = "id", required = true, example = "1", value = "An id for product types.")
    private Integer id;

    @NotNull
    @Column(name="type")
    @ApiModelProperty(name = "Type", required = true, example = "Baseball", value = "Product types")
    private String type;

    @ManyToMany(mappedBy = "productType")
    @ApiModelProperty(name = "products", required = true, example = "{'id':1}", value = "A set of products types.")
    private Set<Product> products = new HashSet<>();

    public ProductType() {
    }

    public ProductType(Integer id, @NotNull String type) {
        this.id = id;
        this.type = type;
    }

    public ProductType(Integer id, @NotNull String type, Set<Product> products) {
        this.id = id;
        this.type = type;
        this.products = products;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}
