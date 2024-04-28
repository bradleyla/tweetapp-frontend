import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent {
  showUsersList: boolean = false;
  users: any[] = [];

  constructor(private authService: AuthService) {
    this.authService.getAllUsers().subscribe((response: any[]) => {
      this.users = response;
    });
  }

  toggleUsersList() {
    this.showUsersList = !this.showUsersList;
  }
}
