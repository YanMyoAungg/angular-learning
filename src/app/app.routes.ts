import { Routes } from '@angular/router';
import { RecipeList } from './recipe-list/recipe-list';
import { RecipeDetail } from './recipe-detail/recipe-detail';
import { RecipeNew } from './recipe-new/recipe-new';

export const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipeList },
  { path: 'recipes/new', component: RecipeNew },
  { path: 'recipes/:id', component: RecipeDetail },
];
