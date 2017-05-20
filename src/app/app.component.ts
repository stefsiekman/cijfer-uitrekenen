import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `<router-outlet></router-outlet>
    <div class="col-xs-12 footer">
        <a [routerLink]="['help']">Hoe werkt deze website?</a>
    </div>`,
})
export class AppComponent {

}
