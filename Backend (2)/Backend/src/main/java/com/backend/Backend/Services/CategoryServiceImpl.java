package com.backend.Backend.Services;

import com.backend.Backend.Entities.Category;
import com.backend.Backend.Entities.Product;
import com.backend.Backend.Repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService{
    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories(String searchKey) {
        if(searchKey.equals("")){
            return (List<Category>) categoryRepository.findAll();
        }else {
            return (List<Category>) categoryRepository.findByCategoryContainingIgnoreCase(searchKey);
        }
    }

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategoryByID(Long id) {
        categoryRepository.deleteById(id);
    }


    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).get();
    }

    @Override
    public List<Category> findAllProductsByName(String nameCategory) {
        return categoryRepository.findAllProductsByName("TV");
    }

    @Override
    public Page<Category> getAllCategoriesByPage(int page, int size) {
        return categoryRepository.findAll(PageRequest.of(page, size));
    }
}
