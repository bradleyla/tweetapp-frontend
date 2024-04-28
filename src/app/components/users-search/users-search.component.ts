import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.css'],
})
export class UsersSearchComponent {
  showUsersList: boolean = false;
  user: IUser | null = {} as IUser;
  username: any;
  email: any;
  message = '';
  alertClass = '';
  private searchResultSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private searchService: SearchService
  ) {this.searchResultSubscription = new Subscription();}

  ngOnInit(): void {

    this.searchResultSubscription = this.searchService.getSearchResult().subscribe((newResult: any) => {
      this.message = '';
      this.alertClass = 'd.none';
      if(newResult.includes('@')) {
        if (this.email !== newResult) {
          this.email = newResult;
        }

        this.authService.getUserByEmail(this.email).subscribe((emailResponse: any) => {
          this.user = emailResponse;
          console.log(this.user);
        }, (error: any) => {
          console.log(error);
          this.message = "Search failed, no users found. Please try again.";
          this.alertClass = 'alert alert-danger';
          this.user = null;
        });

      } else {
        if (this.username !== newResult) {
          this.username = newResult;
        }

        this.authService.getUserByUsername(this.username).subscribe((response: any) => {
          this.user = response;
          console.log(this.user);
        }, (error: any) => {
          console.log(error);
          this.message = "Search failed, no users found. Please try again.";
          this.alertClass = 'alert alert-danger';
          this.user = null;
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.searchResultSubscription) {
      this.searchResultSubscription.unsubscribe();
    }
  }

  toggleUsersList() {
    this.showUsersList = !this.showUsersList;
  }
}