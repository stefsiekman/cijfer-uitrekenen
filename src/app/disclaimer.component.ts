import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./disclaimer.component.html",
})
export class DisclaimerComponent {

    constructor(
        private router: Router
    ) {}

    back(): void {
        this.router.navigate(["/"]);
    }

}
