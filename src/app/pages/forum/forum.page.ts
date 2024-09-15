import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonRow, IonText, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { PostService, Post } from 'src/app/services/post.service';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import * as marked from 'marked';
import { ActivatedRoute, Router } from '@angular/router';
import { NewPostComponent } from 'src/app/components/new-post/new-post.component';
import { ForumService } from 'src/app/services/forum.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonFab, IonFabButton, IonIcon, IonText, IonLabel, IonAvatar, IonButton]
})
export class ForumPage implements OnInit {
  posts: Post[] = [];
  forumAlias?: any = "";
  forum: any = "";
  constructor(private forumService: ForumService, private router: Router, private activateRoute: ActivatedRoute, private modalCtrl: ModalController, private globalService: GlobalService) {
    this.forumAlias = this.activateRoute.snapshot.paramMap.get('alias');
    addIcons({ add });
  }

  ngOnInit() {
    this.loadPosts(this.forumAlias);
  }

  loadPosts(alias: string) {
    this.forumService.getPosts(alias).subscribe((data) => {
      this.forum = data.forum;
      this.posts = data.posts;
      this.globalService.setForum(this.forum);
    });
  }

  convertMarkdownToHtml(markdown: string): string {
    return marked.parse(markdown).toString();
  }

  goTo(uuid: string) {
    this.router.navigate(['post', uuid]);
  }

}
