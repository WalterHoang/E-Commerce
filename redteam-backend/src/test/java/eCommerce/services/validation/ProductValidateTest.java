package eCommerce.services.validation;

import eCommerce.entities.Category;
import eCommerce.entities.Demographic;
import eCommerce.entities.Product;
import eCommerce.entities.ProductType;
import org.junit.Before;
import org.junit.Test;

import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.*;

public class ProductValidateTest {
    private Category cat = new Category(1,"category");
    private ProductType prodType = new ProductType(1,"type");
    private Demographic dem = new Demographic(1,"demo");

    private Set<Category> categ = new HashSet<>();
    private Set<ProductType> types = new HashSet<>();
    private Set<Demographic> demos = new HashSet<>();

    private ProductValidate prodValid = new ProductValidate();

    private Product prod;

    @Before
    public void setUp() throws Exception {
        categ.add(cat);
        types.add(prodType);
        demos.add(dem);

        prod = new Product(1,"test","testing testing",12,"test.png",20.99,demos,categ,types);
    }
    @Test
    public void validateProductDataHappy() {
        assertTrue(prodValid.validateProductData(prod));
    }
    @Test
    public void validateProductDataSadCateg() {
        prod.setCategory(null);
        assertFalse(prodValid.validateProductData(prod));
    }
    @Test
    public void validateProductDataSadDemo() {
        prod.setDemographic(null);
        assertFalse(prodValid.validateProductData(prod));
    }
    @Test
    public void validateProductDataSadTypes() {
        prod.setProductType(null);
        assertFalse(prodValid.validateProductData(prod));
    }

    @Test
    public void validateProductDataSad() {

        prod.setName(null);
        assertFalse(prodValid.validateProductData(prod));

        prod.setName(" ");
        assertFalse(prodValid.validateProductData(prod));

        prod.setName("test");
        prod.setDescription(null);
        assertFalse(prodValid.validateProductData(prod));

        prod.setDescription(" ");
        assertFalse(prodValid.validateProductData(prod));

        prod.setDescription("Testing testing");
        prod.setUrl(" ");
        assertFalse(prodValid.validateProductData(prod));

        prod.setUrl(null);
        assertFalse(prodValid.validateProductData(prod));

        prod.setUrl("test.png");
        prod.setPrice(null);
        assertFalse(prodValid.validateProductData(prod));

        prod.setPrice(20.00);
        prod.setQuantity(null);
        assertFalse(prodValid.validateProductData(prod));

    }

}