import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonRow, IonSegment, IonSegmentButton, IonText, IonTextarea, ModalController, ToastController } from '@ionic/angular/standalone';
import Quill from 'quill';
import * as marked from 'marked';
import TurndownService from 'turndown';
import { GlobalService } from 'src/app/services/global.service';
import { SelectForumComponent } from '../select-forum/select-forum.component';
import { PostService } from 'src/app/services/post.service';
import { ForumService } from 'src/app/services/forum.service';
import { Router } from '@angular/router';
//Extends Quill


@Component({
  selector: 'app-new-post',
  standalone: true,
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
  imports: [IonContent, IonGrid, IonRow, IonCol, IonText, IonButton, IonTextarea, IonSegment, IonSegmentButton, IonLabel, CommonModule, FormsModule, IonItem, IonInput]
})
export class NewPostComponent implements OnInit {
  @ViewChild('editor', { static: false }) editorElement?: ElementRef;
  quill: any;
  forum: string = '';
  forumObj: any = false;
  emoji: string = "";
  content: string = "";
  markdownContent: string = "";
  selectedEditor?: string = "default";
  turndownService = new TurndownService();
  changeEmoji:boolean = false;
  postTitle: string = "";
  valid: boolean = false;

  constructor(private modalCtrl: ModalController, private globalSerivce: GlobalService, private postService: PostService, private forumService: ForumService, private alertController: AlertController, private toastController: ToastController, private router:Router) { }

  async ngOnInit() {
    this.forum = await this.globalSerivce.getForum();
    this.emoji = await this.globalSerivce.getEmoji();
    if (!this.forum?.length || !this.emoji?.length) {
      this.openSelectForum();
    }else{
      this.forumService.getForumById(this.forum).subscribe(data => {
        this.forumObj = data;
      })
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
    this.forumService.getForumById(this.forum).subscribe(data => {
      this.forumObj = data;
    })
    this.changeEmoji = true;
  }

  convertMarkdownToHtml() {
    if (this.quill) {  // Verifique se o Quill foi inicializado
      this.quill.root.innerHTML = marked.parse(this.markdownContent);
      this.content = this.quill.root.innerHTML;
    } else {
      console.error('Quill error.');
    }
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
    let post:any = await {
      title: this.postTitle,
      content: this.markdownContent,
      forum_id: this.forum,
      emoji: this.emoji,
    }
    this.valid = true;
    let errors : string[] = [];
    if(post.title.length == 0){
      this.valid = false;
      errors.push("Precisa incluir um título");
    }
    if(post.content.length == 0){
      this.valid = false;
      errors.push("É necessário escrever alguma coisa.");
    }
    if(post.forum_id.length == 0){
      this.valid = false;
    }

    if(!this.valid){
      this.showErrorAlert(errors.join("; "));
      return;
    }

    this.postService.createPost(post).subscribe(
      async (data) => {
        this.modalCtrl.dismiss();
        this.router.navigate(["post", data.uuid]);
        const toast = await this.toastController.create({
          header: "Post Criado com Sucesso",
          cssClass: "ion-text-center",
          color: "success",
          mode: "ios",
          buttons: [],
          duration: 2000
        });
        toast.present();
      },
      (error) => {
        if(error.status == 401){
          this.showErrorAlert("Não foi autorizada a publicação. Por favor, tente sair e logar novamente.");
        }else{
          this.showErrorAlert(error.message);
        }
      }
    );
  }

  async showErrorAlert(error: string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      mode: "ios",
      subHeader: 'Problemas para criar novo post',
      message: error,
      buttons: ['OK'],
      cssClass: 'json-alert'
    });

    await alert.present();
  }
}
