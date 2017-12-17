import { Directive, Input, OnInit, Renderer2, ElementRef } from '@angular/core';

@Directive({
    selector: '[background]',
})
export class BackgroundDirective implements OnInit  {

    @Input()
    color: string;
    ngOnInit(): void {
        console.log(this.color);
        this.renderer.setStyle(this.element.nativeElement, 'background', 'red');
        this.renderer.setStyle(this.element.nativeElement, 'height', '200px');
    }
    constructor(private element: ElementRef, private renderer: Renderer2 ) {

    }
}
