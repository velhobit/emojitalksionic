import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonIcon, IonItem, IonLabel, IonList, IonText } from '@ionic/angular/standalone';
import * as marked from 'marked';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { chatboxEllipsesOutline, heart, heartOutline } from 'ionicons/icons';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'card-feed',
  templateUrl: './card-feed.component.html',
  styleUrls: ['./card-feed.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonList, IonItem, IonIcon, IonText, IonLabel, IonAvatar, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonChip, IonButton, FormsModule]
})
export class CardFeedComponent  implements OnInit {
  @Input("post") post?: any | undefined;

  constructor(private router:Router, private postService: PostService) {
    addIcons({chatboxEllipsesOutline, heart, heartOutline});
  }

  ngOnInit() {}

  convertMarkdownToHtml(markdown: string): string {
    return marked.parse(markdown).toString();
  }

  like(postId: string) {
      this.postService.like(postId).subscribe({
        next: response => {
            this.post.is_liked = true;
            this.post.likes_count++;
        },
        error: err => {
          console.error('Erro ao curtir o post', err);
        }
      });
    }

    dislike(postId: string) {
      this.postService.dislike(postId).subscribe({
        next: response => {
            this.post.is_liked = false;
            this.post.likes_count--;
        },
        error: err => {
          console.error('Erro ao remover o like', err);
        }
      });
    }

  goTo(uuid: string) {
    this.router.navigate(['post', uuid]);
  }
}
