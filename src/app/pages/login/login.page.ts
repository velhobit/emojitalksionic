import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRow, IonCol, IonGrid, IonInput, IonButton]
})
export class LoginPage implements OnInit {
  emoji:string = "happy";
  username: string = "";
  password: string = "";
  constructor() { }

  ngOnInit() {
  }

}
