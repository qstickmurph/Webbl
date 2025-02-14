import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nav-bar-button',
  imports: [RouterLink],
  templateUrl: './nav-bar-button.component.html',
  styleUrl: './nav-bar-button.component.scss'
})
export class NavBarButtonComponent {
  @Input({required: true})
    title: string = '';

  @Input({required: true})
    link: string = '';
}
