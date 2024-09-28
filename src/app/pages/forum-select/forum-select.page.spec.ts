import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForumSelectPage } from './ForumSelectPage';

describe('ForumSelectPage', () => {
  let component: ForumSelectPage;
  let fixture: ComponentFixture<ForumSelectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
