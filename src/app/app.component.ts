import { Component, OnInit } from "@angular/core";
import { EXAM_DATA } from "./exam-data";


@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: [ "./app.component.css" ]
})
export class AppComponent implements OnInit{

    examData = EXAM_DATA;


    level: string;
    examSubject: string;
    exam: string;
    s: number;
    l: number;

    ngOnInit(): void {
        document.addEventListener("click", () => {
            setTimeout(() => {
                this.l = (this.level && this.examSubject && this.exam) ?
                    this.examData[this.level][this.examSubject][this.exam].l : null;
            }, 500)
        })
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

    getArray(object) {
        var array = [];
        for (let level in object) {
            array.push(level);
        }
        return array;
    }

    getSubjects() {
        if (!this.level || !this.examSubject) return [];

        return this.getArray(this.examData[this.level][this.examSubject]);
    }

}
