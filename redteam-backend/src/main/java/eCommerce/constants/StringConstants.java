package eCommerce.constants;

public class StringConstants {
    // General
    public static final String NOT_FOUND = "Not Found";
    public static final String USER_VALIDATION_FAILED = "User input is invalid.";
    public static final String UNAUTHORIZED = "Unauthorized";
    public static final String ADMIN_ROLE = "ADMIN";
    public static final String EMPLOYEE_ROLE = "EMPLOYEE";
    public static final String CUSTOMER_ROLE = "CUSTOMER";
    public static final String REQUIRED_FIELD = " is a required field.";
    public static final String EMAIL_INVALID = "Email should be a well-formed email address.";

    // User Domain
    public static final String USER_NOT_FOUND = "User not found.";
    public static final String USER_EMAIL_CONFLICT = "Email already in use.";
    public static final String PASSWORD_INVALID = "Password must exist.";

    // Product Domain
    public static final String PRODUCT_INPUT_INVALID = "The product information is invalid";
    public static final String PRODUCT_NOT_FOUND = "Product not found.";
    public static final String CATEGORY_NOT_FOUND = "Unable to retrieve products with category of ";
    public static final String DEMOGRAPHIC_NOT_FOUND = "Unable to retrieve products with demographic of ";
    public static final String TYPE_NOT_FOUND = "Unable to retrieve products with product type of ";

    // Order Domain
    public static final String ORDER_COLLECTION = "orders";
    public static final String ORDER_NOT_FOUND_LOG = "Unable to retrieve Order with id of ";
    public static final String ORDER_NOT_FOUND = "Order not found.";
    public static final String QUERY_ORDER_LOG = "Querying for orders: ";

    // Auth
    public static final String INVALID_EMAIL_PASSWORD = "Invalid email or password.";
    public static final String ISSUER = "gcapi";
    public static final String SECRET_KEY = "secret";
    public static final String CLAIMS_ATTRIBUTE = "claims";
    public static final String ROLES_ATTRIBUTE = "roles";
    public static final String ADMIN_ROLE_TYPE = "ADMIN";
    public static final String EMPLOYEE_ROLE_TYPE = "EMPLOYEE";
    public static final String CUSTOMER_ROLE_TYPE = "CUSTOMER";
    public static final String AUTHORIZATION_HEADER_NAME = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String MISSING_INVALID_ERROR = "Missing or invalid Authorization header";
}
