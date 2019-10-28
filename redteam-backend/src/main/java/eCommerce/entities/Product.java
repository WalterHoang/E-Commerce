package eCommerce.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Table(name="product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    @ApiModelProperty(name = "id", required = true, example = "1", value = "A product's id.")
    private Integer id;

    @NotNull
    @Column(name="name")
    @ApiModelProperty(name = "Name", required = true, example = "BasketBall", value = "A product name.")
    private String name;

    @NotNull
    @Column(name="description")
    @ApiModelProperty(name = "description", required = true, example = "An orange, rubberized ball to bounce and dunk",
            value = "A product's description.")
    private String description;

    @NotNull
    @Column(name="url")
    @ApiModelProperty(name = "url", required = true, example = "img24.png",
            value = "The location of the product image.")
    private String url;

    @NotNull
    @Column(name="quantity")
    @ApiModelProperty(name = "quantity", required = true, example = "9",
            value = "The amount of a product in stock.")
    private Integer quantity;

    @NotNull
    @Column(name="price")
    @ApiModelProperty(name = "price", required = true, example = "9.00",
            value = "The price of a product.")
    private Double price;

    @ManyToMany
    @JoinTable(
            name = "demographic_product",
            joinColumns = @JoinColumn(
                    name = "product_id",
                    referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "demographic_id",
                    referencedColumnName = "id")

    )
    @ApiModelProperty(name = "demographic", required = true, example = "{'id':1}", value = "A set of demographic types.")
    @JsonIgnoreProperties({"products"})
    private Set<Demographic> demographic;

    @ManyToMany
    @JoinTable(
            name = "catagory_product",
            joinColumns = @JoinColumn(
                    name = "product_id",
                    referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "catagory_id",
                    referencedColumnName = "id")

    )
    @ApiModelProperty(name = "catagory", required = true, example = "{'id':1}", value = "A set of catagory types.")
    @JsonIgnoreProperties({"products"})
    private Set<Category> category;

    @ManyToMany
    @JoinTable(
            name = "product_type_product",
            joinColumns = @JoinColumn(
                    name = "product_id",
                    referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "type_id",
                    referencedColumnName = "id")

    )
    @ApiModelProperty(name = "productType", required = true, example = "{'id':1}", value = "A set of catagory types.")
    @JsonIgnoreProperties({"products"})
    private Set<ProductType> productType;


    public Product() { }

    public Product(String name,
                   String description,
                   Integer quantity,
                   String url,
                   Double price) {
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.url = url;
        this.price = price;
    }

    public Product(Integer id,
                   String name,
                   String description,
                   Integer quantity,
                   String url,
                   Double price,
                   Set<Demographic> demographic,
                   Set<Category> category,
                   Set<ProductType> productType) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.url = url;
        this.price = price;
        this.demographic = demographic;
        this.category = category;
        this.productType = productType;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Set<Demographic> getDemographic() {
        return demographic;
    }

    public void setDemographic(Set<Demographic> demographic) {
        this.demographic = demographic;
    }

    public Set<Category> getCategory() {
        return category;
    }

    public void setCategory(Set<Category> category) {
        this.category = category;
    }

    public Set<ProductType> getProductType() {
        return productType;
    }

    public void setProductType(Set<ProductType> productType) {
        this.productType = productType;
    }
}
