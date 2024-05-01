import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITweeter } from '../models/tweeter.model';
import { IReply } from '../models/reply.model';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private BASE_URL = 'http://localhost:9090';
  private TWEETER_CONTROLLER = "/api/v1.0/tweeters";
  private AUTH_CONTROLLER = "/api/v1.0/tweets";
  private REPLY_CONTROLLER = "/api/v1.0/replies";

  constructor(private http: HttpClient) { }

   
   getAllTweets(): Observable<ITweeter[]> {
    return this.http.get<ITweeter[]>(`${this.BASE_URL}${this.TWEETER_CONTROLLER}/all`);
  }

  getAllTweetsByUser(username: string): Observable<ITweeter[]> {
    return this.http.get<ITweeter[]>(`${this.BASE_URL}${this.TWEETER_CONTROLLER}/user/${username}`);
  }

  postTweet(tweeter: ITweeter, username: string): Observable<ITweeter> {
    return this.http.post<ITweeter>(`${this.BASE_URL}${this.TWEETER_CONTROLLER}/${username}/add`, tweeter);
  }

  updateTweet(tweeter: ITweeter, username: string): Observable<ITweeter> {
    return this.http.put<ITweeter>(`${this.BASE_URL}${this.TWEETER_CONTROLLER}/${username}/update`, tweeter);
  }

  deleteTweet(tweetId: number, username: string): Observable<ITweeter> {
    return this.http.delete<ITweeter>(`${this.BASE_URL}${this.TWEETER_CONTROLLER}/${username}/delete/${tweetId}`);
  }

  updateLikeTweet(tweetId: number, username: string): Observable<ITweeter> {
    return this.http.put<ITweeter>(`${this.BASE_URL}${this.TWEETER_CONTROLLER}/${username}/like/${tweetId}`, null);
  }

  getAllReplies(username: string, tweetId: number): Observable<IReply[]> {
    return this.http.get<IReply[]>(`${this.BASE_URL}${this.REPLY_CONTROLLER}/${username}/${tweetId}`);
  }

  postReply(reply: IReply, username: string, tweetId: number): Observable<IReply> {
    return this.http.post<IReply>(`${this.BASE_URL}${this.REPLY_CONTROLLER}/${username}/${tweetId}`, reply);
  }

  likeReply(replyId: number, username: string): Observable<IReply> {
    return this.http.put<IReply>(`${this.BASE_URL}/${username}/${replyId}/like`, null)
  }

  getUserById(userId: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.BASE_URL}${this.AUTH_CONTROLLER}/users/id/${userId}`)
  }

  getUserByName(username: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.BASE_URL}${this.AUTH_CONTROLLER}/users/username/${username}`)
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.BASE_URL}${this.AUTH_CONTROLLER}/users`)
  }
}
