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
        loadComponent: () =>
          import('../pages/forums/forums.page').then(m => m.ForumsPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../pages/profile/profile.page').then(m => m.ProfilePage),
      },
      {
        path: ':alias',
        loadComponent: () =>
          import('../pages/forum/forum.page').then(m => m.ForumPage),
      },
      {
        path: '',
        redirectTo: 'forums', // ou outra rota padrão
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'feed',
    redirectTo: '', // ou outra rota inicial válida
    pathMatch: 'full',
  },
];
