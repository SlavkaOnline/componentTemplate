import { Directive, Input, OnInit, ViewContainerRef, ComponentFactoryResolver, } from '@angular/core';

@Directive({
    selector: '[componentCreator]',
})
export class ComponentCreatorDirective implements OnInit { 

    @Input()
    componentCreate: any;

    ngOnInit(): void {
        let componentInstance = this.componentFactory.resolveComponentFactory(this.componentCreate);
        this.element.createComponent(componentInstance); 
    }

    constructor(private element: ViewContainerRef, private componentFactory: ComponentFactoryResolver){

    }
}