import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonRow, IonSegment, IonSegmentButton, IonText, IonTextarea, ModalController } from '@ionic/angular/standalone';
import Quill from 'quill';
import * as marked from 'marked';
import TurndownService from 'turndown';
import { GlobalService } from 'src/app/services/global.service';
import { SelectForumComponent } from '../select-forum/select-forum.component';
import { PostService } from 'src/app/services/post.service';
//Extends Quill


@Component({
  selector: 'app-new-post',
  standalone: true,
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
  imports: [IonContent, IonGrid, IonRow, IonCol, IonText, IonButton, IonTextarea, IonSegment, IonSegmentButton, IonLabel, CommonModule, FormsModule, IonItem]
})
export class NewPostComponent implements OnInit {
  @ViewChild('editor', { static: false }) editorElement?: ElementRef;
  quill: any;
  forum: any = false;
  emoji: string = "";
  content: string = "";
  markdownContent: string = "";
  selectedEditor?: string = "default";
  turndownService = new TurndownService();
  changeEmoji:boolean = false;
  title: string = "";
  constructor(private modalCtrl: ModalController, private globalSerivce: GlobalService, private postService: PostService) { }

  async ngOnInit() {
    this.forum = await this.globalSerivce.getForum();
    this.emoji = await this.globalSerivce.getEmoji();
    if (!this.forum || !this.emoji?.length) {
      this.openSelectForum();
    }
  }

  ngAfterViewInit() {
    this.changeEmoji = true;
    this.initializeQuill();
  }

  initializeQuill() {
    this.quill = new Quill(this.editorElement?.nativeElement, {
      modules: {
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }],
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['code-block'],
          ['link']
        ]
      },
      theme: 'snow'
    });

    // Atualiza o conteúdo do Markdown quando o Quill muda
    this.quill.on('text-change', () => {
      this.content = this.quill.root.innerHTML;
    });
  }

  async openSelectForum() {
    this.changeEmoji = false;
    const modal = await this.modalCtrl.create({
      component: SelectForumComponent,
      cssClass: 'select-forum',
      mode: 'ios',
      backdropDismiss: false,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    this.upgradeInfo(data);
  }

  async upgradeInfo(data: any) {
    this.forum = await this.globalSerivce.getForum();
    this.emoji = await this.globalSerivce.getEmoji();
    this.changeEmoji = true;
  }

  convertMarkdownToHtml() {
    if (this.quill) {  // Verifique se o Quill foi inicializado
      this.quill.root.innerHTML = marked.parse(this.markdownContent);
      this.content = this.quill.root.innerHTML;
    } else {
      console.error('Quill error.');
    }

    let el: any = document.querySelector(".ql-editor");
    el.focus();
  }

  convertHtmlToMarkdown() {
    this.markdownContent = this.turndownService.turndown(this.content);
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  async createPost(){
    this.forum = await this.globalSerivce.getForum();
    this.emoji = await this.globalSerivce.getEmoji();
    await this.convertHtmlToMarkdown();
   console.log("Forum",this.forum);
    let post = {
      title: this.title,
      content: this.markdownContent,
      forum_id: this.forum,
      emoji: this.emoji,
    }
    this.postService.createPost(post).subscribe(
      (data) => {

      },
      (error) => {
        console.error(error);
        alert(error.error);
      }
    );
  }
}
