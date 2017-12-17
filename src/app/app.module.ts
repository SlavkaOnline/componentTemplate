import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DynamicComponentLoader } from './components/dynamicContent/dynamicComponentLoader.component';
import { ComponentCreatorDirective } from './components/directives/componentCreator.directive';
import { BackgroundDirective } from './components/directives/background.directive';
import { ApiService } from './services/api.services';

@NgModule({
  declarations: [
    AppComponent,
    DynamicComponentLoader,
    ComponentCreatorDirective,
    BackgroundDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
