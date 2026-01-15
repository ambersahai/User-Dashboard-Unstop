import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([
    {
      name: 'Amber',
      email: 'amber@test.com',
      role: 'Admin',
      department: 'Engineering',
      active: true,
    },
    {
      name: 'Mamta',
      email: 'mamta@test.com',
      role: 'Editor',
      department: 'Marketing',
      active: false,
    },
    {
      name: 'Ujjval',
      email: 'ujjval@test.com',
      role: 'Viewer',
      department: 'Sales',
      active: true,
    },
    {
      name: 'Shubham',
      email: 'subham@test.com',
      role: 'Admin',
      department: 'Engineering',
      active: false,
    },
    {
      name: 'Aman',
      email: 'aman@test.com',
      role: 'Editor',
      department: 'Marketing',
      active: false,
    },
    {
      name: 'Anya',
      email: 'anya@test.com',
      role: 'Viewer',
      department: 'Sales',
      active: true,
    },
    {
      name: 'Huraya',
      email: 'huraya@test.com',
      role: 'Viewer',
      department: 'Sales',
      active: true,
    },
  ]);

  private selectedDepartmentSubject = new BehaviorSubject<string | null>(null);

  users$ = this.usersSubject.asObservable();
  selectedDepartment$ = this.selectedDepartmentSubject.asObservable();

  filteredUsers$ = combineLatest([this.users$, this.selectedDepartment$]).pipe(
    map(([users, dept]) =>
      dept ? users.filter((u) => u.department === dept) : users
    )
  );

  addUser(user: User) {
    this.usersSubject.next([...this.usersSubject.value, user]);
  }

  selectDepartment(dept: string | null) {
    this.selectedDepartmentSubject.next(dept);
  }
}
