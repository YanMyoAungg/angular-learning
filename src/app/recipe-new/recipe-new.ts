import { Component, inject, signal } from '@angular/core';
import { RecipeService } from '../recipe-service';
import { Router } from '@angular/router';
import { form, required, FormField, submit, email } from '@angular/forms/signals';
import { RecipeModel } from '../models';

@Component({
  selector: 'app-recipe-new',
  imports: [FormField],
  templateUrl: './recipe-new.html',
  styleUrl: './recipe-new.css',
})
export class RecipeNew {
  protected readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);

  protected readonly recipeModel = signal({
    name: '',
    description: '',
    authorEmail: '',
  });

  protected readonly recipeForm = form(this.recipeModel, (schema) => {
    required(schema.name, { message: 'Name is required' });
    required(schema.description, { message: 'Description is required' });
    required(schema.authorEmail, { message: "Author's email is required" });
    email(schema.authorEmail, { message: 'Invalid email' });
  });

  protected async save(event: Event): Promise<void> {
    event.preventDefault();
    await submit(this.recipeForm, async () => {
      const { name, description, authorEmail } = this.recipeForm().value();
      const newRecipe: RecipeModel = {
        name,
        description,
        authorEmail,
        imgUrl: 'https://blocks.astratic.com/img/general-img-portrait.png',
        ingredients: [],
        isFavorite: false,
      };
      this.recipeService.addRecipe(newRecipe);
      this.recipeForm().reset();
      this.recipeModel.set({ name: '', description: '', authorEmail: '' });
      this.router.navigate(['/recipes']);
    });
  }
}
