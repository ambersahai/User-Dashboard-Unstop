import { Component } from '@angular/core';
import { UserDashboardComponent } from './dashboard/user-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserDashboardComponent],
  template: `<app-user-dashboard></app-user-dashboard>`
})
export class AppComponent {}
