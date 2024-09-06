import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonModal, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, glasses, square, cog, compass } from 'ionicons/icons';
import { LoginPage } from '../pages/login/login.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonModal],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private modalController: ModalController) {
    addIcons({ compass, glasses, cog});
  }

  ngOnInit(){
    this.openLogin();
  }

  async openLogin() {
    const modal = await this.modalController.create({
      component: LoginPage,
      mode: 'ios',
      backdropDismiss: false,
    });

    await modal.present();
    const {data} = await modal.onDidDismiss();
  }
}
