import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonAvatar, IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonNote, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToggle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRow, IonCol, IonGrid, IonList, IonItem, IonLabel, IonInput, IonAvatar, IonNote, IonToggle, IonButton, PageHeaderComponent, IonCard, IonSegment, IonSegmentButton]
})
export class ProfilePage implements OnInit {
  uuid:string = "";
  isAuthenticated:boolean = true;
  currentUser:any = {};

  constructor(private authService: AuthService, private alertController: AlertController, private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid') || "";
    this.userService.getCurrentUser().subscribe(data=>{
      this.currentUser = data;
      this.isAuthenticated = true;
    },error=>{
      console.log(error);
      this.isAuthenticated = false;
    });
  }

  ngOnInit() {
  }

  async logout(){
    const alert = await this.alertController.create({
      header: "Tem certeza que deseja sair?",
      message: "Esperamos ver você de volta em breve.",
      mode: "ios",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Sair',
          handler: () => {
            this.authService.logout();
            //console.log('OK clicked');
          }
        }
      ]
    });
    alert.present();
  }
}
