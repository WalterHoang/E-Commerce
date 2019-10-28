package eCommerce.services.validation;

import eCommerce.entities.Address;
import eCommerce.entities.Role;
import eCommerce.entities.User;
import org.junit.Before;
import org.junit.Test;

import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.*;

public class UserValidationTest {

    private Role custRole = new Role(3,"CUSTOMER");
    private Role empRole = new Role(2,"EMPLOYEE");
    private Role adminRole = new Role(1,"ADMIN");

    private Set<Role> cust = new HashSet<>();
    private Set<Role> admin = new HashSet<>();
    private Set<Role> emp = new HashSet<>();
    private Set<Role> custOremp = new HashSet<>();

    private UserValidation userValid = new UserValidation();

    private Address address;
    private User user;

    @Before
    public void setUp() throws Exception {
        cust.add(custRole);
        admin.add(adminRole);
        emp.add(empRole);

        custOremp.add(custRole);
        custOremp.add(empRole);

        address = new Address("123 Test", "Testing","AZ","86001");

        user = new User(1,
                "Test",
                "Test",
                "test@test.test",
                "test@test1",
                cust,
                address,
                "123-456-7890");
    }

    @Test
    public void validateCustUserDataHappy() {
        assertTrue(userValid.validateUserData(user));
    }

    @Test
    public void validateCustUserDataSadAddress() {
        user.setAddress(null);
        assertFalse(userValid.validateUserData(user));
    }

    @Test
    public void validateCustUserDataSad() {
        user.setFirstName(null);
        assertFalse(userValid.validateUserData(user));

        user.setFirstName("Test");
        user.setEmail(null);
        assertFalse(userValid.validateUserData(user));

        user.setEmail("test@test.com");
        user.setPassword(null);
        assertFalse(userValid.validateUserData(user));

        user.setPassword("pass@word1");
        user.setPhone("234-5678");
        assertFalse(userValid.validateUserData(user));


        user.setPhone("(123)234-5678");
        assertFalse(userValid.validateUserData(user));

        user.setPhone("123-234-567");
        assertFalse(userValid.validateUserData(user));

        user.setPhone("123-234-5678");
        user.setLastName(null);
        assertFalse(userValid.validateUserData(user));


        user.setLastName("Test");
        user.setRole(null);
        assertFalse(userValid.validateUserData(user));
    }

    @Test
    public void validateEmpUserDataHappy() {
        user.setRole(emp);
        assertTrue(userValid.validateUserData(user));
    }

    @Test
    public void validateEmpUserDataHappyEmpties() {
        user.setRole(emp);
        user.setAddress(null);
        assertTrue(userValid.validateUserData(user));

        user.setPhone(null);
        assertTrue(userValid.validateUserData(user));
    }

    @Test
    public void validateEMPUserDataSad() {
        user.setRole(emp);

        user.setFirstName(null);
        assertFalse(userValid.validateUserData(user));

        user.setFirstName("Test");
        user.setEmail(null);
        assertFalse(userValid.validateUserData(user));

        user.setEmail("test@test.com");
        user.setPassword(null);
        assertFalse(userValid.validateUserData(user));

        user.setPassword("pass@word1");
        user.setPhone("234-5678");
        assertFalse(userValid.validateUserData(user));


        user.setPhone("(123)234-5678");
        assertFalse(userValid.validateUserData(user));

        user.setPhone("123-234-567");
        assertFalse(userValid.validateUserData(user));

        user.setPhone("123-234-5678");
        user.setLastName(null);
        assertFalse(userValid.validateUserData(user));


        user.setLastName("Test");
        user.setRole(null);
        assertFalse(userValid.validateUserData(user));
    }
    @Test
    public void validateADMUserDataHappy() {
        user.setRole(admin);
        assertTrue(userValid.validateUserData(user));
    }

    @Test
    public void validateADMUserDataHappyEmpties() {
        user.setRole(admin);
        user.setAddress(null);
        assertTrue(userValid.validateUserData(user));

        user.setPhone(null);
        assertTrue(userValid.validateUserData(user));
    }

    @Test
    public void validateADMUserDataSad() {
        user.setRole(admin);

        user.setFirstName(null);
        assertFalse(userValid.validateUserData(user));

        user.setFirstName("Test");
        user.setEmail(null);
        assertFalse(userValid.validateUserData(user));

        user.setEmail("test@test.com");
        user.setPassword(null);
        assertFalse(userValid.validateUserData(user));

        user.setPassword("pass@word1");
        user.setPhone("234-5678");
        assertFalse(userValid.validateUserData(user));


        user.setPhone("(123)234-5678");
        assertFalse(userValid.validateUserData(user));

        user.setPhone("123-234-567");
        assertFalse(userValid.validateUserData(user));

        user.setPhone("123-234-5678");
        user.setLastName(null);
        assertFalse(userValid.validateUserData(user));


        user.setLastName("Test");
        user.setRole(null);
        assertFalse(userValid.validateUserData(user));
    }
    @Test
    public void validateCUSTOREMPUserDataHappy() {
        user.setRole(custOremp);
        assertTrue(userValid.validateUserData(user));
    }

    @Test
    public void validateCUSTOREMPUserDataHappyEmpties() {
        user.setRole(custOremp);

        user.setAddress(null);
        assertFalse(userValid.validateUserData(user));
    }

    @Test
    public void validateCUSTOREMPUserDataSad() {
        user.setRole(custOremp);

        user.setFirstName(null);
        assertFalse(userValid.validateUserData(user));

        user.setFirstName("Test");
        user.setEmail(null);
        assertFalse(userValid.validateUserData(user));

        user.setEmail("test@test.com");
        user.setPassword(null);
        assertFalse(userValid.validateUserData(user));

        user.setPassword("pass@word1");
        user.setPhone("234-5678");
        assertFalse(userValid.validateUserData(user));


        user.setPhone("(123)234-5678");
        assertFalse(userValid.validateUserData(user));

        user.setPhone("123-234-567");
        assertFalse(userValid.validateUserData(user));

        user.setPhone("123-234-5678");
        user.setLastName(null);
        assertFalse(userValid.validateUserData(user));


        user.setLastName("Test");
        user.setRole(null);
        assertFalse(userValid.validateUserData(user));
    }
}