import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'forums',
        loadComponent: () =>
          import('../pages/forums/forums.page').then(m => m.ForumsPage),
      },
      {
        path: '',
        redirectTo: '', // ou outra rota padrão
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '', // ou outra rota inicial válida
    pathMatch: 'full',
  },
];
