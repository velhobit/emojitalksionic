import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonModal, ModalController, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { disc, add, glasses, cog, compass, personCircle } from 'ionicons/icons';
import { LoginPage } from '../pages/login/login.page';
import { AuthService } from '../services/auth.service';
import { NewPostComponent } from '../components/new-post/new-post.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonToolbar, IonHeader, IonTitle, IonTabButton, IonIcon, IonLabel, IonModal],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private modalController: ModalController, private authService: AuthService) {
    addIcons({ compass, glasses, cog, add, disc, personCircle});
  }

  async ngOnInit() {
    this.checkAuthetication();
  }

  async checkAuthetication() {
    const isAuthenticated = await this.authService.isAuthenticated();

    if (!isAuthenticated) {
      this.openLogin();  // Se não autenticado, abre o modal de login
    }
  }

  async openNewPost() {
    const modal = await this.modalController.create({
      component: NewPostComponent,
      cssClass: 'new-post',
      mode: 'ios',
      backdropDismiss: false,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
  }

  async openLogin() {
    const modal = await this.modalController.create({
      component: LoginPage,
      mode: 'ios',
      backdropDismiss: false,
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
  }
}
