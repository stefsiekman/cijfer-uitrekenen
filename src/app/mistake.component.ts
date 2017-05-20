import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./mistake.component.html",
})
export class MistakeComponent {

    constructor(
        private router: Router
    ) {}

    back(): void {
        this.router.navigate(["/"]);
    }

}
