import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [{ path: 'home',  component: HomeComponent },
{ path: 'quiz',  component: QuizComponent },
{ path: '',  component: HomeComponent },
{ path: 'results',  component: ResultsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
