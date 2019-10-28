package eCommerce.data;

import eCommerce.entities.*;
import eCommerce.interfaces.product.CategoryRepository;
import eCommerce.interfaces.product.DemographicRepository;
import eCommerce.interfaces.product.ProductRepository;
import eCommerce.interfaces.product.ProductTypeRepository;
import eCommerce.interfaces.user.RoleRepository;
import eCommerce.interfaces.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

import static eCommerce.constants.ImageUrlConstants.*;

@Component
public class DataLoader implements CommandLineRunner {
    @Autowired
    private RoleRepository roleRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ProductTypeRepository prodTypeRepo;
    @Autowired
    private DemographicRepository demRepo;
    @Autowired
    private CategoryRepository catRepo;
    @Autowired
    private ProductRepository prodRepo;

    private Role testEmployeeRole = new Role(2, "EMPLOYEE");
    private Role testAdminRole = new Role(1, "ADMIN");
    private Role testCustomerRole = new Role(3, "CUSTOMER");

    private ProductType ball = new ProductType(1, "ball");
    private ProductType equipment = new ProductType(2, "equipment");
    private ProductType shirt = new ProductType(3, "shirts");
    private ProductType shoe = new ProductType(4, "shoes");
    private ProductType pant = new ProductType(5, "pants");

    private Demographic women = new Demographic(1, "women");
    private Demographic men = new Demographic(2, "men");
    private Demographic girl = new Demographic(3, "girl");
    private Demographic boy = new Demographic(4, "boy");

    private Category basket = new Category(1, "basketball");
    private Category base = new Category(2, "baseball");
    private Category running = new Category(3, "running");
    private Category golf = new Category(4, "golf");
    private Category soccer = new Category(5, "soccer");

    private Set<Category> basketball = new HashSet<>();
    private Set<Category> baseball = new HashSet<>();
    private Set<Category> run = new HashSet<>();
    private Set<Category> golfing = new HashSet<>();
    private Set<Category> futball = new HashSet<>();

    private Set<Demographic> mens = new HashSet<>();
    private Set<Demographic> womens = new HashSet<>();
    private Set<Demographic> girls = new HashSet<>();
    private Set<Demographic> boys = new HashSet<>();
    private Set<Demographic> youth = new HashSet<>();
    private Set<Demographic> adult = new HashSet<>();
    private Set<Demographic> all = new HashSet<>();

    private Set<ProductType> balls = new HashSet<>();
    private Set<ProductType> shoes = new HashSet<>();
    private Set<ProductType> shirts = new HashSet<>();
    private Set<ProductType> pants = new HashSet<>();
    private Set<ProductType> equipments = new HashSet<>();
    private Set<ProductType> ballAndEquipment = new HashSet<>();


    private Product product1;
    private Product product2;
    private Product product3;
    private Product product4;
    private Product product5;
    private Product product6;
    private Product product7;
    private Product product8;
    private Product product9;
    private Product product10;
    private Product product11;
    private Product product12;
    private Product product13;
    private Product product14;
    private Product product15;
    private Product product16;
    private Product product17;
    private Product product18;
    private Product product19;
    private Product product20;
    private Product product21;
    private Product product22;
    private Product product23;
    private Product product24;
    private Product product25;
    private Product product26;


    private Set<Role> employeeRoles = new HashSet<>();
    private Set<Role> adminRoles = new HashSet<>();
    private Set<Role> customerRoles = new HashSet<>();
    private Set<Role> employeeOnlyRole = new HashSet<>();
    private User firstUser;
    private User secondUser;
    private User thirdUser;
    private Address initAddress = new Address("1234 Test St", "Domino City", "CO", "12345");
    private User fourthUser;
    private User fifthUser;

    @Override
    public void run(String... args) throws Exception {
        loadRoles();
        loadCustomers();
        loadPreProducts();
        loadProducts();
    }

    private void loadRoles() {
        roleRepo.save(testAdminRole);
        roleRepo.save(testEmployeeRole);
        roleRepo.save(testCustomerRole);
        employeeRoles.add(testCustomerRole);
        employeeRoles.add(testEmployeeRole);
        adminRoles.add(testEmployeeRole);
        adminRoles.add(testAdminRole);
        customerRoles.add(testCustomerRole);
        employeeOnlyRole.add(testEmployeeRole);
    }

