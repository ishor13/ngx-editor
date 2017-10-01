import { Component, OnInit, HostListener, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { ngxEditorConfig } from './ngx-editor.defaults';

@Component({
  selector: 'app-ngx-editor',
  templateUrl: './ngx-editor.component.html',
  styleUrls: ['./ngx-editor.component.scss']
})

export class NgxEditorComponent implements OnInit {

  @Output() htmlChange = new EventEmitter();

  /*
   * default configurations
   */
  _config: any;
  _html: any;

  /*
   * set default values
   */

  // set configuration
  @Input()
  set config(value: JSON) {

    for (const i in ngxEditorConfig) {
      if (!value.hasOwnProperty(i)) {
        value[i] = ngxEditorConfig[i];
      }
    }
    this._config = value;
  }
  get config(): JSON {
    return this._config || ngxEditorConfig;
  }

  // set HTML value
  @Input()
  set html(value: any) {
    this._html = value;
  }
  get html(): any {
    return this._html;
  }


  @Input() spellCheck;
  @Input() placeholder;

  fullScreen = false;


  /*
   * update html on changes in content editable
   */
  htmlContentChange(value) {
    if (value === '<br>') {
      this.htmlChange.emit('');
    } else {
      this.htmlChange.emit(value);
    }
  }

  constructor(private element: ElementRef) { }

  executeCommand(commandName) {
    const isExecuted = document.execCommand(commandName, false, null);
  }

  /*
   * blockquote
   */
  blockQuote() {
    document.execCommand('formatBlock', false, '<blockquote>');
  }

  removeQuote() {
    document.execCommand('formatBlock', false, 'div');
  }

  /*
   * ngOnInit
   */
  ngOnInit() {
    if (this.spellCheck === false) {
      this.config['spellCheck'] = this.spellCheck;
    }

    this.element.nativeElement.getElementsByClassName('textarea')[0].innerHTML = this.html;
  }

}