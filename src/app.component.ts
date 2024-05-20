import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<h1>{{ title }}</h1>
  <app-flight-search></app-flight-search>
  `,
})
export class AppComponent {
  title = 'FlightSearchApp';
}
