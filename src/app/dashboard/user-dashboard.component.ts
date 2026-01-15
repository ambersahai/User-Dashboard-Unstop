import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  /** All users (used for department counts) */
  allUsers: User[] = [];

  /** Filtered users (used for table + charts) */
  users: User[] = [];

  showForm = false;

  roleChart: any;
  statusChart: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.initCharts();
    this.userService.selectDepartment(null);

    this.userService.users$.subscribe((users) => {
      this.allUsers = users;
    });

    this.userService.filteredUsers$.subscribe((users) => {
      this.users = users;
      this.updateCharts(users);
    });
  }

  async initCharts() {
    if (this.roleChart || this.statusChart) return;

    const ChartModule = await import('chart.js/auto');
    const Chart = ChartModule.default;

    this.roleChart = new Chart('roleChart', {
      type: 'pie',
      data: {
        labels: ['Admin', 'Editor', 'Viewer'],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ['#1c4980', '#383838', '#9e9e9e'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
      },
    });

    this.statusChart = new Chart('statusChart', {
      type: 'pie',
      data: {
        labels: ['Active', 'Inactive'],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ['#1c4980', '#cfcfcf'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
      },
    });
  }

  updateCharts(users: User[]) {
    if (!this.roleChart || !this.statusChart) return;

    const roleCount = { Admin: 0, Editor: 0, Viewer: 0 };
    const statusCount = { Active: 0, Inactive: 0 };

    users.forEach((user) => {
      roleCount[user.role]++;
      user.active ? statusCount.Active++ : statusCount.Inactive++;
    });

    this.roleChart.data.datasets[0].data = Object.values(roleCount);
    this.statusChart.data.datasets[0].data = Object.values(statusCount);

    this.roleChart.update();
    this.statusChart.update();
  }

  // Filters
  filterByDepartment(dept: string) {
    this.userService.selectDepartment(dept);
  }

  resetFilter() {
    this.userService.selectDepartment(null); // Show All
  }

  getDepartmentCount(dept: string): number {
    return this.allUsers.filter((u) => u.department === dept).length;
  }

  async openForm() {
    await import('../user-form/user-form.component');
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }
}
