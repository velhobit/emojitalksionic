import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { PostService, Post } from 'src/app/services/post.service';
import * as marked from 'marked';
import { ActivatedRoute } from '@angular/router';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonFab, IonFabButton, IonIcon, IonText, IonLabel, IonAvatar, PageHeaderComponent]
})
export class PostPage implements OnInit {
  uuid: string | null;
  post?: Post;
  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
  }

  ngOnInit() {
    this.loadFeed();
  }

  loadFeed() {
    if (this.uuid) {
      this.postService.getPost(this.uuid).subscribe(
        (data) => {
          this.post = data;
        },
        (error) => {
          //console.error(error);
          alert(error.error);
        }
      );
    }
  }

  convertMarkdownToHtml(markdown: string): string {
    return marked.parse(markdown).toString();
  }
}
