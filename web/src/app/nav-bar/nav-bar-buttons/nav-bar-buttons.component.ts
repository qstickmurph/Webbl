import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import { defaultNavBarButtonsConstant } from '../../constants/nav-bar-constants';
import { NavBarButton } from '../../models/nav-bar-button.model';

@Component({
  selector: 'app-nav-bar-buttons',
  imports: [
    NgFor,
    RouterLink
  ],
  templateUrl: './nav-bar-buttons.component.html',
  styleUrl: './nav-bar-buttons.component.scss'
})
export class NavBarButtonsComponent {
  @Input()
    buttons: NavBarButton[] = defaultNavBarButtonsConstant;
}
