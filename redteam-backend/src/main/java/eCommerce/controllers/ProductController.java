package eCommerce.controllers;

import eCommerce.entities.Product;
import eCommerce.exceptions.BadRequest;
import eCommerce.exceptions.FriendlyServerErrorException;
import eCommerce.exceptions.NotFound;
import eCommerce.interfaces.product.IProductService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@Api(value = "This is the controller for the product.", produces = "Controls the endpoints for the products.")
@ApiResponses(value = {@ApiResponse(code = 500, message = "An unexpected error occurred.")})
public class ProductController {
    @Autowired
    private IProductService productService;

    /**
     * Gets a list of products and a status code
     *
     * @return a list of products and a status code
     */
    @GetMapping
    @ApiOperation("Gets all products in the system")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", responseContainer = "List", response = Product.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class),
    })
    public ResponseEntity<List<Product>> getAllProducts() {
        return productService.getAllProducts();
    }

    /**
     * Adds a new product
     *
     * @param product object with product info
     * @return the new product and a status code
     */
    @PostMapping
    @ApiOperation("Adds a product to the system")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Created", response = Product.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class),
            @ApiResponse(code = 400, message = "Bad Request", response = BadRequest.class)
    })
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    /**
     * Updates a selected product
     *
     * @param id of product to update
     * @param product object with new product info
     * @return new product object with id of old product
     */
    @PutMapping(value = "/{id}")
    @ApiOperation("Updates a selected product in the system by id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = Product.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class),
            @ApiResponse(code = 400, message = "Bad Request", response = BadRequest.class)
    })
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    /**
     * Removes a product
     *
     * @param id of product to remove
     * @return status code 204
     */
    @DeleteMapping(value = "/{id}")
    @ApiOperation("Removes a selected product in the system by id")
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "No Content"),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class)
    })
    public ResponseEntity removeProduct(@PathVariable Integer id) {
        return productService.removeProduct(id);
    }

    /**
     * Finds a product by name
     *
     * @param name of product
     * @return product object
     */
    @GetMapping(value = "/name/")
    @ApiOperation("Finds a product by name")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = Product.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class)
    })
    public ResponseEntity findProductByName(@RequestParam String name) {
        return productService.findProductByName(name);
    }

    /**
     * Finda a product by id
     *
     * @param id of product
     * @return product object
     */
    @GetMapping(value = "/{id}")
    @ApiOperation("Finds a product by id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = Product.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class)
    })
    public ResponseEntity findProductById(@PathVariable Integer id) {
        return productService.findProductById(id);
    }

    /**
     * Finds a product by name
     *
     * @param category of product
     * @return product object
     */
    @GetMapping(value = "/category/")
    @ApiOperation("Finds products by category type")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = Product.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class)
    })
    public ResponseEntity getProductsByCategory(@RequestParam String category) {
        return productService.getProductsByCategory(category);
    }

    /**
     * Finds a product by name
     *
     * @param demographic of product
     * @return product object
     */
    @GetMapping(value = "/demographic/")
    @ApiOperation("Finds products by demographic")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = Product.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class)
    })
    public ResponseEntity getProductsByDemographic(@RequestParam String demographic) {
        return productService.getProductsByDemographic(demographic);
    }

    /**
     * Finds a product by type
     *
     * @param type of product
     * @return product object
     */
    @GetMapping(value = "/type/")
    @ApiOperation("Finds products by type")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = Product.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class),
            @ApiResponse(code = 404, message = "Not Found", response = NotFound.class)
    })
    public ResponseEntity getProductsByType(@RequestParam String type) {
        return productService.getProductsByType(type);
    }

    /**
     * Gets a list of products that are popular.
     * For right now its just a random selection.
     *
     * @return a list of product objects
     */
    @GetMapping(value = "/popular")
    @ApiOperation("Finds products by type")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = Product.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = FriendlyServerErrorException.class)
    })
    public ResponseEntity<List<Product>> getPopularProducts() {
        return productService.getPopularProducts();
    }
}
