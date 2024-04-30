import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Reply } from 'src/app/models/reply.model';
import { ITweeter } from 'src/app/models/tweeter.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-reply',
  templateUrl: './new-reply.component.html',
  styleUrls: ['./new-reply.component.css']
})
export class NewReplyComponent {
  @Input() tweeter!: ITweeter;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {}

  creatingReply: boolean = false;
  replyData = this.fb.group({
    replyMessage: [null, [Validators.maxLength(144)]],
    tag: [null, []]
  });
  
  reply: Reply = new Reply();
  public toggleCreation() {
    this.creatingReply = !this.creatingReply;
  }

  public onReplyCreate() {
    console.log("New Reply");
    var token: string = localStorage.getItem("loginToken")!
    var username = jwtDecode(token).sub!;
    this.dataService.postReply(this.reply, username, this.tweeter.tweetId!).subscribe((response) => {
      console.log(response);
      console.log(username);
      location.reload();
    });

    this.replyData.reset();
    this.creatingReply = false;
  }
}
