import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
    currentdate: any;
    dateval: any;
    enddate: any;

    constructor(private router: Router) {}

    ngOnInit() {}
    goToApp() {
        this.currentdate = new Date();
        this.dateval = new Date(this.currentdate);
        this.enddate = this.dateval.setMinutes(this.currentdate.getMinutes() + 3);
        localStorage.setItem("endDate", this.enddate);
        this.router.navigateByUrl("quiz");
    }

}