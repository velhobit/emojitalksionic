import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  storageAlias: string = "etk-";
  forum: any = {}

  constructor() {
  }

  getForum(): any {
    let forum: any = localStorage.getItem(this.storageAlias + "forum");
    if (forum == undefined || !forum?.length) {
      return false;
    }
    return forum;
  }
  setForum(forum: any) {
    this.forum = forum;
    localStorage.setItem(this.storageAlias + "forum", forum);
  }

  getEmoji(): string {
    const emoji = localStorage.getItem(this.storageAlias + "emoji")!;
    return emoji;
  }
  setEmoji(emoji: string) {
    localStorage.setItem(this.storageAlias + "emoji", emoji);
  }

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
