import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonRow, IonText, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { PostService, Post } from 'src/app/services/post.service';
import * as marked from 'marked';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonIcon, IonText, IonLabel, IonAvatar, IonButton]
})
export class FeedPage implements OnInit {
  feed: Post[] = [];
  constructor(private postService: PostService, private router: Router, private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.loadFeed();
  }

  loadFeed() {
    this.postService.getPosts().subscribe((data) => {
      this.feed = data;
    });
  }

  convertMarkdownToHtml(markdown: string): string {
    return marked.parse(markdown).toString();
  }

  goTo(uuid: string) {
    this.router.navigate(['post', uuid]);
  }
}
