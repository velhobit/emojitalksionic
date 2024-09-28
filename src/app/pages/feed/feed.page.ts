import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonGrid, IonCol, IonContent, IonHeader, IonRow, IonTitle, ModalController } from '@ionic/angular/standalone';
import { PostService, Post } from 'src/app/services/post.service';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { CardFeedComponent } from 'src/app/components/card-feed/card-feed.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, CommonModule, FormsModule, IonGrid, IonRow, IonCol, PageHeaderComponent, CardFeedComponent]
})
export class FeedPage implements OnInit {
  feed: Post[] = [];
  constructor(private postService: PostService, private modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.loadFeed();
  }

  loadFeed() {
    this.postService.getPosts().subscribe((data) => {
      this.feed = data;
    });
  }
}
