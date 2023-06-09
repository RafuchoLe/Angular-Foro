import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic.service';
import { UserService } from '../../services/user.service';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';
import { global } from '../../services/global';

import { HighlightAutoResult } from 'ngx-highlightjs';


@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers:[TopicService, UserService, CommentService]
})
export class TopicDetailComponent {
  public topic: Topic = new Topic('','','','','','','','');
  public comment: Comment;
  public identity;
  public token;
  public status;
  public url = global.url;

  response: HighlightAutoResult;
  code;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService,
    private _userService: UserService,
    private _commentService: CommentService,
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    if (this.identity != null) {
      this.comment = new Comment('','','',this.identity);
    }
  }

  ngOnInit(){
    this.getTopic();
  }

  onSubmit(form){
    
    this._commentService.add(this.token, this.comment, this.topic._id).subscribe({
      next: response =>{
        if (!response.topic) {
          this.status= 'error';
        }else{
          this.status = 'success';
          this.topic = response.topic;
          form.reset();
        }
      },
      error: error =>{
        this.status = 'error'
        console.log(error);
        
      }
    });
  }

  getTopic(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._topicService.getTopic(id).subscribe({
        next: Response => {
          if (Response.topic) {
            this.topic = Response.topic;
            this.code = this.topic.code;
          }else{
            this._router.navigate(['/inicio']);
          }
        },
        error: Error => {
          console.log(Error);
          
        }
      })
    });
  }

  onHighLight(e: HighlightAutoResult) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      secondBest: '{...}',
      value: '{...}'
    }
  }

  deleteComment(id){
    this._commentService.delete(this.token, this.topic._id, id).subscribe({
      next: response =>{
        if (!response.topic) {
          this.status= 'error';
        }else{
          this.status = 'success';
          this.topic = response.topic;
        }
      },
      error: error =>{
        this.status = 'error'
        console.log(error);
        
      }
    });
  }
}
