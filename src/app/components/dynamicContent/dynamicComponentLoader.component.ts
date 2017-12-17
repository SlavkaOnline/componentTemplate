import { Component, OnInit, NgModule, Compiler, Injector, EmbeddedViewRef, ElementRef, ApplicationRef, ComponentFactoryResolver, ComponentFactory, ViewContainerRef, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as ts from 'typescript';
import { inspect } from 'util';

@Component({
    selector: 'dynamic-componentLoader',
    templateUrl: './dynamicComponentLoader.component.html',
    styleUrls: ['./dynamicComponentLoader.component.scss']
})
export class DynamicComponentLoader implements OnInit {

    html: string;
    componentData: string;


    constructor(private compiler: Compiler, private injector: Injector, private appRef: ApplicationRef, private renderer: Renderer2, private element: ElementRef, private cfr: ComponentFactoryResolver ) { }

    ngOnInit() {
 
    }

    createComponent(): void {

        let code = '(function() {' + this.componentData + '})();';
        let tsCode = ts.transpile(code);
        this.cretateComponentFactory(this.html, tsCode);

    }

    private cretateComponentFactory(html: string, componentData: string) {
        @Component({
            template: html
        })
        class DynamicComponent {
            dataContext = eval(componentData);
        }
        @NgModule({
            declarations: [DynamicComponent],
            imports: [FormsModule],
            entryComponents: [DynamicComponent]
        })
        class DynamicModule {}
        const ngFactory = this.compiler.compileModuleAndAllComponentsSync(DynamicModule);
        const dynamicFactory = ngFactory.ngModuleFactory.create(this.injector); // .componentFactories[0];
        const componentRef = dynamicFactory.
        componentFactoryResolver.
        resolveComponentFactory(DynamicComponent)
        .create(this.injector);
        const instance = (<DynamicComponent>componentRef.instance);
        this.appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

        const el = document.getElementById('content') as HTMLElement;
        this.renderer.appendChild(el, domElem);
        
       
    }
}
