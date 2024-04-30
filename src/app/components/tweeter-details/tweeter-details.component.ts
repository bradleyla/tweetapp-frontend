import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { IReply } from 'src/app/models/reply.model';
import { ITweeter } from 'src/app/models/tweeter.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tweeter-details',
  templateUrl: './tweeter-details.component.html',
  styleUrls: ['./tweeter-details.component.css']
})
export class TweeterDetailsComponent {
  tweeter?: ITweeter;
  defaultTweeter: ITweeter = {
    message: '',
    likes: 0
  }; 
  replies: IReply[] = [];

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    const state = window.history.state;

    if (state && state.tweeter) {
      this.tweeter = state.tweeter;
    } else {
      console.error('Tweet information is not available.');
      return;
    }

    var token: string = localStorage.getItem("loginToken")!
    const username = jwtDecode(token).sub || '';

    if (!username) {
      console.error('Login ID is not available.');
      return;
    }

    if (!this.tweeter || this.tweeter.tweetId === undefined) {
      console.error('Tweet information is not available.');
      return;
    }

    this.dataService.getAllReplies(username, this.tweeter.tweetId).subscribe(
      (response: IReply[]) => {
        // Log the response data for debugging
        console.log(response);
        this.replies = response;
      },
      error => {
        console.error('Error fetching replies:', error);
        // Handle error appropriately, such as displaying an error message to the user
      }
    );


  }
}
  
