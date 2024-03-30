package com.backend.Backend.Repositories;

import com.backend.Backend.Entities.Category;
import com.backend.Backend.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("select product from Product product where product.price >?1")
    List<Product> findAllProductsByPrice(double priceProduct);

    @Query("select product from Product product where product.name like %:nameProduct and product.price >:priceProduct")
    List<Product> findAllProductsByNamePrice(@Param("nameProduct") String nameProduct , @Param("priceProduct") double priceProduct);

    @Query("select product from Product product where product.category =?1")
    List<Product> findAllProductsByCategory(Category category);

    @Query("select product from Product product order by product.name")
    List<Product> findAllProductsByNameSort();

    List<Product> findByCategoryIdCategory(Long idCatgory);

    public List<Product> findByNameContainingIgnoreCase(String key1);
}