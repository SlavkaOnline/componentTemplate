import { Component, OnInit, NgModule, Compiler, ComponentFactoryResolver, ComponentFactory, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as ts from 'typescript';

@Component({
    selector: 'dynamic-componentLoader',
    templateUrl: './dynamicComponentLoader.component.html',
    styleUrls: ['./dynamicComponentLoader.component.scss']
})
export class DynamicComponentLoader implements OnInit {

    dynamicComponentFactory: ComponentFactory<any>;
    html: string;
    componentData: string;

    @ViewChild('content', {read: ViewContainerRef})
    content: ViewContainerRef;

    constructor(private compiler: Compiler) { }

    ngOnInit() {
      // this.cretateComponentFactory('<div>hello </div>', this.componentData);

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
            dataContext = eval(componentData)
        }
        @NgModule({
            declarations: [DynamicComponent],
            imports: [FormsModule],
            entryComponents: [DynamicComponent]
        })
        class DynamicModule {}
        const ngFactory = this.compiler.compileModuleAndAllComponentsSync(DynamicModule);
        this.dynamicComponentFactory = ngFactory.componentFactories[0];
        this.content.clear();
        this.content.createComponent(this.dynamicComponentFactory);
    }
}
