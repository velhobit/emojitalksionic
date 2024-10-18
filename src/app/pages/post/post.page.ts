import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonRow, IonText, IonTextarea, IonTitle, IonToolbar, ModalController, ToastController } from '@ionic/angular/standalone';
import { PostService, Post } from 'src/app/services/post.service';
import * as marked from 'marked';
import { ActivatedRoute, Router } from '@angular/router';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { addIcons } from 'ionicons';
import { send, trash } from 'ionicons/icons';
import { UserService } from 'src/app/services/user.service';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonFab, IonFabButton, IonIcon, IonText, IonLabel, IonAvatar, PageHeaderComponent, IonTextarea, IonButton]
})
export class PostPage implements OnInit {
  uuid: string | null;
  post?: Post;
  isAuthenticated: boolean = false;
  currentUser?: any;
  comment: string = "";
  comments: any[] = [];

  constructor(private postService: PostService, private route: ActivatedRoute, private userService: UserService, private modalController: ModalController, private authService: AuthService, private router: Router, private alertController:AlertController, private toastController: ToastController) {
    addIcons({send, trash});
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    this.userService.getCurrentUser().subscribe(data=>{
      this.currentUser = data;
      this.isAuthenticated = true;
    },error=>{
      console.log(error);
      this.isAuthenticated = false;
    });
  }

  ngOnInit() {
    this.loadFeed();
  }

  loadFeed() {
    if (this.uuid) {
      this.postService.getPost(this.uuid).subscribe(
        (data) => {
          this.post = data;
          this.getComments();
        },
        (error) => {
          //console.error(error);
          alert(error.error);
        }
      );
    }
  }

  getComments(){
    if(this.uuid){
      this.postService.getComments(this.uuid).subscribe(data=>{
        this.comments = data;
      }, error =>{
        this.comments = [];
      });
    }
  }

  convertMarkdownToHtml(markdown: string): string {
    return marked.parse(markdown).toString();
  }

  async openLogin() {
    const modal = await this.modalController.create({
      component: LoginPage,
      mode: 'ios',
      backdropDismiss: false,
    });

    await modal.present();
    await modal.onDidDismiss().then(data=> {
      this.isAuthenticated = this.authService.isAuthenticated();
    });
  }

  createComment(){
    if(this.post?.uuid){
      this.postService.createComment(this.post?.uuid, this.comment).subscribe(data=>{
        if(data){
          this.getComments();
          this.comment = "";
        }
      });
    }
  }

 async destroyComment(commentId: string): Promise<void> {
     const alert = await this.alertController.create({
       header: 'Destruir comentário 🗑️',
       message: 'Tem certeza que deseja remover este comentário? Esta ação é permanente e o comentário será removido de nosso banco de dados.',
       mode: "ios",
       buttons: [
         {
           text: 'Cancelar',
           role: 'cancel',
           cssClass: 'secondary'
         },
         {
           text: 'Destruir',
           handler: async () => {

            this.postService.removeComment(commentId).subscribe(async (data)=>{
              this.getComments();
              const toast = await this.toastController.create({
                message: "Comentário removido com sucesso",
                mode: "ios",
                color: "warning",
                duration: 2000,
                position: 'bottom'
              });
              await toast.present();
            });
           }
         }
       ]
     });

     await alert.present();
   }
}
