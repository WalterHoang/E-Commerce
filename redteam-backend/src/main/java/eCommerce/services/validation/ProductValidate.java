package eCommerce.services.validation;

import eCommerce.entities.Product;

public class ProductValidate {
    public Boolean validateProductData(Product product) {
        return !(product.getName() == null || product.getName().isBlank())
                && !(product.getUrl() == null || product.getUrl().isBlank())
                && (product.getQuantity() != null && product.getQuantity() > 0)
                && (product.getPrice() != null)
                && (product.getPrice() > 0)
                && !(product.getDescription() == null || product.getDescription().isBlank())
                && (product.getDemographic() != null)
                && (product.getProductType() != null)
                && (product.getCategory() != null);
    }
}
