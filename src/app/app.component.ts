import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'reservations';

  constructor(private router: Router) {}

  fistForm() {
    this.router.navigate(['main']);
  }

  secondForm() {
    this.router.navigate(['second']);
  }
}
