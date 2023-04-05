import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from 'src/app/models/topic';

import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers:[TopicService]
})
export class TopicDetailComponent {
  public topic: Topic = new Topic('','','','','','','','');
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ){
  }

  ngOnInit(){
    this.getTopic();
  }

  getTopic(){
    this._route.params.subscribe(params => {
      let id = params['id'];
       this._topicService.getTopic(id).subscribe(
        Response => {
          if (Response.topic) {
            this.topic = Response.topic;
          }else{
            this._router.navigate(['/inicio']);
          }
        },
        Error => {
          console.log(Error);
          
        }
       )
    });
  }
}
