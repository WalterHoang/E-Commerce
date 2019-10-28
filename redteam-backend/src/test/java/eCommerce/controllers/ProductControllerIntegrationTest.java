package eCommerce.controllers;

import com.google.gson.Gson;
import eCommerce.entities.Category;
import eCommerce.entities.Demographic;
import eCommerce.entities.Product;
import eCommerce.entities.ProductType;
import org.junit.*;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.GenericWebApplicationContext;

import javax.servlet.ServletContext;
import java.util.HashSet;
import java.util.Set;

import static eCommerce.constants.ImageUrlConstants.SOCCER_URL;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest()
@AutoConfigureMockMvc
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class ProductControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private WebApplicationContext wac;

    private Product testProduct;
    private Demographic women = new Demographic(1, "women");
    private Category soccer = new Category(5, "soccer");
    private ProductType ball = new ProductType(1, "ball");

    private Set<Demographic> womens = new HashSet<>();
    private Set<Category> futball = new HashSet<>();
    private Set<ProductType> balls = new HashSet<>();

    @Before
    public void before() {
        mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
        MockitoAnnotations.initMocks(this);
        womens.add(women);
        balls.add(ball);
        futball.add(soccer);
        testProduct = new Product(27,
                "professional futball",
                "futball for pros",
                15,
                SOCCER_URL,
                9.99,
                womens,
                futball,
                balls
        );
    }

    /**
     * Verify test configuration
     */
    @Test
    public void checkContext() {
        ServletContext servletContext = wac.getServletContext();
        Assert.assertNotNull(servletContext);
        Assert.assertTrue(servletContext instanceof MockServletContext);
        Assert.assertTrue(((GenericWebApplicationContext) wac).isActive());
    }

    @Test
    public void agetProducts() throws Exception {
        mockMvc.perform(get("/products"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(26)));
    }

    @Test
    public void bgetPopularProducts() throws Exception {
        mockMvc.perform(get("/products/popular"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4)));
    }

    @Test
    public void createNewProduct() throws Exception {
        Gson gson = new Gson();
        String json = gson.toJson(testProduct);
        mockMvc.perform(post("/products").contentType(APPLICATION_JSON_UTF8)
                .content(json))
                .andExpect(status().isCreated());
        mockMvc.perform(get("/products"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(27)));


    }

    @Test
    public void updateProduct() throws Exception {
        Gson gson = new Gson();

        String json = gson.toJson(testProduct);
        mockMvc.perform(post("/products").contentType(APPLICATION_JSON_UTF8)
                .content(json))
                .andExpect(status().isCreated());

        testProduct.setId(testProduct.getId());
        testProduct.setName("UnProfessional futball");
        String newJson = gson.toJson(testProduct);
        mockMvc.perform(put("/products/" + (testProduct.getId()))
                .contentType(APPLICATION_JSON_UTF8)
                .content(newJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(testProduct.getName()));
    }

    @Test
    public void zdeleteProduct() throws Exception {
        Gson gson = new Gson();
        String json = gson.toJson(testProduct);
        mockMvc.perform(post("/products").contentType(APPLICATION_JSON_UTF8)
                .content(json));

        mockMvc.perform(delete("/products/" + testProduct.getId()));
        // confirm products is deleted
        mockMvc.perform(get("/products"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(26)));
    }

}