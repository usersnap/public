import { Component, ElementRef, ViewChild, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-usersnap',
  templateUrl: './usersnap.component.html',
  styleUrls: ['./usersnap.component.css']
})
export class UsersnapComponent {

  // Replace with the global API key from your installation page
  @Input()
  globalApiKey: string = "2769bf7c-41e0-43e6-92db-b762d620addf";
  
  @ViewChild('script') script: ElementRef;
  window = null
  constructor (@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }

  convertToScript() {
    
    this.window.onUsersnapCXLoad = function(api) {
      api.init()
      // Replace with the Project API key from your widget configuration page
      api.show("8b25da08-53c2-45e4-a736-cb71e01a24cc")
    }
    var element = this.script.nativeElement;
    var script = document.createElement("script")
    script.defer = false
    script.type = "text/javascript"
    
    script.src = `https://widget.usersnap.com/global/load/${this.globalApiKey}?onload=onUsersnapCXLoad`
    var parent = element.parentElement;
    parent.parentElement.replaceChild(script, parent);
  }

  ngAfterViewInit() {
    this.convertToScript();
  }
}
