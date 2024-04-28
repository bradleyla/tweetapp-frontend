import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() toggleUserList = new EventEmitter<boolean>();
  @Output() toggleSearchList = new EventEmitter<boolean>();
  constructor(private router: Router, public authService: AuthService, public searchService: SearchService) { }

  toggleUserListVisible() {
    this.toggleUserList.emit(true);
    if(this.toggleSearchList) {
      this.toggleSearchList.emit(false);
    }
  }

  toggleUserListInvisible() {
    this.toggleUserList.emit(false);
  }

  searchForUser(value: string) {
    this.toggleSearchList.emit(true);
    this.searchService.setSearchResult(value);
    if(this.toggleUserList) {
      this.toggleUserList.emit(false);
    }
  }

  toggleSearchListInvisible() {
    this.toggleSearchList.emit(false);
  }

  onResetPassword() {
    this.router.navigateByUrl('resetpassword');
  }

  onLogin() {
    this.router.navigateByUrl('login');
  }

  onLogout() {
    localStorage.clear();
  }

}
