package com.backend.Backend.Controllers;

import com.backend.Backend.Entities.Product;
import com.backend.Backend.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/products")
    List<Product> getAllProducts(@RequestParam(defaultValue = "")String searchKey){
        return productService.getAllProducts(searchKey);
    }

    @GetMapping("/products/{idProduct}")
    public Product getProductById(@PathVariable("idProduct") Long idProduct){
        return productService.getProductById(idProduct);
    }
    @GetMapping("/products/category/{idCategory}")
    public List<Product> getAllProductsByCategory(@PathVariable("idCategory") Long idCategory){
        return productService.findAllProductsByIdCategory(idCategory);
    }
    @PostMapping("/products/save")
    public Product createProduct(@RequestBody Product product){
            productService.saveProduct(product);

        return productService.saveProduct(product);
    }
    @PutMapping("/products/update")
    public Product updateProduct(@RequestBody Product product){
        return productService.updateProduct(product);
    }
    @DeleteMapping("/products/delete/{idProduct}")
    public void deleteProductById(@PathVariable("idProduct") Long idProduct){
        productService.deleteProductById(idProduct);
    }

    @PutMapping("/products/increment/{idProduct}")
    public Product incrementProductAmount(@PathVariable("idProduct") Long idProduct){
        return productService.incrementProductAmount(idProduct);
    }

    @PutMapping("/products/decrement/{idProduct}")
    public Product decrementProductAmount(@PathVariable("idProduct") Long idProduct){
        return productService.decrementProductAmount(idProduct);
    }

    @GetMapping("/products/low-quantity")
    public ResponseEntity<List<Product>> getProductsLowQuantity() {
        List<Product> lowQuantityProducts = productService.getProductsLowQuantity();
        return ResponseEntity.ok(lowQuantityProducts);
    }


}