    private void loadCustomers() {
        firstUser = userRepo.save(new User(1,
                "Jim",
                "Jimson",
                "user@catalyte.io",
                "pass@word1",
                employeeRoles,
                initAddress,
                "111-111-1111"));
        secondUser = userRepo.save(new User(2,
                "John",
                "Johnson",
                "John@gmail.com",
                "pass@word2",
                employeeRoles,
                initAddress,
                "222-222-2222"));
        thirdUser = userRepo.save(new User(3,
                "Jill",
                "Jillson",
                "Jill@gmail.com",
                "pass@word3",
                adminRoles,
                null,
                null));
        fourthUser = userRepo.save(new User(4,
                "Eren",
                "Jagher",
                "EJhager@gmail.com",
                "titan@eradicator",
                customerRoles,
                initAddress,
                "333-666-9999"));
        fifthUser = userRepo.save(new User(5,
                "Aichi",
                "Sendou",
                "ASendou@gmail.com",
                "CF@zero",
                customerRoles,
                initAddress,
                "111-222-3333"));
        userRepo.save(new User(
                6,
                "Tommy",
                "Hilfinger",
                "admin@catalyte.io",
                "pass@word1",
                adminRoles,
                initAddress,
                "555-555-5555"
        ));
        userRepo.save(new User(
                7,
                "Busy",
                "Bee",
                "customer@catalyte.io",
                "pass@word1",
                customerRoles,
                initAddress,
                "777-555-5555"
        ));
        userRepo.save(new User(
                8,
                "Bill",
                "Burr",
                "burr@catalyte.io",
                "pass@word1",
                employeeOnlyRole,
                null,
                null
        ));
    }

    private void loadPreProducts() {

        //Saving the category repo
        catRepo.saveAndFlush(basket);
        catRepo.saveAndFlush(base);
        catRepo.saveAndFlush(running);
        catRepo.saveAndFlush(golf);
        catRepo.saveAndFlush(soccer);

        //saving the demographics repo
        demRepo.save(women);
        demRepo.saveAndFlush(men);
        demRepo.saveAndFlush(girl);
        demRepo.saveAndFlush(boy);

        //saving the product type
        prodTypeRepo.saveAndFlush(ball);
        prodTypeRepo.saveAndFlush(equipment);
        prodTypeRepo.saveAndFlush(shirt);
        prodTypeRepo.saveAndFlush(shoe);
        prodTypeRepo.saveAndFlush(pant);

        //Category type set
        basketball.add(basket);
        baseball.add(base);
        futball.add(soccer);
        run.add(running);
        run.add(base);
        golfing.add(golf);

        //Add demographic type sets
        womens.add(women);
        mens.add(men);
        girls.add(girl);
        boys.add(boy);
        youth.add(girl);
        youth.add(boy);
        adult.add(men);
        adult.add(women);
        all.add(women);
        all.add(men);
        all.add(boy);
        all.add(girl);

        //Product Type sets
        balls.add(ball);
        shoes.add(shoe);
        shirts.add(shirt);
        pants.add(pant);
        equipments.add(equipment);
        ballAndEquipment.add(ball);
        ballAndEquipment.add(equipment);
    }

