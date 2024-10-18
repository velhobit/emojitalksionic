import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonItem, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: true,
  imports: [IonImg, IonContent, IonRow, IonCol, IonGrid, IonItem, CommonModule, FormsModule, IonButton]
})
export class PageHeaderComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goHome() {
    this.router.navigate(['']);
  }
}
