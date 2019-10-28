package eCommerce.interfaces.product;

import eCommerce.entities.Product;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IProductService {
    ResponseEntity<List<Product>> getAllProducts();
    ResponseEntity<Product> addProduct(Product product);
    ResponseEntity<Product> updateProduct(Integer id, Product product);
    ResponseEntity removeProduct(Integer id);
    ResponseEntity<Product> findProductByName(String name);
    ResponseEntity<Product> findProductById(Integer id);
    ResponseEntity<List<Product>> getProductsByCategory(String category);
    ResponseEntity<List<Product>> getProductsByType(String type);
    ResponseEntity<List<Product>> getProductsByDemographic(String demographic);
    ResponseEntity<List<Product>> getPopularProducts();
}
