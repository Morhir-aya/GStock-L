package com.backend.Backend.Controllers;

import com.backend.Backend.Entities.Category;
import com.backend.Backend.Entities.Product;
import com.backend.Backend.Repositories.CategoryRepository;
import com.backend.Backend.Services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class CategoryController {
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    CategoryService categoryService;

    @GetMapping("/categories")
    public List<Category> getAllCategories(@RequestParam(defaultValue = "")String searchKey){
        return categoryService.getAllCategories(searchKey);
    }
    @GetMapping(value = "/categories/{id}")
    public Category getCategoryById(@PathVariable("id") Long id){
        return categoryRepository.findById(id).get();
    }

    @PostMapping("/categories/save")
    public Category createCategory(@RequestBody Category category){
        return categoryService.saveCategory(category);
    }

    @DeleteMapping("/categories/delete/{idProduct}")
    public void deleteProductById(@PathVariable("idProduct") Long idProduct){
        categoryService.deleteCategoryByID(idProduct);
    }

    @PutMapping("/categories/update")
    public Category updateProduct(@RequestBody Category category){
        return categoryService.updateCategory(category);
    }
}


