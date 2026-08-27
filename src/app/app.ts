import { Component } from '@angular/core';
import { RecipeList } from './recipe-list/recipe-list';

@Component({
  selector: 'app-root',
  imports: [RecipeList],
  templateUrl: './app.html',
})
export class App {}
