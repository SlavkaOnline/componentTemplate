import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dynamic-componentLoader',
    templateUrl: './dynamicComponentLoader.component.html',
    styleUrls: ['./dynamicComponentLoader.component.scss']
})
export class DynamicComponentLoader implements OnInit {
    
    dynamicComponent: any;
    html: string;
    componentData: string;
    


    constructor() { }

    ngOnInit() { }

    createComponent(): void {
        this.dynamicComponent = this.buildComponent(this.html, this.componentData);
    }

    private buildComponent(html: string, componentData:string) {
        @Component({
            template: html
        })
        class DynamicComponent{
            dataContext = eval(componentData)
        }
        return DynamicComponent;
    }
}