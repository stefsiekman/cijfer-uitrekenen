import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { FindComponent } from "./find.component";
import { ExamComponent } from "./exam.component";
import { GraphComponent } from "./graph.component";
import { HelpComponent } from "./help.component";
import { NotFoundComponent } from "./not-found.component";

@NgModule({
    declarations: [
        AppComponent,
        FindComponent,
        ExamComponent,
        GraphComponent,
        HelpComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {
                path: "",
                component: FindComponent
            },
            {
                path: "exam/:level/:subject/:exam",
                component: ExamComponent
            },
            {
                path: "help",
                component: HelpComponent
            },
            {
                path: "**",
                component: NotFoundComponent
            }
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
