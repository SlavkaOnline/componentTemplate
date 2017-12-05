import { Component, OnInit, NgModule, Compiler, ComponentFactoryResolver, ComponentFactory } from '@angular/core';

@Component({
    selector: 'dynamic-componentLoader',
    templateUrl: './dynamicComponentLoader.component.html',
    styleUrls: ['./dynamicComponentLoader.component.scss']
})
export class DynamicComponentLoader implements OnInit {
    
    dynamicComponentFactory: ComponentFactory<any>;
    html: string;
    componentData: string;
        constructor(private compiler: Compiler) { }

    ngOnInit() { 
      // this.cretateComponentFactory('<div>hello </div>', this.componentData);

    }

    createComponent(): void {
        this.cretateComponentFactory(this.html, this.componentData);

    }

    private cretateComponentFactory(html: string, componentData:string){
        @Component({
            template: html
        })
        class DynamicComponent{
            dataContext = eval(componentData)
        }
        @NgModule({
            declarations: [DynamicComponent],
            entryComponents: [DynamicComponent]
        })
        class DynamicModule{}
            let ngFactory = this.compiler.compileModuleAndAllComponentsSync(DynamicModule);
                this.dynamicComponentFactory = ngFactory.componentFactories[0];
    }
}