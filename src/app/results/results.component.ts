import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.less']
})
export class ResultsComponent implements OnInit {
    correctansw: any;
    wrongans: any;
    unsubmitted: any;
    correctanswperc: any;
    wrongansperc: any;
    unsubmittedperc: any;
    total: number;
    pieChartLabels: string[] = [' Correct Answers ', ' Wrong Answers ', ' UnAttempted '];
    pieChartData: number[];
    pieChartType: string = 'pie';
    pieChartColors: Array < any > = [{ backgroundColor: ['green', 'red', 'blue'] }];
    pieChartSettings: any = {
        tooltips: {
            callbacks: {
                label: function(tooltipItems, data) {
                    return data.labels[tooltipItems.index] +
                        " : " +
                        data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] +
                        ' %';
                }
            }
        }
    };
    constructor() {}

    ngOnInit() {
        this.getResults();
    }

    getResults() {
        this.correctansw = JSON.parse(localStorage.getItem('correctanswers'));
        this.wrongans = JSON.parse(localStorage.getItem('wronganswers'));
        this.unsubmitted = JSON.parse(localStorage.getItem('unanswered'));
        this.total = this.correctansw + this.wrongans + this.unsubmitted;
        this.correctanswperc = this.correctansw / this.total * 100;
        this.wrongansperc = this.wrongans / this.total * 100;
        this.unsubmittedperc = this.unsubmitted / this.total * 100;
        this.pieChartData = [this.correctanswperc, this.wrongansperc, this.unsubmittedperc];
    }
}