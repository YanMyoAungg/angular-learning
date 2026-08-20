import { Component, computed, signal } from '@angular/core';
import { MOCK_RECIPES } from './mock-recipes';
import { RecipeModel } from './models';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ title() }}</h1>
    <p><strong>Name</strong> - {{ recipe()?.name }}</p>
    <p><strong>Description</strong> - {{ recipe()?.description }}</p>
    <ul class="list-group">
      @for (ingredient of adjustedIngredients(); track ingredient.name) {
        <li class="list-group-item">
          {{ ingredient.name }} — {{ ingredient.quantity }} {{ ingredient.unit }}
        </li>
      }
    </ul>

    <br />
    @if (isFirstRecipe()) {
      <button (click)="showSecondRecipe()">Switch to Second Recipe</button>
    } @else {
      <button (click)="showFirstRecipe()">Switch to First Recipe</button>
    }
    <br />
    <br />
    <label for="servings">Servings: {{ servings() }}</label>
    <br />
    <button (click)="increment()">Increment</button> |
    <button (click)="decrement()">Decrement</button>
  `,
})
export class App {
  protected readonly isFirstRecipe = computed(() => this.recipe() === MOCK_RECIPES[0]);
  protected readonly title = signal('My Recipe Box');
  protected readonly servings = signal<number>(2);
  protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0]);
  protected showFirstRecipe = () => {
    this.recipe.set(MOCK_RECIPES[0]);
  };
  protected showSecondRecipe = () => {
    this.recipe.set(MOCK_RECIPES[1]);
  };

  protected adjustedIngredients = computed(() => {
    const currentRecipe = this.recipe();
    const currentServings = this.servings();
    return currentRecipe.ingredients.map((ingredient) => ({
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
