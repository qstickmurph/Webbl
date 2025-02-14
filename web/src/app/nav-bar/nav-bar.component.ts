import { Component } from '@angular/core';

import { NavBarButtonsComponent } from './nav-bar-buttons/nav-bar-buttons.component';

@Component({
  selector: 'nav-bar',
  imports: [
    NavBarButtonsComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

}
