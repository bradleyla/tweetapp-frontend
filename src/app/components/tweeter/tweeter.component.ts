import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ITweeter } from 'src/app/models/tweeter.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tweeter',
  templateUrl: './tweeter.component.html',
  styleUrls: ['./tweeter.component.css']
})
export class TweeterComponent {
  @Input() tweeter!: ITweeter;

  constructor(private router: Router, private dataService: DataService) {
        
  }
  routeToTweetInfo(tweet: ITweeter): void {
    console.log("Routing to tweet info");
    const currentUrl = this.router.url; // Get current URL
    const tweetInfoUrl = '/tweetinfo';

    // Check if the current route is already the tweet info page
    if (currentUrl !== tweetInfoUrl) {
      this.router.navigate([tweetInfoUrl], { state: { tweet } });
    } else {
      console.log("Already on tweet info page.");
    }
  }

}
