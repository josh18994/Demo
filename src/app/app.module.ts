import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerAppComponent } from './components/customer-app/customer-app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomerDetailComponent,
    CustomerListComponent,
    CustomerAppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CustomerDetailComponent]
})
export class AppModule { }
