import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonRow, IonText, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { PostService, Post } from 'src/app/services/post.service';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import * as marked from 'marked';
import { Router } from '@angular/router';
import { NewPostComponent } from 'src/app/components/new-post/new-post.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonFab, IonFabButton, IonIcon, IonText, IonLabel, IonAvatar, IonButton]
})
export class FeedPage implements OnInit {
  feed: Post[] = [];
  constructor(private postService: PostService, private router: Router, private modalCtrl: ModalController) {
    addIcons({ add });
  }

  ngOnInit() {
    this.loadFeed();
  }

  loadFeed() {
    this.postService.getPosts().subscribe((data) => {
      this.feed = data;
    });
  }

  async openNewPost() {
    const modal = await this.modalCtrl.create({
      component: NewPostComponent,
      cssClass: 'new-post',
      mode: 'ios',
      backdropDismiss: false,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
  }

  convertMarkdownToHtml(markdown: string): string {
    return marked.parse(markdown).toString();
  }

  goTo(uuid: string) {
    this.router.navigate(['post', uuid]);
  }
}
