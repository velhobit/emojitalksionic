import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonRow, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRow, IonCol, IonGrid, IonInput, IonButton]
})
export class LoginPage implements OnInit {
  emoji: string = "happy";
  username: string = "";
  password: string = "";
  constructor(private authService: AuthService, private alertController: AlertController, private modalController: ModalController) {

  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      data => {
        //console.log(data);
        this.emoji = "welcome";
        setInterval(() => {
          this.modalController.dismiss();
        },1000);
      },
      async error => {
        //console.error('Login failed', error);
        let errorAlert = await this.alertController.create({
          mode: "ios",
          header: "😓",
          subHeader: "Nome de usuáro ou senha errado",
          message: "Por favor verifique se seu nome de usuário e senha foi digitado corretamente.",
          buttons: ["OK"]
        });
        errorAlert.present();
      }
    );
  }

}
