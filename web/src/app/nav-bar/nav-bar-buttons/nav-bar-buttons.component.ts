import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavBarButton } from '../../models/nav-bar-button.model';
import { DEFAULT_NAV_BAR_BUTTONS } from '../../constants/nav-bar.constants';

@Component({
  selector: 'app-nav-bar-buttons',
  imports: [
    RouterLink
  ],
  templateUrl: './nav-bar-buttons.component.html',
  styleUrl: './nav-bar-buttons.component.scss'
})
export class NavBarButtonsComponent {
  @Input()
    buttons: NavBarButton[] = DEFAULT_NAV_BAR_BUTTONS;
}
