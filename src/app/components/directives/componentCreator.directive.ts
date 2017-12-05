import { Directive, Input, OnInit, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, AfterContentChecked } from '@angular/core';

@Directive({
    selector: '[componentCreator]',
})
export class ComponentCreatorDirective implements AfterContentChecked {

    @Input()
    componentFactory: ComponentFactory<any>;

    ngAfterContentChecked(): void {
        this.element.clear();
        let componentRef = this.element.createComponent(this.componentFactory);
        componentRef.changeDetectorRef.detectChanges();
    }

    constructor(private element: ViewContainerRef, ){

    }
}
