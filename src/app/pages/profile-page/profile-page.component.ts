import { Component, ViewChild } from '@angular/core';
import { ResetPasswordPageComponent } from '../reset-password-page/reset-password-page.component';
import { ITweeter } from 'src/app/models/tweeter.model';
import { IUser } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  @ViewChild(ResetPasswordPageComponent)
  settingsModal!:  ResetPasswordPageComponent

  tweeters?: ITweeter[];
  user?: IUser;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) {
    var id: number = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!);
    // Get user
    this.dataService.getUserById(id).subscribe((response: IUser) => {
      this.user = response;
      // After user is recieved, get all user's tweets
      this.dataService.getAllTweetsByUser(this.user!.username!).subscribe((response: ITweeter[]) => {
        this.tweeters = response;
     });
    })
  }

  public isMyProfile(): boolean {
    console.log("in isMyProfile")
    var routeId: number = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!);
    var token: string = localStorage.getItem("loginToken")!
    var username = jwtDecode(token).sub!;
    if (this.user?.username === username || this.user?.email === username) { 
      return true;
    }
    return false;
  }


}



