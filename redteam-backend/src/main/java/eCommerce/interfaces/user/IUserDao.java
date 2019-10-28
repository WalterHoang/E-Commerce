package eCommerce.interfaces.user;

import eCommerce.entities.User;

import java.util.List;
import java.util.Optional;

public interface IUserDao {
    List<User> getUsers();
    List<User> getUsersByPhone(String phoneNum);
    Optional<User> findUserByEmail(String email);
    Optional<User> getUserById(Integer id);
    User createNewUser(User user);
    User updateUser(Integer id, User user);
    void removeUser(Integer id);
}
