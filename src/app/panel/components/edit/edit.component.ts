import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../../models/topic'; 
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';
@Component({
  selector: 'app-edit',
  templateUrl: '../add/add.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService, TopicService]
})
export class EditComponent implements OnInit{
  public page_title;
  public topic:Topic;
  public identity;
  public token;
  public status;
  public is_edit = true;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService:TopicService
  ){
    this.page_title = ' Editar tema';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.topic = new Topic('','','','','','',this.identity._id,null);
  }
  ngOnInit(){
    this.getTopic();
  }

  onSubmit(form){
    let id = this.topic._id;
    this._topicService.update(this.token, id, this.topic).subscribe(
      Response => {
        if (Response.topic) {
          this.status = 'success';
          this.topic = Response.topic;
        }else{
          this.status = 'error';
        }
      },
      Error => {
        this.status = 'error';
        console.log(Error);
        
      }
    )    
  }

  getTopic(){
    this._route.params.subscribe((params: Params)=>{
      let id = params['id'];
      console.log(params);

      this._topicService.getTopic(id).subscribe(
        Response =>{
          if (!Response.topic) {
            this._router.navigate(['/panel'])
          }else {
            this.topic = Response.topic;
          }
        }, Error =>{
          console.log(Error);
          
        })
      
    })
  }
}
