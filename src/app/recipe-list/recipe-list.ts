import { Component, computed, effect, inject, signal } from '@angular/core';
import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeModel } from '../models';
import { RecipeDetail } from '../recipe-detail/recipe-detail';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../recipe-service';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-recipe-list',
  imports: [FormsModule, RouterLink, MatButton],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  protected readonly isFirstRecipe = computed(() => this.recipe() === MOCK_RECIPES[0]);
  protected readonly title = signal('My Recipe Box');
  protected readonly recipe = inject(RecipeService).getRecipe();
  protected readonly recipes = inject(RecipeService).getRecipes();

  protected readonly search = signal<string>('');

  constructor() {
    effect(() => {
      console.log('Recipes updated:', this.recipes());
    });
  }

  protected filteredRecipes = computed(() => {
    const searchTerm = this.search().toLowerCase().trim();
    return this.recipes().filter((recipe) => recipe.name.toLowerCase().includes(searchTerm));
  });

  protected showFirstRecipe = () => {
    if (this.filteredRecipes().length > 0) {
      this.recipe.set(this.filteredRecipes()[0]);
    } else {
      this.recipe.set(MOCK_RECIPES[0]);
    }
  };
  protected showSecondRecipe = () => {
    if (this.filteredRecipes().length > 1) {
      this.recipe.set(this.filteredRecipes()[1]);
    } else {
      this.recipe.set(MOCK_RECIPES[1]);
    }
  };
}
