package eCommerce.services;

import eCommerce.data.ProductDao;
import eCommerce.entities.Category;
import eCommerce.entities.Demographic;
import eCommerce.entities.Product;
import eCommerce.entities.ProductType;
import eCommerce.exceptions.BadRequest;
import eCommerce.exceptions.FriendlyServerErrorException;
import eCommerce.exceptions.NotFound;
import eCommerce.interfaces.product.CategoryRepository;
import eCommerce.interfaces.product.DemographicRepository;
import eCommerce.interfaces.product.ProductRepository;
import eCommerce.interfaces.product.ProductTypeRepository;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ServerErrorException;

import java.util.*;

import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class ProductServiceTest {
    @Mock
    ProductDao mockProductDao;
    @Mock
    ProductRepository mockProductRepo;
    @Mock
    CategoryRepository mockCategoryRepo;
    @Mock
    DemographicRepository mockDemoRepo;
    @Mock
    ProductTypeRepository mockPTypeRepo;

    @InjectMocks
    ProductService productService;

    private static ProductType testBallType = new ProductType(1, "ball");
    private static ProductType testEquipmentType = new ProductType(2, "equipment");
    private static ProductType testClothingType = new ProductType(3, "shirts");
    private static ProductType testShoesType = new ProductType(4, "shoes");
    private static ProductType testPantsType = new ProductType(5, "pants");

    private static Demographic testWomen = new Demographic(1, "women");
    private static Demographic testMen = new Demographic(2, "men");
    private static Demographic testGirls = new Demographic(3, "girl");
    private static Demographic testBoys = new Demographic(4, "boy");

    private static Category testClothing = new Category(1, "clothing");
    private static Category testBasketBall = new Category(2, "basketball");
    private static Category testBaseball = new Category(3, "baseball");
    private static Category testSoccer = new Category(4, "soccer");
    private static Category testTennis = new Category(5, "tennis");

    private static Set<Category> category1 = new HashSet<>();
    private static Set<Category> category2 = new HashSet<>();
    private static Set<Category> category3 = new HashSet<>();
    private static Set<Category> category4 = new HashSet<>();
    private static Set<Category> category5 = new HashSet<>();
    private static Set<Category> category6 = new HashSet<>();

    private static Set<Demographic> dem1 = new HashSet<>();
    private static Set<Demographic> dem2 = new HashSet<>();
    private static Set<Demographic> dem3 = new HashSet<>();
    private static Set<Demographic> dem4 = new HashSet<>();
    private static Set<Demographic> dem5 = new HashSet<>();
    private static Set<Demographic> dem6 = new HashSet<>();

    private static Set<ProductType> type1 = new HashSet<>();
    private static Set<ProductType> type2 = new HashSet<>();
    private static Set<ProductType> type3 = new HashSet<>();
    private static Set<ProductType> type4 = new HashSet<>();
    private static Set<ProductType> type5 = new HashSet<>();
    private static Set<ProductType> type6 = new HashSet<>();

    private static Product firstProduct;
    private static Product secondProduct;
    private static Product thirdProduct;
    private static Product fourthProduct;
    private static Product fifthProduct;
    private static Product sixthProduct;
    private static Product invalidProduct;
    private List<Product> products = new ArrayList<>();
    private List<Product> clothesProducts = new ArrayList<>();
    private List<Product> demoProdList = new ArrayList<>();
    private List<Product> prodTypeList = new ArrayList<>();
    private List<Product> emptyList = new ArrayList<>();

    @Before
    public void before() {
        // save categories
        mockCategoryRepo.save(testClothing);
        mockCategoryRepo.save(testBaseball);
        mockCategoryRepo.save(testBasketBall);
        mockCategoryRepo.save(testTennis);
        mockCategoryRepo.save(testSoccer);
        // save demographics
        mockDemoRepo.save(testWomen);
        mockDemoRepo.save(testMen);
        mockDemoRepo.save(testGirls);
        mockDemoRepo.save(testBoys);
        //save product types
        mockPTypeRepo.save(testBallType);
        mockPTypeRepo.save(testClothingType);
        mockPTypeRepo.save(testEquipmentType);
        mockPTypeRepo.save(testShoesType);
        mockPTypeRepo.save(testPantsType);
        // create sets
        //Category
        category1.add(testClothing);
        category2.add(testBaseball);
        category3.add(testBasketBall);
        category4.add(testSoccer);
        category5.add(testBaseball);
        category6.add(testClothing);
        category6.add(testBaseball);

        //Product Type
        type1.add(testBallType);
        type2.add(testClothingType);
        type3.add(testEquipmentType);
        type4.add(testShoesType);
        type5.add(testShoesType);
        type6.add(testEquipmentType);
        type6.add(testShoesType);

        //Demographic
        dem1.add(testWomen);
        dem2.add(testMen);
        dem3.add(testGirls);
        dem4.add(testBoys);
        dem5.add(testGirls);
        dem5.add(testBoys);
        dem6.add(testGirls);
        dem6.add(testBoys);
        dem6.add(testMen);
        dem6.add(testWomen);
        // create products
        firstProduct = new Product(1,
                "First Product",
                "First Description",
                9,
                "img42.png",
                12.00,
                dem1,
                category1,
                type1);
        secondProduct = new Product(2,
                "Second Product",
                "second Description",
                90,
                "img34.png",
                120.00,
                dem2,
                category2,
                type2);
        thirdProduct = new Product(3,
                "Third Product",
                "Fourth Description",
                99,
                "img99.png",
                14.00,
                dem3,
                category3,
                type3);
        fourthProduct = new Product(4,
                "Fourth Product",
                "Fourth Description",
                30,
                "img4.png",
                40.00,
                dem4,
                category4,
                type4);
        fifthProduct = new Product(5,
                "Fifth Product",
                "Fifth Description",
                50,
                "img55.png",
                100.00,
                dem5,
                category5,
                type5);
        sixthProduct = new Product(1,
                "Sixth Product",
                "Sixth Description",
                66,
                "img666.png",
                666.00,
                dem6,
                category6,
                type6);
        invalidProduct = new Product(7,"","",0,"",0.0,null,null,null);
        // add products to list
        products.add(firstProduct);
        clothesProducts.add(firstProduct);
        products.add(secondProduct);
        demoProdList.add(secondProduct);
        products.add(thirdProduct);
        products.add(fourthProduct);
        prodTypeList.add(fourthProduct);
        products.add(fifthProduct);
        prodTypeList.add(fifthProduct);
    }

    @Test
    public void createProduct() {
        Mockito.when(mockProductDao.addProduct(firstProduct)).thenReturn(firstProduct);
        ResponseEntity<Product> expected = new ResponseEntity<>(firstProduct, HttpStatus.CREATED);
        assertEquals("Failed product creation: ", expected, productService.addProduct(firstProduct));
    }
    @Test(expected = BadRequest.class)
    public void createProductInvalid(){

        productService.addProduct(invalidProduct);
    }
    @Test(expected = FriendlyServerErrorException.class)
    public void createProductDBex(){
        Mockito.when(mockProductDao.addProduct(firstProduct)).thenThrow(ServerErrorException.class);
        productService.addProduct(firstProduct);
    }
    @Test
    public void getProducts(){
        Mockito.when(mockProductDao.getAllProducts()).thenReturn(products);
        ResponseEntity<List<Product>> expected = new ResponseEntity<>(products, HttpStatus.OK);
        assertEquals("Failed get products ", expected, productService.getAllProducts());
    }
    @Test(expected = FriendlyServerErrorException.class)
    public void getProductsDBex(){
        Mockito.when(mockProductDao.getAllProducts()).thenThrow(ServerErrorException.class);
        productService.getAllProducts();
    }
    @Test
    public void getProductsById(){
        Mockito.when(mockProductDao.findProductById(2)).thenReturn(Optional.of(secondProduct));
        ResponseEntity<Product> expected = new ResponseEntity<>(secondProduct, HttpStatus.OK);
        assertEquals("Failed find by id ", expected, productService.findProductById(2));
    }
    @Test(expected = NotFound.class)
    public void getProductByIdNF(){
        Mockito.when(mockProductDao.findProductById(1)).thenThrow(NotFound.class);
        productService.findProductById(1);
    }
    @Test(expected = FriendlyServerErrorException.class)
    public void getProductByIdDBex(){
        Mockito.when(mockProductDao.findProductById(1)).thenThrow(ServerErrorException.class);
        productService.findProductById(1);
    }
    @Test
    public void getProductsByName(){
    Mockito.when(mockProductDao.findProductByName(thirdProduct.getName())).thenReturn(Optional.of(thirdProduct));
    ResponseEntity<Product> expected = new ResponseEntity<>(thirdProduct, HttpStatus.OK);
    assertEquals("Failed find by name ", expected, productService.findProductByName(thirdProduct.getName()));
    }
    @Test(expected = NotFound.class)
    public void getProductByNameNF(){
        Mockito.when(mockProductDao.findProductByName("")).thenThrow(NotFound.class);
        productService.findProductByName("");
    }
    @Test(expected = FriendlyServerErrorException.class)
    public void getProductByNameDBex(){
        Mockito.when(mockProductDao.findProductByName("Basketball")).thenThrow(ServerErrorException.class);
        productService.findProductByName("Basketball");
    }
    @Test
    public void getProductsByCategory(){
        Mockito.when(mockProductDao.getAllProducts()).thenReturn(products);
        ResponseEntity<List<Product>> expected = new ResponseEntity<>(clothesProducts, HttpStatus.OK);
        assertEquals("Failed find by category ", expected, productService.getProductsByCategory(testClothing.getCategory()));
    }
    @Test(expected = NotFound.class)
    public void getProductsByCategoryNF(){
        Mockito.when(mockProductDao.getAllProducts()).thenReturn(emptyList);
        productService.getProductsByCategory("Dummy product category");
    }
    @Test
    public void getProductsByDemo(){
        Mockito.when(mockProductDao.getAllProducts()).thenReturn(products);
        ResponseEntity<List<Product>> expected = new ResponseEntity<>(demoProdList, HttpStatus.OK);
        assertEquals("Failed find by demographic ", expected, productService.getProductsByDemographic(testMen.getDemographic()));
    }
    @Test(expected = NotFound.class)
    public void getProductsByDemoNF(){
        Mockito.when(mockProductDao.getAllProducts()).thenReturn(emptyList);
        productService.getProductsByDemographic("Dummy product demographic");
    }
    @Test
    public void getProductsByType(){
        Mockito.when(mockProductDao.getAllProducts()).thenReturn(products);
        ResponseEntity<List<Product>> expcted = new ResponseEntity<>(prodTypeList, HttpStatus.OK);
        assertEquals("Failed find by type ", expcted, productService.getProductsByType(testShoesType.getType()));
    }
    @Test(expected = NotFound.class)
    public void getProductsByTypeNF(){
        Mockito.when(mockProductDao.getAllProducts()).thenReturn(emptyList);
        productService.getProductsByCategory("Dummy product type");
    }
    @Test
    public void updateProduct(){
        Mockito.when(mockProductDao.findProductById(1)).thenReturn(Optional.of(firstProduct));
        Mockito.when(mockProductDao.updateProduct(1,sixthProduct)).thenReturn(sixthProduct);
        ResponseEntity<Product> expected = new ResponseEntity<>(sixthProduct, HttpStatus.OK);
        assertEquals("Failed update product ", expected, productService.updateProduct(1, sixthProduct));
    }
    @Test(expected = NotFound.class)
    public void updateProductNotFound(){
        Mockito.when(mockProductDao.findProductById(1)).thenThrow(NotFound.class);
        productService.updateProduct(1,firstProduct);
    }
    @Test(expected = BadRequest.class)
    public void updateProductBR(){
        Mockito.when(mockProductDao.findProductById(1)).thenReturn(Optional.of(firstProduct));
        productService.updateProduct(1,invalidProduct);
    }
    @Test(expected = FriendlyServerErrorException.class)
    public void updateProductDBex(){
        Mockito.when(mockProductDao.findProductById(1)).thenThrow(ServerErrorException.class);
        productService.updateProduct(1,firstProduct);
    }
    @Test
    public void removeProduct(){
        Mockito.when(mockProductDao.findProductById(5)).thenReturn(Optional.of(fifthProduct));
        productService.removeProduct(5);
    }
    @Test(expected = NotFound.class)
    public void removeProductNotFound(){
        Mockito.when(mockProductDao.findProductById(1)).thenThrow(NotFound.class);
        productService.removeProduct(1);
    }
    @Test(expected = FriendlyServerErrorException.class)
    public void removeProductDBex(){
        Mockito.when(mockProductDao.findProductById(1)).thenThrow(ServerErrorException.class);
        productService.removeProduct(1);
    }
    @Test
    public void getPopularProducts(){
        Mockito.when(mockProductDao.getAllProducts()).thenReturn(products);
        ResponseEntity<List<Product>> expected = new ResponseEntity<>(HttpStatus.OK);
        assertEquals("Failed get products ", expected.getStatusCode(), productService.getPopularProducts().getStatusCode());
    }
    @Test(expected = FriendlyServerErrorException.class)
    public void getPopularProductsDBex(){
        Mockito.when(mockProductDao.getAllProducts()).thenThrow(ServerErrorException.class);
        productService.getPopularProducts();
    }
}