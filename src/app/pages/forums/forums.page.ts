import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonText } from '@ionic/angular/standalone';
import { ForumService } from '../../services/forum.service'

@Component({
  selector: 'app-forums',
  templateUrl: './forums.page.html',
  styleUrls: ['./forums.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, CommonModule, FormsModule, IonButton, IonText]
})
export class ForumsPage implements OnInit {
  forums: any[] = [];
  constructor(private forumService: ForumService) { }

  ngOnInit() {
    this.forumService.getForums().subscribe(data => {
      this.forums = data;
    });
  }
}
