import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonRow, IonSegment, IonSegmentButton, IonText, IonTextarea, ModalController } from '@ionic/angular/standalone';
import Quill from 'quill';
import * as marked from 'marked';
import TurndownService from 'turndown';
//Extends Quill


@Component({
  selector: 'app-new-post',
  standalone: true,
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
  imports: [IonContent, IonGrid, IonRow, IonCol, IonText, IonButton, IonTextarea, IonSegment, IonSegmentButton, IonLabel, CommonModule, FormsModule, IonItem]
})
export class NewPostComponent implements OnInit {
  @ViewChild('editor', { static: false }) editorElement?: ElementRef;
  quill: any;
  content: string = "";
  markdownContent: string = "";
  selectedEditor?: string = "default";
  turndownService = new TurndownService();
  constructor(private modalController: ModalController) { }

  ngOnInit() {

  }

  ngAfterViewInit(){
    this.initializeQuill();
  }

  initializeQuill() {
    this.quill = new Quill(this.editorElement?.nativeElement, {
      modules: {
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }],
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['code-block'],
          ['link']
        ]
      },
      theme: 'snow'
    });

    // Atualiza o conteúdo do Markdown quando o Quill muda
    this.quill.on('text-change', () => {
      this.content = this.quill.root.innerHTML;
    });
  }

  convertMarkdownToHtml() {
    if (this.quill) {  // Verifique se o Quill foi inicializado
      this.quill.root.innerHTML = marked.parse(this.markdownContent);
      this.content = this.quill.root.innerHTML;
    } else {
      console.error('Quill error.');
    }
  }

  convertHtmlToMarkdown() {
    this.markdownContent = this.turndownService.turndown(this.content);
  }

  cancel(){
    this.modalController.dismiss();
  }
}
