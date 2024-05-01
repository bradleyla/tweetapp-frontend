import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Tweeter } from 'src/app/models/tweeter.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-tweeter',
  templateUrl: './new-tweeter.component.html',
  styleUrls: ['./new-tweeter.component.css']
})
export class NewTweeterComponent {

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {

  }
  
  creatingTweeter: boolean = false;
  tweeterData = this.fb.group({
    message: [null, [Validators.maxLength(144)]],
    tag: [null, []]
  })

  tweeter: Tweeter = new Tweeter("");

  public toggleCreation() {
    this.creatingTweeter = !this.creatingTweeter;
  }


  public onTweeterCreate() {
   
    console.log(this.tweeter)
    var token: string = localStorage.getItem("loginToken")!
    var username = jwtDecode(token).sub!;
    this.dataService.postTweet(this.tweeter, username).subscribe((response) => {
      console.log(response);
      console.log(username)
      location.reload();
    })
    this.creatingTweeter = false;
  }
}
