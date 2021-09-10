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
    /*
     ng-container is rendered as a comment in the DOM (thus nodeName === '#comment'     https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName)
     nextSibling is the elment that was injected through the ng-container
     (the element that comes just after the comment)
     */
    const elementToStyle =
      this.elementRef.nativeElement.nodeName === '#comment'
        ? this.elementRef.nativeElement.nextSibling
        : this.elementRef.nativeElement;
    this.renderer.setStyle(elementToStyle, 'height', '100px');
  }
}
