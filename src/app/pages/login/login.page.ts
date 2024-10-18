import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonRow, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
  constructor(private authService: AuthService, private alertController: AlertController, private modalController: ModalController, private router: Router) {

  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      async (data:any) => {
        if(data.status == 401){
          let errorAlert = await this.alertController.create({
            mode: "ios",
            header: "😓",
            subHeader: "Nome de usuáro ou senha errado",
            message: "Por favor verifique se seu nome de usuário e senha foi digitado corretamente.",
            buttons: ["OK"]
          });
          errorAlert.present();
        }else{
          this.emoji = "welcome";
          setTimeout(() => {
            const isAuthenticated = this.authService.isAuthenticated();
            console.error(isAuthenticated);
            if (isAuthenticated) {
              document.location.reload();
            }
            this.modalController.dismiss();
          },1000);
        }
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
