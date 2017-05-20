import {
    Component, Input, ViewChild, OnChanges, OnInit, SimpleChange, ElementRef
} from "@angular/core";

@Component({
    selector: "graph",
    template: `<canvas #graphCanvas></canvas>`,
    styles: [
        `canvas {
            width: 100%;
            height: 500px;
        }`
    ]
})
export class GraphComponent implements OnInit, OnChanges {

    @Input() n: number;
    @Input() l: number;
    @Input() s: number;
    @ViewChild("graphCanvas") canvasRef: ElementRef;

    ngOnInit() {
        // Listener for canvas resize
        var width = this.getWidth();
        var height = this.getHeight();
        var scale = window.devicePixelRatio;

        setInterval(() => {
            var newWidth = this.getWidth();
            var newHeight = this.getHeight();
            var newScale = window.devicePixelRatio;
            if (width != newWidth || height != newHeight || scale != newScale) {
                width = newWidth;
                height = newHeight;
                scale = newScale;
                this.render();
            }
        }, 500);
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        this.render();
    }

    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    scale: number;

    render(): void {
        let ctx: CanvasRenderingContext2D =
            this.canvasRef.nativeElement.getContext("2d");

        let width = this.getWidth();
        let height = this.getHeight();
        let scale = window.devicePixelRatio;

        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.scale = scale;

        this.canvasRef.nativeElement.width = width * scale;
        this.canvasRef.nativeElement.height = height * scale;

        ctx.clearRect(0, 0, width, height);

        this.renderGrid();
        if (!this.n) {
            var colors = {
                "#d35400": 0.5,
                "#27ae60": 1.5,
                "#c0392b": 0,
                "#16a085": 2,
                "#2c3e50": 1
            }

            for (let color in colors) {
                this.renderNLine(colors[color], color);
            }

            for (let color in colors) {
                this.renderGradeLine(this.s, this.l, colors[color], color);
            }
        } else {
            this.renderNLine(this.n, "#2c3e50");
            this.renderGradeLine(this.s, this.l, this.n, "#2c3e50");
        }
        this.renderScoreLine(this.s, this.l);
        this.renderAxis();
    }

    getWidth(): number {
        return this.canvasRef.nativeElement.offsetWidth;
    }

    getHeight(): number {
        return this.canvasRef.nativeElement.offsetHeight;
    }

    renderGrid(): void {
        let ctx = this.ctx;
        let width = this.getGraphWidth();
        let height = this.getGraphHeight();
        let scale = this.scale;

        // Minor X-axis lines
        ctx.beginPath();
        for (var i = 1; i <= 50; i++) {
            var x = Math.round(width / 50 * i) - 0.5;
            this.plot(x, 0, x, height);
        }

        // Minor Y-axis lines
        for (var i = 0; i < 50; i++) {
            if (i % 5 == 0) continue;
            var y = Math.round(height / 50 * i) + 0.5;
            this.plot(0, y, width, y);
        }

        // Render minor lines
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 1 * scale;
        ctx.stroke();
        ctx.closePath();

        // Major X-axis lines
        ctx.beginPath();
        for (var i = 1; i <= 10; i++) {
            var x = Math.round(width / 10 * i) - 1;
            this.plot(x, 0, x, height);
        }

        // Major Y-axis lines
        for (var i = 1; i <= 10; i++) {
            var y = Math.round(height / 10 * i) - 1;
            this.plot(0, y, width, y);
        }

        // Render major lines
        ctx.strokeStyle = "#ccc";
        ctx.lineWidth = 2 * scale;
        ctx.stroke();
        ctx.closePath();
    }

