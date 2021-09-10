import {
  AfterContentInit,
  Directive,
  ElementRef,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '.search-result'
})
export class StyleDirective implements OnInit {
  public constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  public ngOnInit() {
    // ng-container is rendered as a comment in the DOM
    if (this.elementRef.nativeElement.nodeName === '#comment') {
      this.renderer.setStyle(
        //nextSibling is the elment that was injected through the ng-container
        // (the element that comes just after the comment)
        this.elementRef.nativeElement.nextSibling,
        'height',
        '100px'
      );
    }
  }
}
