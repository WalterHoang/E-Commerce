package eCommerce.services.validation;

import eCommerce.entities.Role;
import eCommerce.entities.User;

import java.util.regex.Pattern;

import static eCommerce.constants.StringConstants.CUSTOMER_ROLE_TYPE;

public class UserValidation {


    public Boolean validateUserData(User user) {

        return !(user.getFirstName() == null || user.getFirstName().isEmpty())
                && !(user.getLastName() == null || user.getLastName().isEmpty())
                && !(user.getRole() == null || user.getRole().isEmpty())
                && (user.getEmail() != null && Pattern.matches("^[\\w-_.+]*[\\w-_.]@([\\w]+\\.)+[\\w]+[\\w]$", user.getEmail()))
                && !(user.getPassword() == null || user.getPassword().isEmpty())
                && validateCustomerData(user);
    }

    private String[] usStateCodes = {"AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC",
            "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO",
            "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
            "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"};


    private boolean usCodeValidate(String usCode) {
        usCode = usCode.toUpperCase();
        for (String usStateCodes : usStateCodes) {
            if (usCode.equals(usStateCodes)) {
                return true;
            }
        }
        return false;
    }

    private Boolean validateCustomerData(User user) {

        for (Role role : user.getRole().stream().toArray(Role[]::new)) {
            if (role.getRole().matches(CUSTOMER_ROLE_TYPE)) {
                return (user.getAddress() != null)
                        && !user.getAddress().getCity().isEmpty()
                        && !user.getAddress().getStreet().isEmpty()
                        && !user.getAddress().getState().isEmpty()
                        && Pattern.matches("^[0-9]{5}(?:-[0-9]{4})?$", user.getAddress().getZip())
                        && usCodeValidate(user.getAddress().getState())
                        && Pattern.matches("[0-9]{3}-[0-9]{3}-[0-9]{4}", user.getPhone());
            }else{
                if (user.getPhone() != null) {
                    if (!Pattern.matches("[0-9]{3}-[0-9]{3}-[0-9]{4}", user.getPhone())) {
                        return false;
                    }
                }

                if (user.getAddress() != null) {
                    if (!(!user.getAddress().getCity().isEmpty()
                            && !user.getAddress().getStreet().isEmpty()
                            && !user.getAddress().getState().isEmpty()
                            && Pattern.matches("^[0-9]{5}(?:-[0-9]{4})?$", user.getAddress().getZip())
                            && usCodeValidate(user.getAddress().getState())))
                    {
                        return false;
                    }
                }
            }

        }
        return true;
    }
}
