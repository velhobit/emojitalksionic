import { Routes } from '@angular/router';
import { ForumsPage } from './forums.page';

export const routes: Routes = [
  {
    path: '',
    component: ForumsPage,
    children: [
      {
        path: ':alias',
        loadComponent: () =>
          import('../forum/forum.page').then(m => m.ForumPage),
      },
      {
        path: '',
        loadComponent: () =>
          import('../forum-select/forum-select.page').then(m => m.ForumSelectPage),
      },
    ],
  },
];
