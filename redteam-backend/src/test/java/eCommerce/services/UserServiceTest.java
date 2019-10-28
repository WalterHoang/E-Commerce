package eCommerce.services;

import eCommerce.data.UserDao;
import eCommerce.entities.Address;
import eCommerce.entities.Role;
import eCommerce.entities.User;
import eCommerce.exceptions.BadRequest;
import eCommerce.exceptions.ConflictError;
import eCommerce.exceptions.FriendlyServerErrorException;
import eCommerce.exceptions.NotFound;
import eCommerce.interfaces.user.RoleRepository;
import eCommerce.interfaces.user.UserRepository;
import org.junit.*;
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
public class UserServiceTest {
    // Mocks the layers below the one we're testing
    @Mock
    UserDao mockUserDao;
    @Mock
    UserRepository mockUserRepo;
    @Mock
    RoleRepository mockRoleRepo;

    // Inject mocks into service class
    @InjectMocks
    UserService userService;

    private static User testEmployee;
    private static User testAdmin;
    private static User testCustomer;
    private static User invalidUser;
    private static Role testEmployeeRole;
    private static Role testAdminRole;
    private static Role testCustomerRole;
    private static Set<Role> employeeRoles = new HashSet<>();
    private static Set<Role> adminRoles = new HashSet<>();
    private static Set<Role> customerRoles = new HashSet<>();
    private static Address testAddress;
    private static List<User> users = new ArrayList<>();
    private static List<User> customers = new ArrayList<>();


    @Before
    public void before() {
        testAdminRole = new Role("ADMIN");
        mockRoleRepo.save(testAdminRole);
        testEmployeeRole = new Role("EMPLOYEE");
        mockRoleRepo.save(testEmployeeRole);
        testCustomerRole = new Role("CUSTOMER");
        mockRoleRepo.save(testCustomerRole);
        employeeRoles.add(testEmployeeRole);
        adminRoles.add(testEmployeeRole);
        adminRoles.add(testAdminRole);
        customerRoles.add(testCustomerRole);
        testAddress = new Address("7777 Erebonia Ct", "Trista", "NY", "25277-7777");
        testEmployee = new User(1, "Walter", "Hoang", "whoang@catalyte.io", "pass@word2", employeeRoles, null, null);
        testAdmin = new User(2, "Bruce", "Wayne", "BWayne@Gotham.com", "DefNBatman", adminRoles, null, null);
        testCustomer = new User(3, "Rean", "Schwarzer", "RSchwarzer@Erebonia.com", "Numbah1Fisherman", customerRoles, testAddress, "252-777-7777");
        invalidUser = new User(4, "", "", "", "", null, null, "");
        users.add(testEmployee);
        users.add(testAdmin);
        users.add(testCustomer);
        customers.add(testCustomer);
    }

    @Test
    public void createUsers() {
        Mockito.when(mockUserDao.createNewUser(testEmployee)).thenReturn(testEmployee);
        Mockito.when(mockUserDao.createNewUser(testAdmin)).thenReturn(testAdmin);
        Mockito.when(mockUserDao.createNewUser(testCustomer)).thenReturn(testCustomer);

        ResponseEntity<User> expectedEmployee = new ResponseEntity<>(testEmployee, HttpStatus.CREATED);
        ResponseEntity<User> expectedAdmin = new ResponseEntity<>(testAdmin, HttpStatus.CREATED);
        ResponseEntity<User> expectedCustomer = new ResponseEntity<>(testCustomer, HttpStatus.CREATED);

        assertEquals("Testing add employee failed: ", expectedEmployee, userService.createNewUser(testEmployee));
        assertEquals("Testing add admin failed: ", expectedAdmin, userService.createNewUser(testAdmin));
        assertEquals("Testing add customer failed: ", expectedCustomer, userService.createNewUser(testCustomer));
    }

    @Test(expected = BadRequest.class)
    public void CreateUserBadRequest() {
        userService.createNewUser(invalidUser);
    }

    @Test(expected = ConflictError.class)
    public void CreateUserConflict() {
        Mockito.when(mockUserDao.findUserByEmail(testCustomer.getEmail())).thenReturn(Optional.of(testCustomer));
        userService.createNewUser(testCustomer);
    }

