import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonAvatar, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonNote, IonRow, IonTitle, IonToggle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRow, IonCol, IonGrid, IonList, IonItem, IonLabel, IonInput, IonAvatar, IonNote, IonToggle, IonButton]
})
export class ProfilePage implements OnInit {

  constructor(private authService: AuthService, private alertController: AlertController) { }

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
