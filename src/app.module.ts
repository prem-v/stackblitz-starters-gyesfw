import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule

import { AppComponent } from './app.component';
import { FlightSearchComponent } from './app/flight-search/flight-search.component';
import { FlightDialogComponent } from './app/flight-dialog/flight-dialog.component';
import { CitiesService } from './cities.service';

@NgModule({
  declarations: [AppComponent, FlightSearchComponent, FlightDialogComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule, // Add MatIconModule to imports
  ],
  providers: [CitiesService],
  bootstrap: [FlightSearchComponent],
})
export class AppModule {}
