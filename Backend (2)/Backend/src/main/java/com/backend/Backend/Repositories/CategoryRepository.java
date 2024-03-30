package com.backend.Backend.Repositories;

import com.backend.Backend.Entities.Category;
import com.backend.Backend.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("select category from Category category where category.category like %:name%")
    List<Category> findAllProductsByName(@Param("name") String nameCategory);

    List<Category> findByCategoryContainingIgnoreCase(String key1);
}