    @Test
    public void getUsers() {
        // set up mock returns
        Mockito.when(mockUserDao.getUsers()).thenReturn(users);
        Mockito.when(mockUserDao.getUserById(1)).thenReturn(java.util.Optional.ofNullable(testEmployee));
        Mockito.when(mockUserDao.findUserByEmail(testCustomer.getEmail())).thenReturn(Optional.of(testCustomer));
        Mockito.when(mockUserDao.getUsersByPhone(testCustomer.getPhone())).thenReturn(customers);
        // set up results
        ResponseEntity<List<User>> expectedUsers = new ResponseEntity<>(users, HttpStatus.OK);
        ResponseEntity<User> expectedUser = new ResponseEntity<>(testEmployee, HttpStatus.OK);
        ResponseEntity<List<User>> expectedCustomers = new ResponseEntity<>(customers, HttpStatus.OK);
        ResponseEntity<User> expectedEmailCustomer = new ResponseEntity<>(testCustomer, HttpStatus.OK);
        // perform asserts
        assertEquals("Testing get users failed: ", expectedUsers, userService.getUsers());
        assertEquals("Testing get user by id failed: ", expectedUser, userService.getUserById(1));
        assertEquals("Testing get customers by phone# failed: ", expectedCustomers, userService.getUsersByPhone(testCustomer.getPhone()));
        assertEquals("Testing get user by email failed: ", expectedEmailCustomer, userService.findUserByEmail(testCustomer.getEmail()));
    }

    @Test(expected = NotFound.class)
    public void getUserByIdError() {
        userService.getUserById(999);
    }

    @Test(expected = NotFound.class)
    public void getUserByPhoneError() {
        userService.getUsersByPhone("");
    }

    @Test(expected = NotFound.class)
    public void getUserByEmailError() {
        userService.findUserByEmail("");
    }

    @Test
    public void updateUser() {
        User newUser = new User(1, "Jona", "Jokerson", "user@catalyte.io", "pass@word1", employeeRoles, null, null);
        Mockito.when(mockUserDao.updateUser(1, newUser)).thenReturn(newUser);
        Mockito.when(mockUserDao.getUserById(1)).thenReturn(Optional.of(newUser));
        Mockito.when(mockUserDao.findUserByEmail(newUser.getEmail())).thenReturn(Optional.of(newUser));
        ResponseEntity<User> expectedUpdate = new ResponseEntity<>(newUser, HttpStatus.OK);

        assertEquals("Testing update user failed: ", expectedUpdate, userService.updateUser(1, newUser));
    }
    @Test(expected = NotFound.class)
    public void updateUserNotFound(){
        Mockito.when(mockUserDao.getUserById(1)).thenThrow(NotFound.class);
        Mockito.when(mockUserDao.getUserById(1).isPresent()).thenReturn(false);
        userService.updateUser(1,testEmployee);
    }
    @Test(expected = ConflictError.class)
    public void updateUserConflict(){
        Mockito.when(mockUserDao.getUserById(3)).thenReturn(Optional.of(testCustomer));
        Mockito.when(mockUserDao.findUserByEmail(testEmployee.getEmail())).thenReturn(Optional.of(testEmployee));
        userService.updateUser(3, testEmployee);
    }
    @Test(expected = BadRequest.class)
    public void updateUserBadRequestWInvalid(){
        Mockito.when(mockUserDao.getUserById(3)).thenReturn(Optional.of(testCustomer));
        userService.updateUser(3,invalidUser);
    }
    @Test
    public void zRemoveUser() {
        Mockito.when(mockUserDao.getUserById(1)).thenReturn(Optional.of(testEmployee));
        userService.removeUser(1);
    }
    @Test(expected = NotFound.class)
    public void zRemoveUserNotFound(){
        userService.removeUser(999);
    }
    @Test(expected = FriendlyServerErrorException.class)
    public void createUserDBex(){
        Mockito.when(mockUserDao.createNewUser(testCustomer)).thenThrow(ServerErrorException.class);
        userService.createNewUser(testCustomer);
    }
    @Test(expected = FriendlyServerErrorException.class)
    public void updateUserDBex(){
        Mockito.when(mockUserDao.getUserById(1)).thenThrow(ServerErrorException.class);
        userService.updateUser(1,testCustomer);
    }
    @Test(expected = FriendlyServerErrorException.class)
    public void zRemoveUserDBex() {
        Mockito.when(mockUserDao.getUserById(1)).thenThrow(ServerErrorException.class);
        userService.removeUser(1);
    }
}