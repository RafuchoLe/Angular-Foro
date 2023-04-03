import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../../models/topic'; 
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [UserService, TopicService]
})
export class ListComponent implements OnInit{
  public page_title;
  public topics:any;
  public identity;
  public token;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService:TopicService
  ){
    this.page_title = 'Mis temas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getTopics();
  }

  getTopics(){
    let userId = this.identity._id;
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

  deleteTopic(id){
    this._topicService.delete(this.token,id).subscribe(
      Response => {
        this.getTopics();
      },
      Error => {
        console.log('Error en el servidor')
      }
    )
    
  }

}
