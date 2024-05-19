import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CitiesService } from '../../cities.service';
import { Observable, of } from 'rxjs';
import { FlightDialogComponent } from '../flight-dialog/flight-dialog.component';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
})
export class FlightSearchComponent implements OnInit {
  flightForm: FormGroup;
  cities$: Observable<{ name: string; value: string }[]> = of([]);

  constructor(
    private fb: FormBuilder,
    private citiesService: CitiesService,
    private dialog: MatDialog
  ) {
    this.flightForm = this.fb.group(
      {
        departureCity: ['', Validators.required],
        destinationCity: ['', Validators.required],
        departDate: ['', [Validators.required, this.dateValidator()]],
        returnDate: ['', [Validators.required, this.dateValidator()]],
      },
      { validators: this.cityValidator }
    );
  }

  ngOnInit() {
    this.cities$ = this.citiesService.getCities();
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set the time to 00:00:00 for comparison
      return selectedDate >= today ? null : { invalidDate: true };
    };
  }

  cityValidator: ValidatorFn = (
    group: AbstractControl
  ): { [key: string]: any } | null => {
    const departureCity = group.get('departureCity')?.value;
    const destinationCity = group.get('destinationCity')?.value;
    if (!departureCity || !destinationCity) {
      return null; // Ignore validation if either city is not selected
    }
    return departureCity === destinationCity ? { sameCity: true } : null;
  };

  swapCities() {
    const departureCity = this.flightForm.get('departureCity')?.value;
    const destinationCity = this.flightForm.get('destinationCity')?.value;
    this.flightForm.patchValue({
      departureCity: destinationCity,
      destinationCity: departureCity,
    });
  }

  onSubmit() {
    if (this.flightForm.valid) {
      this.dialog.open(FlightDialogComponent, {
        data: {
          title: 'Success',
          message: 'Happy Jetting!',
        },
      });
    } else {
      console.log('Form errors', this.flightForm.errors);
    }
  }
}
