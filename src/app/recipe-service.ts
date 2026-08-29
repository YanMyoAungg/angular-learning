import { Service, signal } from '@angular/core';
import { RecipeModel } from './models';
import { MOCK_RECIPES } from './mock-recipes';

@Service()
export class RecipeService {
  private readonly recipes = signal<RecipeModel[]>(MOCK_RECIPES);
  private readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0]);
  nextId = this.recipes().length > 0 ? Math.max(...this.recipes().map((recipe) => recipe.id!)) : 0;

  getRecipes() {
    return this.recipes;
  }
  getRecipe() {
    return this.recipe;
  }
  getOneRecipe(id: number) {
    return this.recipes().find((recipe) => recipe.id === id);
  }

  addRecipe(newRecipe: RecipeModel) {
    const currentRecipes = this.recipes();
    this.recipes.update(() => [...currentRecipes, { ...newRecipe, id: ++this.nextId }]);
  }
}
