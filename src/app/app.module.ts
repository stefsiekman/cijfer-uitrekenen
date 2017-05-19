import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { FindComponent } from "./find.component";
import { ExamComponent } from "./exam.component";
import { NotFoundComponent } from "./not-found.component";

@NgModule({
    declarations: [
        AppComponent,
        FindComponent,
        ExamComponent,
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
                path: "**",
                component: NotFoundComponent
            }
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
