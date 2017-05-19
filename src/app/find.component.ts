import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EXAM_DATA } from "./exam-data";

@Component({
    templateUrl: "./find.component.html",
    styleUrls: [ "./find.component.css" ]
})
export class FindComponent {

    constructor(
        private router: Router
    ) {}

    examData = EXAM_DATA;

    level: number = 0;
    subject: number = 0;
    exam: number = 0;

    openExam(level, subject, exam): void {
        this.router.navigate(["exam", level, subject, exam]);
    }

}
