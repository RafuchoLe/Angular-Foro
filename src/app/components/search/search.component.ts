import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from 'src/app/models/topic';

import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-search',
  templateUrl: '../topics/topics.component.html',
  styleUrls: ['./search.component.css'],
  providers:[TopicService],
})
export class SearchComponent implements OnInit{
  public page_title;
  public topics: Topic[];
  public noPaginate;
  public next_page;
  public prev_page;
  public number_pages;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ){
    this.page_title = 'Buscar: ';
    this.noPaginate = true;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let search = params['search'];
      this.page_title = this.page_title+ search;
      this.getTopics(search);
    })
  }

  getTopics(search){
    this._topicService.search(search).subscribe({
      next: Response =>{
        if (Response.topics) {
          this.topics = Response.topics;
        }
      },
      error: Error =>{
        throw new Error(Error);
        
      }
    });
  }
}
