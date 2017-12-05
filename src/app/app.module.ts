import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { DynamicComponentLoader } from './components/dynamicContent/dynamicComponentLoader.component';
import { ComponentCreatorDirective } from './components/directives/componentCreator.directive';

@NgModule({
  declarations: [
    AppComponent,
    DynamicComponentLoader,
    ComponentCreatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
