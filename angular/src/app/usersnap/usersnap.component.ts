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
  globalApiKey: string = "<USERSNAP_GLOBAL_API_KEY>";
  
  @ViewChild('script') script: ElementRef;
  window = null
  constructor (@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }

  convertToScript() {
    
    this.window.onUsersnapCXLoad = function(api) {
      api.init()
      // Replace with the Project API key from your widget configuration page
      api.show("<USERSNAP_API_KEY>")
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
