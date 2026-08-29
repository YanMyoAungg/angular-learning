import { Component, computed, inject, input, signal } from '@angular/core';
import { RecipeModel } from '../models';
import { RecipeService } from '../recipe-service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
  imports: [RouterLink],
})
export class RecipeDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly recipeService = inject(RecipeService);

  protected readonly recipe = computed(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return Number.isNaN(id) ? undefined : this.recipeService.getOneRecipe(id);
  });
  protected readonly servings = signal<number>(1);

  protected adjustedIngredients = computed(() => {
    const currentRecipe = this.recipe();
    const currentServings = this.servings();
    return currentRecipe?.ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: ingredient.quantity * currentServings,
    }));
  });

  protected increment = () => {
    this.servings.update((current) => current + 1);
  };
  protected decrement = () => {
    this.servings.update((current) => Math.max(current - 1, 0));
  };
}
