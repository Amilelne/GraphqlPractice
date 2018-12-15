import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphQLModule } from './graphql.module';
import { MaterialsComponent } from './materials/materials.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AddMaterialComponent } from './add-material/add-material.component';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);

const appRoutes: Routes = [
  { path: 'recipes', component: RecipesComponent },
  { path: 'materials', component: MaterialsComponent },
  { path: 'addrecipe', component: AddRecipeComponent },
  { path: 'addmaterial', component: AddMaterialComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MaterialsComponent,
    RecipesComponent,
    AddRecipeComponent,
    AddMaterialComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GraphQLModule,
    ClipboardModule,
    FormsModule,
    NgbAlertModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgZorroAntdModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {}
