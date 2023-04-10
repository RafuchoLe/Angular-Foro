import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from 'src/app/models/topic';

import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers:[TopicService]
})
export class TopicsComponent implements OnInit{
  public page_title;
  public topics;
  public totalPages;
  public page;
  public next_page;
  public prev_page;
  public number_pages;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ){
    this.page_title = 'Temas'
  }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      let page = +params['page'];
      if (!page) {
        page = 1;
        this.prev_page = 1;
        this.next_page = 2;
      }
      this.getTopics(page);
    })
  }

  getTopics(page =1){
    this._topicService.getTopics(page).subscribe({
      next: Response => {
        if (Response.topics) {
          this.topics = Response.topics;

          //navegacoinde de aginacion
          this.totalPages = Response.totalPages;

          let number_pages:number[] = [];
          for (let i = 1; i <= this.totalPages; i++) {
            number_pages.push(i);
          }
          this.number_pages = number_pages;
          console.log(this.number_pages);
          

          if (page >= 2) {
            this.prev_page = page-1;
          }else{
            this.prev_page = 1;
          }

          if (page < this.totalPages) {
            this.next_page = page+1;
          }else{
            this.next_page = this.totalPages;
          }
          
        }else{
          this._router.navigate(['/inicio']);

        }
      },
      error: Error => {
        console.log(Error);
        
      }
    })
  }
}
