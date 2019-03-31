import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import * as quizData from '../../assets/staticfiles/questionsData.json';
import { Router } from "@angular/router";

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.less']
})
export class QuizComponent implements OnInit {
    currentdate: any;
    remainingtime: any;
    enddate: any;
    seconds: any;
    minutes: any;
    count = 0;
    quizData = quizData.default;
    maxques = this.quizData.length;
    selectedques = this.quizData[0];
    unanswered = 0;
    unanswindex: number;
    showerror: boolean;
    correctansw: number;
    wrongans: number;

    constructor(private router: Router) {}

    ngOnInit() {
        this.enddate = localStorage.getItem('endDate');
        this.setTimer();
    }

    setTimer() {
        interval(1000).subscribe(x => {
            this.currentdate = new Date(new Date());
            this.remainingtime = this.enddate - this.currentdate;
            console.log(this.selectedques.selectedopt)
            if (this.remainingtime > 0) {
                this.minutes = Math.floor((this.remainingtime % (1000 * 60 * 60)) / (1000 * 60));
                this.seconds = Math.floor((this.remainingtime % (1000 * 60)) / 1000);
            } else {
                this.minutes = "00";
                this.seconds = "00";
                this.generateResults();
            }
        });

    }

    setNextQues() {
        this.showerror = false;
        if (this.count < this.maxques - 1) {
            this.count = this.count + 1;
            this.selectedques = this.quizData[this.count];
        }

    }

    setPrevQues() {
        this.showerror = false;
        if (this.count > 0) {
            this.count = this.count - 1;
            this.selectedques = this.quizData[this.count];
        }

    }

    checkData() {
        this.unanswered = 0;
        this.showerror = false;
        for (let i = 0; i < this.maxques; i++) {
            if (this.quizData[i].selectedopt === '' || this.quizData[i].selectedopt === null || this.quizData[i].selectedopt === undefined) {
                this.unanswered++;
                this.selectedques = this.quizData[i];
                this.count = i;
                this.showerror = true;
                break;
            }
        }
        if (this.unanswered === 0) {
            this.generateResults();

        }
    }

    generateResults() {
        this.correctansw = 0;
        this.wrongans = 0;
        let remianingansw = 0;
        for (let i = 0; i < this.maxques; i++) {
            if (this.quizData[i].selectedopt === this.quizData[i].correctans) {
                this.correctansw++;
            } else if(this.quizData[i].selectedopt === ''){
                remianingansw++;
            } else{
                this.wrongans++;
            }
        }
        remianingansw = this.maxques - (this.correctansw + this.wrongans);
        localStorage.setItem('correctanswers', JSON.stringify(this.correctansw));
        localStorage.setItem('wronganswers', JSON.stringify(this.wrongans));
        localStorage.setItem('unanswered', JSON.stringify(remianingansw));
        this.router.navigateByUrl("results");
    }
}