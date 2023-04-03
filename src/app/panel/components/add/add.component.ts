import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../../models/topic'; 
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, TopicService]
})
export class AddComponent {
  public page_title;
  public topic:Topic;
  public identity;
  public token;
  public status;
  public is_edit = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService:TopicService
  ){
    this.page_title = ' Crear nuevo tema';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('','','','','','',this.identity._id,null);
  }

  onSubmit(form){
    this._topicService.addTopic(this.token, this.topic).subscribe(
      Response => {
        if (Response.topic) {
          this.status = 'success';
          this.topic = Response.topic;
          this._router.navigate(['/panel']);
        }else{
          this.status = 'error'
        }

      },
      Error =>{
        this.status = 'error';
        console.log(Error);
        
      }
    )
    
  }
}
