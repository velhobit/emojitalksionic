import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'feed',
        loadComponent: () =>
          import('../pages/feed/feed.page').then(m => m.FeedPage),
      },
      {
        path: 'post/:uuid',
        loadComponent: () =>
          import('../pages/post/post.page').then(m => m.PostPage),
      },
      {
        path: 'forums',
        loadChildren: () => import('../pages/forums/forums.route').then((m) => m.routes),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../pages/profile/profile.page').then(m => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: 'forums', // redireciona para forums se o caminho estiver vazio
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'feed',
    redirectTo: 'feed', // redireciona para a rota feed
    pathMatch: 'full',
  },
];
