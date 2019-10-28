package eCommerce.entities;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.util.HashSet;
import java.util.Set;

import static eCommerce.constants.StringConstants.REQUIRED_FIELD;


@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(name = "Id", required = true, example = "1", value = "A role's id")
    private Integer id;

    @NotNull(message = "Role" + REQUIRED_FIELD)
    @ApiModelProperty(name = "Role", required = true, example = "EMPLOYEE", value = "A role assigned to a user.")
    private String role;

    @ManyToMany(mappedBy = "role")
    @ApiModelProperty(name = "users", required = true, value = "A set of users associated with the role.")
    private Set<User> users = new HashSet<>();

    public Role(){

    }

    public Role(String role){
        this.role = role;
    }

    public Role(Integer id, String role) {
        this.id = id;
        this.role = role;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