    renderAxis(): void {
        let ctx = this.ctx;
        let width = this.getGraphWidth();
        let height = this.getGraphHeight();
        let scale = this.scale;

        // X-axis
        ctx.beginPath();
        this.plot(-1, 0, width, 0);
        for (var i = 1; i <= 10; i++) {
            var x = -14;
            var y = Math.round(height / 10 * i) - 6.5;
            if (i == 10) {
                x -= 6;
                y -= 6.5;
            }
            this.plotText("" + i, x, y);
        }

        // Y-axis
        this.plot(0, -1, 0, height);
        for (var i = 0; i <= 5; i++) {
            var x = Math.round(width / 5 * i) - 10;
            var y = -15;
            if (i == 5) {
                x -= 25;
            }
            this.plotText(i * 20 + "%", x, y);
        }

        // Render minor lines
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 2 * scale;
        ctx.stroke();
        ctx.closePath();
    }

    renderNLine(n, color): void {
        let ctx = this.ctx;
        let scale = this.scale;



        ctx.beginPath();

        if (n == 1) {
            this.plotCoord(0, 1, 100, 10);
        } else if (n < 1) {
            // Calculate bend points
            var b1x = (n - 1) / (0.05 - 9/100);
            var b1y = (-180/100 + n) / (1 - 180/100);
            var b2x = 100/11 * (n + 10);
            var b2y = 20/11 * (n + 10) - 10;
            // Render line
            this.plotCoord(0, 1, b1x, b1y);
            this.plotCoord(b1x, b1y, b2x, b2y);
            this.plotCoord(b2x, b2y, 100, 10);
        } else {
            // Calculate bend points
            var b1x = (n - 1) * 100/11;
            var b1y = 20/11 * (n - 1) + 1;
            var b2x = 125 - 25 * n;
            var b2y = 11.25 - 1.25 * n;
            // Render line
            this.plotCoord(0, 1, b1x, b1y);
            this.plotCoord(b1x, b1y, b2x, b2y);
            this.plotCoord(b2x, b2y, 100, 10);
        }



        // Render minor lines
        ctx.strokeStyle = color + "";
        ctx.lineWidth = 2 * scale;
        ctx.stroke();
        ctx.closePath();
    }

    renderScoreLine(s, l): void {
        let ctx = this.ctx;
        let scale = this.scale;

        s = s || 0;
        l = l || 100;

        ctx.beginPath();

        var x = s / l * 100;
        this.plotCoord(x, 0, x, 10);



        // Render minor lines
        ctx.strokeStyle = "#2980b9";
        ctx.lineWidth = 2 * scale;
        ctx.stroke();
        ctx.closePath();
    }

    renderGradeLine(s, l, n, color): void {
        let ctx = this.ctx;
        let scale = this.scale;

        ctx.beginPath();

        var y = this.grade(s, l, n);
        this.plotCoord(0, y, 100, y);

        // Render minor lines
        ctx.strokeStyle = color;
        ctx.lineWidth = 2 * scale;
        ctx.stroke();
        ctx.closePath();
    }

    line(x1, y1, x2, y2): void {
        this.ctx.moveTo(x1 * this.scale, y1 * this.scale);
        this.ctx.lineTo(x2 * this.scale, y2 * this.scale);
    }

    text(s, x, y): void {
        this.ctx.font = 15 * this.scale + "px serif";
        this.ctx.fillText(s, x * this.scale, y * this.scale);
    }

    plotText(s, x, y): void {
        var gap = this.getAxisGap();
        this.text(s, x + gap, this.height - y - gap);
    }

    plot(x1, y1, x2, y2): void {
        var gap = this.getAxisGap();
        this.line(x1 + gap, this.height - y1 - gap,
                  x2 + gap, this.height - y2 - gap);
    }

    plotCoord(x1, y1, x2, y2): void {
        var xUnit = this.getGraphWidth() / 100;
        var yUnit = this.getGraphHeight() / 10;
        this.plot(x1 * xUnit, y1 * yUnit, x2 * xUnit, y2 * yUnit);
    }

    getGraphWidth(): number {
        return this.width - this.getAxisGap();
    }

    getGraphHeight(): number {
        return this.height - this.getAxisGap();
    }

    getAxisGap(): number {
        return 30;
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

}
