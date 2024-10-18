import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCol, IonContent, IonGrid, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonRow, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { CardFeedComponent } from 'src/app/components/card-feed/card-feed.component';
import { Post, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, CommonModule, FormsModule, IonGrid, IonRow, IonCol, PageHeaderComponent, CardFeedComponent, IonInfiniteScroll, IonInfiniteScrollContent]
})
export class NewsPage implements OnInit {
  feed: Post[] = [];
  currentPage: number = 1;
  limit: number = 10;

  constructor(private postService: PostService, private modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.loadFeed(this.currentPage);
  }

  loadFeed(page: number, ev: any = false) {
    this.postService.getPosts(page, this.limit).subscribe((posts: Post[]) => {
      this.feed = [...this.feed, ...posts];
      if(ev){
        ev.target.complete();
      }
    });
  }

  nextPage(ev:any): void {
    this.currentPage++;
    this.loadFeed(this.currentPage, ev);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadFeed(this.currentPage);
    }
  }
}
