import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonList, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem]
})
export class FeedPage implements OnInit {
  feed: any[] = [];
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.loadFeed();
  }

  loadFeed(){
    this.postService.getPosts().subscribe((data)=>{
      this.feed = data;
    });
  }

}
