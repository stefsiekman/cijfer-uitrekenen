import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./help.component.html",
})
export class HelpComponent {

    constructor(
        private router: Router
    ) {}

    back(): void {
        this.router.navigate(["/"]);
    }

}
