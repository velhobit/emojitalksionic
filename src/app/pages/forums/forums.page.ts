import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonText, ToastController, ModalController, IonInput, IonPopover, IonItem, IonRouterOutlet } from '@ionic/angular/standalone';
import { ForumService } from '../../services/forum.service'
import { GlobalService } from 'src/app/services/global.service';
import { EmojiService } from 'src/app/services/emoji.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { chatboxEllipsesOutline } from 'ionicons/icons';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.page.html',
  styleUrls: ['./forums.page.scss'],
  standalone: true,
 imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, CommonModule, IonButton, IonInput, IonPopover, FormsModule, PageHeaderComponent, IonItem, IonRouterOutlet]
})
export class ForumsPage implements OnInit {
  forums: any = {};
  emojisDB: any = {};
  emojiList: any[] = [];
  filteredEmojiList: any[] = [];
  searchValue?: string;
  loggedIn: boolean = false;

  constructor(private forumService: ForumService, private toastController: ToastController, private emojiService: EmojiService, private globalService: GlobalService, private modalController: ModalController, private router: Router) {
    addIcons({chatboxEllipsesOutline});
  }

  ngOnInit() {
    this.getEmojis();
    this.getValidEmojis();
  }

  async showForumName(name: string) {
    const toast = await this.toastController.create({
      header: name,
      cssClass: "ion-text-center",
      color: "primary",
      mode: "ios",
      buttons: [],
    });
    toast.present();
  }

  async hideForumName() {
    this.toastController.dismiss();
  }

  getEmojis() {
    this.emojiService.getEmojis().subscribe(data => {
      this.emojisDB = data;
    });
  }

  filterForums() {
    if (this.searchValue) {
      const searchTerm = this.searchValue.toLowerCase();

      this.filteredEmojiList = this.emojiList.filter((emoji: any) => {
        return emoji.emoji.toLowerCase().includes(searchTerm) ||
          emoji.alias.toLowerCase().includes(searchTerm) ||
          emoji.title.toLowerCase().includes(searchTerm);
      });
    } else {
      this.filteredEmojiList = this.emojiList;
    }
  }

  getValidEmojis() {
    this.forumService.getForums().subscribe(data => {
      this.forums = data;

      this.forums.forEach((forum: any) => {
        forum.forum_emojis.forEach((emoji: any) => {
          this.emojiList.push({ emoji: emoji.emoji, alias: forum.alias, title: forum.name, forum: forum.uuid, forumDetails: forum });
        });
      });

      this.emojiList = this.globalService.shuffleArray(this.emojiList);
      this.filteredEmojiList = this.emojiList;
    });
  }

 goTo(alias: string) {
   this.router.navigate(["forums", alias]);
 }
}
