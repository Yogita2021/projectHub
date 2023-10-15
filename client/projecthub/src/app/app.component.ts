import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'projecthub';
  showNavbar: boolean = true;

  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe((segments) => {
      // Hide the navbar on the registration page
      this.showNavbar = segments[0].path !== 'homepage';
    });
  }
}
