import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPopover, IonRow, IonTitle, IonToolbar, ModalController, ToastController } from '@ionic/angular/standalone';
import { EmojiService } from 'src/app/services/emoji.service';
import { ForumService } from 'src/app/services/forum.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-select-forum',
  templateUrl: './select-forum.component.html',
  styleUrls: ['./select-forum.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, CommonModule, IonButton, IonInput, IonPopover, FormsModule, IonButtons]
})
export class SelectForumComponent implements OnInit {
  forums: any = {};
  emojisDB: any = {};
  emojiList: any[] = [];
  filteredEmojiList: any[] = [];
  searchValue?: string;
  constructor(private forumService: ForumService, private toastController: ToastController, private emojiService: EmojiService, private globalService: GlobalService, private modalController: ModalController) { }

  ngOnInit() {
    this.getEmojis();
    this.getValidEmojis();
  }

  async showForumName(name:string){
    const toast = await this.toastController.create({
      header: name,
      cssClass: "ion-text-center",
      color: "primary",
      mode: "ios",
      buttons: [],
    });
    toast.present();
  }

  async hideForumName(){
    this.toastController.dismiss();
  }

  getEmojis(){
    this.emojiService.getEmojis().subscribe(data=>{
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
          this.emojiList.push({ emoji: emoji.emoji, alias: forum.alias, title: forum.name, forum: forum.uuid , forumDetails: forum});
        });
      });

      this.emojiList = this.globalService.shuffleArray(this.emojiList);
      this.filteredEmojiList = this.emojiList;
    });
  }

  async closeMe(forum: any, emoji: string){
    await this.globalService.setForum(forum);
    await this.globalService.setEmoji(emoji);
    await this.modalController.dismiss();
  }

  async closeAllModals() {
    const topModal = await this.modalController.getTop();
    while (topModal) {
      await this.modalController.dismiss();
      const topModal = await this.modalController.getTop();
    }
  }
}
