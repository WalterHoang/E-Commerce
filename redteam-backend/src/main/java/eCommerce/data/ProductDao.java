package eCommerce.data;

import eCommerce.entities.Product;
import eCommerce.interfaces.product.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ProductDao implements IProductDao {
    @Autowired
    private ProductRepository productRepo;
    @Autowired
    private CategoryRepository categoryRepo;
    @Autowired
    private DemographicRepository demographicRepo;
    @Autowired
    ProductTypeRepository productTypeRepo;

    @Override
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    @Override
    public Product addProduct(Product product) {
        return productRepo.save(product);
    }

    @Override
    public Product updateProduct(Integer id, Product product) {
        Product currentProduct = productRepo.findById(id).orElse(null);
        if(currentProduct == null){
            return null;
        }
        product.setId(id);
        return productRepo.save(product);
    }

    @Override
    public void removeProduct(Integer id) {
        productRepo.deleteById(id);
    }

    @Override
    public Optional<Product> findProductByName(String name) {
        return Optional.of(productRepo.findByName(name).orElse(null));
    }

    @Override
    public Optional<Product> findProductById(Integer id) {
        return Optional.of(productRepo.findById(id).orElse(null));
    }
}
