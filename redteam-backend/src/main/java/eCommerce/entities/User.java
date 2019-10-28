package eCommerce.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Table(name = "sahara_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(notes = "", name = "Id", value = "Auto-generated Id for user record.")
    private Integer id;

    @NotNull
    @Column(name = "firstName")
    @ApiModelProperty(name = "First Name", required = true, example = "John", value = "A user's first name.")
    private String firstName;

    @NotNull
    @Column(name = "lastName")
    @ApiModelProperty(name = "Last Name", required = true, example = "Smith", value = "A user's last name.")
    private String lastName;


    @Column(name = "phone")
    @ApiModelProperty(name = "Phone", example = "111-222-3333", value = "A user's phone number. Required for customers")
    private String phone;

    @NotNull
    @Column(name = "email")
    @ApiModelProperty(name = "Email", required = true, example = "example@example.com", value = "A user's email.")
    private String email;

    @NotNull
    @Column(name = "password")
    @ApiModelProperty(name = "Password", required = true, example = "password", value = "A user's password.")
    private String password;

    @ManyToMany
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(
                    name = "user_id",
                    referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id",
                    referencedColumnName = "id")

    )
    @ApiModelProperty(name = "roles", required = true, example = "{id:1}", value = "A set of user roles.")
    @JsonIgnoreProperties({"users"})
    private Set<Role> role;


    @ApiModelProperty(name = "address", value = "A user's address consisting of street, city, state abbreviation, and zip code. Required for customers")
    private Address address;

    public User() {
    }

    public User(Integer id,
                String firstName,
                String lastName,
                String email,
                String password, Set<Role> role, Address address, String phone) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.address = address;
        this.phone = phone;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRole() {
        return role;
    }

    public void setRole(Set<Role> role) {
        this.role = role;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
