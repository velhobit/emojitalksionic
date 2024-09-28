import { Component, OnInit } from '@angular/core';
import { IonCol, IonContent, IonGrid, IonImg, IonItem, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: true,
  imports: [IonImg, IonContent, IonRow, IonCol, IonGrid, IonItem]
})
export class PageHeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
