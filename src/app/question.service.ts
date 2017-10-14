import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class QuestionService {

  private question = new BehaviorSubject<number>(null);
  currentQuestion = this.question.asObservable();

  private count = new BehaviorSubject<number>(0);
  questionsTotal = this.count.asObservable();

  answeredQuestions = {};



  private correctAnswers = new BehaviorSubject<number>(0);

  getCorrectAnswers() {
    return this.correctAnswers;
  }

  getRating() {
    return this.correctAnswers;
    //return rating;
  }

  updateCorrectAnswers(num) {
    this.correctAnswers.next(this.correctAnswers.value + num);
  }

  constructor() { }

  openQuestion(id: number) {
    this.question.next(id);
  }

  changeTotal(num: number) {
    this.count.next(this.count.getValue() + num);
  }

  changeAnswered(id: number, bool: boolean = true) {
    this.answeredQuestions[id] = bool;
    console.log(this.answeredQuestions);

  }


  get answeredQuestionsTotal() {
    return Object.keys(this.answeredQuestions).length;
  }

  isQuestionsCompleted(id) {
    return this.answeredQuestions[id] == true;
  }

  countRemainingQuestions(questions) {
    let remaining: number = Object.keys(questions).length;
    questions.forEach(element => {
      this.isQuestionsCompleted(element.id) ? remaining-- : remaining;
    });
    //console.log(questions);
    return remaining;
  }

}
