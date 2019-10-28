package eCommerce.data;


import eCommerce.entities.User;
import eCommerce.interfaces.user.IUserDao;
import eCommerce.interfaces.user.RoleRepository;
import eCommerce.interfaces.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class UserDao implements IUserDao {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getUsersByPhone(String phoneNum) {
        return userRepository.findAllByPhone(phoneNum);
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        return Optional.of(userRepository.findByEmail(email)).orElse(null);
    }

    @Override
    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public User createNewUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Integer id, User user) {
        User currentUser = userRepository.findById(id).orElse(null);
        if (currentUser == null){
            return null;
        }
        user.setId(id);
        return userRepository.save(user);
    }

    @Override
    public void removeUser(Integer id) {
        userRepository.deleteById(id);
    }
}
