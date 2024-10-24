import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonModal, ModalController, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, glasses, cog, compass, personCircle, logIn, flame } from 'ionicons/icons';
import { LoginPage } from '../pages/login/login.page';
import { AuthService } from '../services/auth.service';
import { NewPostComponent } from '../components/new-post/new-post.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonToolbar, IonHeader, IonTitle, IonTabButton, IonIcon, IonLabel, IonModal, CommonModule],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  isAuthenticated: boolean = false;

  constructor(private modalController: ModalController, private authService: AuthService, private router:Router) {
    addIcons({ compass, glasses, cog, add, flame, personCircle, logIn});
  }

  async ngOnInit() {
    this.checkAuthetication();

    setInterval(()=>{
      this.authService.validateToken().subscribe();
    }, 60000);
  }

  async checkAuthetication() {
    this.isAuthenticated = await this.authService.isAuthenticated();

    if (!this.isAuthenticated) {
     //this.openLogin();  // Se não autenticado, abre o modal de login
    }else{
      this.validateToken();
    }
  }

  validateToken(){
    this.authService.validateToken().subscribe( data =>{
       this.isAuthenticated = true;
    }, error => {
      this.isAuthenticated = false;
    });
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
    await modal.onDidDismiss().then(data=> {
      this.isAuthenticated = this.authService.isAuthenticated();

      if (!this.isAuthenticated) {
        this.router.navigate(["feed"]);
      }
    });
  }
}
