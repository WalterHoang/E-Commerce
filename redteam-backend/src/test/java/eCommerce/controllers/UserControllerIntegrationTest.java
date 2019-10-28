package eCommerce.controllers;

import eCommerce.entities.Address;
import eCommerce.entities.Role;
import eCommerce.entities.User;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.google.gson.Gson;
import org.junit.*;
import org.junit.runners.MethodSorters;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.context.support.GenericWebApplicationContext;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.ServletContext;
import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@RunWith(SpringRunner.class)
@SpringBootTest()
@AutoConfigureMockMvc
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class UserControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private WebApplicationContext wac;
    private static User testEmployee;
    private static User testAdmin;
    private static User testCustomer;
    private static Address testAddress = new Address("1234 Test st",
            "Test City",
            "CA",
            "12345-6789");
    private static Role employeeRole = new Role(1, "EMPLOYEE");
    private static Role adminRole = new Role(2, "ADMIN");
    private static Role customerRole = new Role(3, "CUSTOMER");
    private static Set<Role> employeeRoles = new HashSet<>();
    private static Set<Role> adminRoles = new HashSet<>();
    private static Set<Role> customerRoles = new HashSet<>();

    @Before
    public void before() {
        mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
        MockitoAnnotations.initMocks(this);

        employeeRoles.add(employeeRole);
        adminRoles.add(employeeRole);
        adminRoles.add(adminRole);
        customerRoles.add(customerRole);

//Ids will be what is on here +5 if the dataloader is used
        testAdmin = new User(1,
                "Walter",
                "Hoang",
                "whoang@catalyte.io",
                "pass@word1",
                adminRoles,
                null,
                null);
        testCustomer = new User(2,
                "Estelle",
                "Bright",
                "EBright@gmail.com",
                "Strega#1",
                customerRoles,
                testAddress,
                "123-456-7890");
        testEmployee = new User(3,
                "Clark",
                "Kent",
                "CKent@catalyte.io",
                "DefNotSMan",
                employeeRoles,
                null,
                null);
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
    public void testGetAllUsers() throws Exception {
        mockMvc.perform(get("/users"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(5)));
    }

    @Test
    public void testCreateAdmin() throws Exception {
        Gson gson = new Gson();
        String json = gson.toJson(testAdmin);
        mockMvc.perform(post("/users/signUp").contentType(APPLICATION_JSON_UTF8)
                .content(json))
                .andExpect(status().isCreated());
    }

    @Test
    public void testCreateCustomer() throws Exception {
        Gson gson = new Gson();
        String json = gson.toJson(testCustomer);
        mockMvc.perform(post("/users/signUp").contentType(APPLICATION_JSON_UTF8)
                .content(json))
                .andExpect(status().isCreated());
    }

    @Test
    public void testCreateEmployee() throws Exception {
        Gson gson = new Gson();
        String json = gson.toJson(testEmployee);
        mockMvc.perform(post("/users/signUp").contentType(APPLICATION_JSON_UTF8)
                .content(json))
                .andExpect(status().isCreated());
    }

    @Test
    public void testUpdateEmployee() throws Exception {
        Gson gson = new Gson();
        String json = gson.toJson(testEmployee);



        mockMvc.perform(post("/users").contentType(APPLICATION_JSON_UTF8)
                .content(json));

        testEmployee.setFirstName("Wally");
        testEmployee.setId(testEmployee.getId());
        String jsony = gson.toJson(testEmployee);

        mockMvc.perform(put("/users/" + testEmployee.getId()) // With the dataloader, we have a user
                .contentType(APPLICATION_JSON_UTF8)
                .content(jsony))
                .andExpect(status().isOk());
        // confirm name is updated
        mockMvc.perform(get("/users/" + testEmployee.getId()))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value(testEmployee.getFirstName()));
    }

    @Test
    public void testZDeleteEmployee() throws Exception {
        Gson gson = new Gson();
        testEmployee.setFirstName("Wally");
        String json = gson.toJson(testEmployee);

        mockMvc.perform(post("/users").contentType(APPLICATION_JSON_UTF8)
                .content(json));

        mockMvc.perform(delete("/users/" + testEmployee.getId()));

        // confirm employee is deleted
        mockMvc.perform(get("/users"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4))); // We should have 5 users in the dataloader initially
    }

}