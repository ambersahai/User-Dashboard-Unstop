export interface User {
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  department: 'Engineering' | 'Marketing' | 'Sales';
  active: boolean;
}