    private void loadProducts() {

        product1 = prodRepo.save(
                new Product(1,
                        "professional basketball",
                        "Basketball for professionals",
                        15,
                        BASKETBALL_URL,
                        9.99,
                        adult,
                        basketball,
                        balls
                        ));
        product2 = new Product(2,
                "Youth Basketball",
                "Basketball for children.",
                10,
                BASKETBALL_URL,
                9.99,
                youth,
                basketball,
                balls
        );
        prodRepo.save(product2);
        product3 = prodRepo.save(
                new Product(3,
                        "Men's Basketball Shoes",
                        "Basketball shoes for men",
                        8,
                        MEN_SHOES_URL,
                        49.99,
                        mens,
                        basketball,
                        shoes
                        ));
        product4 = prodRepo.save(
                new Product(4,
                        "Women's Basketball Shoes",
                        "Basketball shoes for women.",
                        10,
                        WOMENS_SHOES_URL,
                        49.99,
                        womens,
                        basketball,
                        shoes
                        ));

        product5 = prodRepo.save(
                new Product(5,
                        "Girl's Basketball shoes",
                        "Basketball shoes for girls",
                        8,
                        YOUTH_SHOES_URL,
                        29.99,
                        girls,
                        basketball,
                        shoes
                        ));
        product6 = prodRepo.save(
                new Product(6,
                        "Boy's basketball shoes",
                        "Basketball shoes for boys.",
                        10,
                        YOUTH_SHOES_URL,
                        29.99,
                        boys,
                        basketball,
                        shoes
                        ));
        product7 = prodRepo.save(
                new Product(7,
                        "Men's Basketball Shirt",
                        "Basketball shirts for men",
                        3,
                        MENS_SHIRT_URL,
                        25.99,
                        mens,
                        basketball,
                        shirts
                        ));
        product8 = prodRepo.save(
                new Product(8,
                        "Women's Basketball Shirt",
                        "Basketball shirt for women.",
                        11,
                        WOMENS_SHIRT_URL,
                        25.99,
                        womens,
                        basketball,
                        shirts
                        ));
        product9 = prodRepo.save(
                new Product(9,
                        "Basketball Shirt for Youths",
                        "Basketball shirt for both boys and girls.",
                        15,
                        BASKETBALL_URL,
                        15.25,
                        youth,
                        basketball,
                        shirts
                        ));
        product10 = prodRepo.save(
                new Product(10,
                        "Soccer Ball",
                        "Soccer ball for professionals.",
                        25,
                        SOCCER_URL,
                        20.25,
                        adult,
                        futball,
                        balls
                        ));
        product11 = prodRepo.save(
                new Product(11,
                        "Soccer Ball for Children",
                        "Soccer ball for children to learn.",
                        8,
                        SOCCER_URL,
                        13.99,
                        youth,
                        futball,
                        balls
                        ));
        product12 = prodRepo.save(
                new Product(12,
                        "Men's Soccer Shoes",
                        "Soccer shoes for men. Has spikes on the bottom.",
                        14,
                        MEN_SHOES_URL,
                        39.99,
                        mens,
                        futball,
                        shoes
                        ));

        product13 = prodRepo.save(
                new Product(13,
                        "Women's Soccer Shoes",
                        "Soccer shoes for women",
                        12,
                        WOMENS_SHOES_URL,
                        39.99,
                        womens,
                        futball,
                        shoes
                        ));
        product14 = prodRepo.save(
                new Product(14,
                        "Girls Soccer Shoes",
                        "Soccer shoes for girls.",
                        12,
                        YOUTH_SHOES_URL,
                        27.99,
                        girls,
                        futball,
                        shoes
                        ));
        product15 = prodRepo.save(
                new Product(15,
                        "Boys Soccer Shoes",
                        "Soccer shoes for boys",
                        33,
                        YOUTH_SHOES_URL,
                        27.99,
                        boys,
                        futball,
                        shoes
                        ));
        product16 = prodRepo.save(
                new Product(16,
                        "Baseball Pants",
                        "Pants for running if you are a man.",
                        17,
                        MENS_PANTS_URL,
                        25.25,
                        mens,
                        run,
                        pants
                        ));
        product17 = prodRepo.save(
                new Product(17,
                        "Baseball Pants",
                        "Pants for running if you are a woman.",
                        15,
                        WOMENS_PANTS_URL,
                        25.25,
                        womens,
                        run,
                        pants
                        ));
        product18 = prodRepo.save(
                new Product(18,
                        "Baseball Pants",
                        "Pants for children to run with.",
                        20,
                        YOUTHS_PANTS_URL,
                        25.25,
                        youth,
                        run,
                        pants
                        ));
        product19 = prodRepo.save(
                new Product(19,
                        "Soccer Pants",
                        "In case you need pants.",
                        15,
                        MENS_PANTS_URL,
                        35.75,
                        womens,
                        futball,
                        pants
                        ));
        product20 = prodRepo.save(
                new Product(20,
                        "Running Shoes",
                        "Running shoes for men, and their 'tiny' feet.",
                        26,
                        WOMENS_SHOES_URL,
                        69.99,
                        mens,
                        run,
                        shoes
                        ));
        product21 = prodRepo.save(
                new Product(21,
                        "Running Shoes",
                        "Running shoes for women, and their tiny feet.",
                        26,
                        WOMENS_SHOES_URL,
                        69.99,
                        womens,
                        run,
                        shoes
                        ));
        product22 = prodRepo.save(
                new Product(22,
                        "Youth Running Shoes",
                        "Running shoes for children, and their tiny feet.",
                        10,
                        YOUTH_SHOES_URL,
                        39.99,
                        youth,
                        run,
                        shoes
                        ));
        product23 = prodRepo.save(
                new Product(23,
                        "Nine Iron Golf Club",
                        "For driving business deals.",
                        40,
                        EQUIMENT_URL,
                        75.99,
                        all,
                        golfing,
                        equipments
                        ));
        product24 = prodRepo.save(
                new Product(24,
                        "Golf Ball",
                        "Balls for golf.",
                        60,
                        BALL_URL,
                        3.99,
                        all,
                        golfing,
                        ballAndEquipment
                        ));
        product25 = prodRepo.save(
                new Product(25,
                        "Golf Tee",
                        "Tee for helping you place your golf balls.",
                        26,
                        EQUIMENT_URL,
                        2.99,
                        all,
                        golfing,
                        equipments
                        ));
        product26 = prodRepo.save(
                new Product(26,
                        "Golf Shirt",
                        "Shirts for all shapes and sizes amongst the golfers.",
                        20,
                        MENS_SHIRT_URL,
                        24.99,
                        all,
                        golfing,
                        shirts
                        ));

    }
}
