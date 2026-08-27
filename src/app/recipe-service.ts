import { Service, signal } from '@angular/core';
import { RecipeModel } from './models';
import { MOCK_RECIPES } from './mock-recipes';

@Service()
export class RecipeService {
  private readonly recipes = signal<RecipeModel[]>(MOCK_RECIPES);
  private readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0]);

  getRecipes() {
    return this.recipes;
  }
  getRecipe() {
    return this.recipe;
  }
}
