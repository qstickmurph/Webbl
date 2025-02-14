import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

import { defaultNavBarButtonsConstant } from '../../constants/nav-bar-constants';
import { NavBarButton } from '../../models/nav-bar-button.model';
import { NavBarButtonComponent } from './nav-bar-button/nav-bar-button.component';

@Component({
  selector: 'nav-bar-buttons',
  imports: [
    NavBarButtonComponent,
    NgFor
  ],
  templateUrl: './nav-bar-buttons.component.html',
  styleUrl: './nav-bar-buttons.component.scss'
})
export class NavBarButtonsComponent {
  @Input()
    buttons: NavBarButton[] = defaultNavBarButtonsConstant;
}
