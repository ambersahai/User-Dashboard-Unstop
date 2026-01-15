
# User-Dashboard-Unstop
Detailed Task Breakdown:
1. Dashboard Setup:
○ Implement a UserDashboardComponent that displays:
■ A table of users (with columns: Name, Email, Role).
■ A Chart.js pie chart showing the distribution of user roles (Admin, Editor,
Viewer).
○ Add an Add User button that will trigger the opening of a lazy-loaded user form
modal.
2. Lazy Loading:
○ Implement lazy loading for:
■ The UserFormComponent (the popup form for adding new users).
■ The Chart.js library and initialization (load dynamically when the
component is initialized).
○ Use Angular's module system to ensure the UserFormComponent is
lazy-loaded only when required.
3. User Form (Popup):
○ Create a UserFormComponent (lazy-loaded) with a form containing:
■ Name (text input)
■ Email (email input)
■ Role (dropdown: Admin, Editor, Viewer)
○ Upon form submission, emit the new user data to the parent component
(UserDashboardComponent) and close the modal.
○ Ensure form validation for name, email, and role fields.
4. Data Management with RxJS:
○ Implement state management for the list of users using RxJS
BehaviorSubject.
○ The UserService should manage adding new users and emitting updated user
data.
○ The UserDashboardComponent should subscribe to the users$ observable
and update the table and chart when new users are added.
5. Dynamic Updates:
○ On adding a user:
■ Update the table with the new user data.
■ Update the chart showing the new distribution of roles (Admin, Editor,
Viewer).
6. Component Structure:
○ UserDashboardComponent: Displays the user table, chart, and controls the
visibility of the modal.
○ UserFormComponent: Lazy-loaded modal form for adding users.
○ UserService: Manages user data and emits updates using RxJS
BehaviorSubject.
