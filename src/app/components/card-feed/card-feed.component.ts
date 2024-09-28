import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonIcon, IonItem, IonLabel, IonList, IonText } from '@ionic/angular/standalone';
import * as marked from 'marked';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { chatboxEllipsesOutline } from 'ionicons/icons';

@Component({
  selector: 'card-feed',
  templateUrl: './card-feed.component.html',
  styleUrls: ['./card-feed.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonList, IonItem, IonIcon, IonText, IonLabel, IonAvatar, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonChip, IonButton, FormsModule]
})
export class CardFeedComponent  implements OnInit {
  @Input("post") post?: any | undefined;

  constructor(private router:Router) {
    addIcons({chatboxEllipsesOutline});
  }

  ngOnInit() {}

  convertMarkdownToHtml(markdown: string): string {
    return marked.parse(markdown).toString();
  }

  goTo(uuid: string) {
    this.router.navigate(['post', uuid]);
  }
}
