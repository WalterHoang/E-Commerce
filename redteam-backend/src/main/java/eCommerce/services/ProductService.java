package eCommerce.services;

import eCommerce.entities.Product;
import eCommerce.exceptions.BadRequest;
import eCommerce.exceptions.FriendlyServerErrorException;
import eCommerce.exceptions.NotFound;
import eCommerce.interfaces.product.IProductDao;
import eCommerce.interfaces.product.IProductService;
import eCommerce.services.validation.ProductValidate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerErrorException;

import java.util.ArrayList;
import java.util.List;

import static eCommerce.constants.StringConstants.*;

@Service
public class ProductService implements IProductService {

    private ProductValidate prodVal = new ProductValidate();

    @Autowired
    private IProductDao productDao;

    /**
     * Gets a list of products from the database
     *
     * @return a list of products with a status code
     */
    @Override
    public ResponseEntity<List<Product>> getAllProducts() {
        try{
            return new ResponseEntity<>(productDao.getAllProducts(), HttpStatus.OK);
        } catch(ServerErrorException exc){
            throw new FriendlyServerErrorException();
        }

    }

    /**
     * Adds a new product
     *
     * @param product object with product info
     * @return the newly added product with a status code
     */
    @Override
    public ResponseEntity<Product> addProduct(Product product) {
        try{
            if (prodVal.validateProductData(product)) {
                return new ResponseEntity<>(productDao.addProduct(product), HttpStatus.CREATED);
            } else {
                throw new BadRequest(PRODUCT_INPUT_INVALID);
            }
        } catch(ServerErrorException exc){
            throw new FriendlyServerErrorException();
        }
    }

    /**
     * Updates a selected product
     *
     * @param id      of product to update
     * @param product object with new product info
     * @return new product object with id of old product
     */
    @Override
    public ResponseEntity<Product> updateProduct(Integer id, Product product) {
        try{
            if (productDao.findProductById(id).isPresent()) {
                if (prodVal.validateProductData(product)) {
                    return new ResponseEntity<>(productDao.updateProduct(id, product), HttpStatus.OK);
                }
                throw new BadRequest(PRODUCT_INPUT_INVALID);
            }
            throw new NotFound(PRODUCT_NOT_FOUND);
        } catch(ServerErrorException exc){
            throw new FriendlyServerErrorException();
        }
    }

    /**
     * Removes a product
     *
     * @param id of product to remove
     * @return status code 204
     */
    @Override
    public ResponseEntity removeProduct(Integer id) {
        try{
            if (productDao.findProductById(id).isPresent()) {
                productDao.removeProduct(id);
                return new ResponseEntity(HttpStatus.NO_CONTENT);
            }
            throw new NotFound(PRODUCT_NOT_FOUND);
        } catch(ServerErrorException exc){
            throw new FriendlyServerErrorException();
        }
    }

    /**
     * Finds a product by name
     *
     * @param name of product
     * @return product object
     */
    @Override
    public ResponseEntity<Product> findProductByName(String name) {
        try{
            if (productDao.findProductByName(name).isPresent()) {
                return new ResponseEntity<>(productDao.findProductByName(name).get(), HttpStatus.OK);
            }
            throw new NotFound(PRODUCT_NOT_FOUND);
        } catch(ServerErrorException exc){
            throw new FriendlyServerErrorException();
        }
    }

    /**
     * Finda a product by id
     *
     * @param id of product
     * @return product object
     */
    @Override
    public ResponseEntity<Product> findProductById(Integer id) {
        try{
            if (productDao.findProductById(id).isPresent()) {
                return new ResponseEntity<>(productDao.findProductById(id).get(), HttpStatus.OK);
            }
            throw new NotFound(PRODUCT_NOT_FOUND);
        } catch(ServerErrorException exc){
            throw new FriendlyServerErrorException();
        }
    }

    /**
     * Finds a product by name
     *
     * @param category of product
     * @return product object
     */
    @Override
    public ResponseEntity<List<Product>> getProductsByCategory(String category) {
        try{
            List<Product> getByCatList = new ArrayList<>();
            productDao.getAllProducts().forEach(product -> {
                product.getCategory().forEach(cat -> {
                    if (cat.getCategory().equals(category.toLowerCase())) {
                        getByCatList.add(product);
                    }
                });
            });
            if (getByCatList.size() > 0) {
                return new ResponseEntity<>(getByCatList, HttpStatus.OK);
            }
            throw new NotFound(CATEGORY_NOT_FOUND + category);
        } catch(ServerErrorException exc){
            throw new FriendlyServerErrorException();
        }

    }

    /**
     * Finds a product by type
     *
     * @param type of product
     * @return product object
     */
    @Override
    public ResponseEntity<List<Product>> getProductsByType(String type) {
        try{
            List<Product> getByTypeList = new ArrayList<>();
            productDao.getAllProducts().forEach(product -> {
                product.getProductType().forEach(typ -> {
                    if (typ.getType().equals(type.toLowerCase())) {
                        getByTypeList.add(product);
                    }
                });
            });
            if (getByTypeList.size() > 0) {
                return new ResponseEntity<>(getByTypeList, HttpStatus.OK);
            }
            throw new NotFound(TYPE_NOT_FOUND + type);
        } catch(ServerErrorException exc){
            throw new FriendlyServerErrorException();
        }
    }

    /**
     * Finds a product by name
     *
     * @param demographic of product
     * @return product object
     */
    @Override
    public ResponseEntity<List<Product>> getProductsByDemographic(String demographic) {
        try{
            List<Product> getByDemList = new ArrayList<>();
            productDao.getAllProducts().forEach(product -> {
                product.getDemographic().forEach(dem -> {
                    if (dem.getDemographic().equals(demographic.toLowerCase())) {
                        getByDemList.add(product);
                    }
                });
            });
            if (getByDemList.size() > 0) {
                return new ResponseEntity<>(getByDemList, HttpStatus.OK);
            }
            throw new NotFound(DEMOGRAPHIC_NOT_FOUND + demographic);
        } catch(ServerErrorException exc){
            throw new FriendlyServerErrorException();
        }

    }

    /**
     * gets a group of 4 products, to simulate four popular products.
     * @return List of four products.
     */

    @Override
    public ResponseEntity<List<Product>> getPopularProducts() {
        try{
            List<Product> getPopularList = new ArrayList<>();
            List<Product> allProdsList = productDao.getAllProducts();
            List<Integer> listsOfIndexes = new ArrayList<>();

            do{
                int index = (int) Math.round(Math.random() * allProdsList.size());
                if(index != allProdsList.size()){
                    if(!listsOfIndexes.contains(index)){ //filters out the duplicates.
                        listsOfIndexes.add(index);
                        getPopularList.add(allProdsList.get(index));
                    }
                }
            }while(listsOfIndexes.size()!=4); //makes sure the system will always return four products.

            return new ResponseEntity<>( getPopularList,HttpStatus.OK);

        }catch(ServerErrorException exc){
            throw new FriendlyServerErrorException();
        }
    }
}
