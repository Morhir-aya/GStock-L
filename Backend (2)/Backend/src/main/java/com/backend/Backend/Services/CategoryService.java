package com.backend.Backend.Services;

import com.backend.Backend.Entities.Category;
import com.backend.Backend.Entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public interface CategoryService {
    List<Category> getAllCategories(String searchKey);
    Category saveCategory(Category category);
    Category updateCategory(Category category);
    void deleteCategoryByID(Long id);
    Category getCategoryById(Long id);
    List<Category> findAllProductsByName(@Param("nameProduct") String nameProduct);
    Page<Category> getAllCategoriesByPage(int page, int size);
}
