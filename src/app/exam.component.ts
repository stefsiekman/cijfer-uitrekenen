import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { EXAM_DATA } from "./exam-data";

@Component({
    templateUrl: "./exam.component.html",
    styleUrls: [ "./exam.component.css" ]
})
export class ExamComponent implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    examData = EXAM_DATA;
    level: number;
    subject: number;
    exam: number;

    l: number;
    s: number;
    n: number;

    loadedL: boolean;

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.level = params.level;
            this.subject = params.subject;
            this.exam = params.exam;

            if (this.examData[this.level]) {
            if (this.examData[this.level].subjects[this.subject]) {
            if (this.examData[this.level].subjects[this.subject]
                .exams[this.exam]) {
                this.l = this.examData[this.level].subjects[this.subject]
                    .exams[this.exam]["l"];

                if (this.l)
                    this.loadedL = true;

                this.n = this.examData[this.level].subjects[this.subject]
                    .exams[this.exam]["n"];
            }}}
        })
    }

    reselect(): void {
        this.router.navigate(["/"]);
    }

    round(n): number {
        return Math.round(n);
    }

    roundDigits(n, digits): number {
        return this.round(n * Math.pow(10, digits)) / Math.pow(10, digits);
    }

    grade(s, l, n): number {
        var r0 = 9 * s / l + n;
        var r1 = 1 + s * 9 / l * 2;
        var r2 = 1 + s * 9 / l * 0.5;
        var r3 = 10 - (l - s) * 9 / l * 2;
        var r4 = 10 - (l - s) * 9 / l * 0.5;

        if (n > 1) return Math.min(r0, r1, r4);
        if (n < 1) return Math.max(r0, r2, r3);

        return r0;
    }

    gradeOld(s, l, oldL, n): number {
        return this.grade(Math.round(s / l * oldL), oldL, n);
    }

}
