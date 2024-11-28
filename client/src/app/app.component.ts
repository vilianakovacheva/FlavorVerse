import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/core/header/header.component";
import { FooterComponent } from "./components/core/footer/footer.component";
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from "./components/about-us/about-us.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HomeComponent, AboutUsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
