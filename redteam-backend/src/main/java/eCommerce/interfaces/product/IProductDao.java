package eCommerce.interfaces.product;

import eCommerce.entities.Product;

import java.util.List;
import java.util.Optional;

public interface IProductDao {
    List<Product> getAllProducts();
    Product addProduct(Product product);
    Product updateProduct(Integer id, Product product);
    void removeProduct(Integer id);
    Optional<Product> findProductByName(String name);
    Optional<Product> findProductById(Integer id);
}
