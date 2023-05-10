import { Component } from '@angular/core';

// Global
import { MENU_ITEMS } from 'global';

// Functions
import { trackItem } from '../../../shared/functions/functions';

@Component({
  selector: 'pro-grammatia-nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.scss']
})
export class NavPanelComponent {

    menuItems = MENU_ITEMS;
    trackItem = trackItem;

}
