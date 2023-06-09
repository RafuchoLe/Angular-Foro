import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router'; 
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { TopicService } from '../../services/topic.service';
import { Topic } from '../../models/topic';
import { global } from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, TopicService]
})
export class ProfileComponent implements OnInit{

    public topics: Topic[];
    public user:User;
    public url:string;
    constructor(
      private _userService: UserService,
      private _topicService:TopicService,
      private _router: Router,
      private _route:ActivatedRoute,
    ){
      this.url = global.url;
    }

    ngOnInit(): void {
      this._route.params.subscribe(params =>{
        let userId = params['id'];
        this.getUser(userId);
        this.getTopics(userId);
      })
    }

    getProfile(){}

    getUser(userId){
      this._userService.getUser(userId).subscribe({
        next: Response =>{
          if (Response.user) {
            this.user = Response.user;
          }
        },
        error: Error =>{
          console.log(Error);
          
        }
      })
    }
    
    getTopics(userId){
    this._topicService.getTopicsByUser(userId).subscribe(
      Response => {
        if (Response.topics) {
          this.topics = Response.topics;
        }
      },
      Error => {
        console.log(Error);
        
      }
    )

  }
  }
