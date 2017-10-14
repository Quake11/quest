import { QuestionService } from './../question.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent implements OnInit {

  @Input() item;
  /*   @Output() open = new EventEmitter(); */

  questions: any[];
  // questionsUnsolved: any[];

  questionsTotal: number;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questions = this.item.questions;
    //this.questionsUnsolved = this.item.questions;
    this.questionsTotal = this.questions.length;
    /* console.log(JSON.stringify(this.item) + ' ///// ' + JSON.stringify(this.questions)); */
    this.questionService.changeTotal(this.questionsTotal);

    //this.questionService.currentQuestion.subscribe(message => this.openedQuestionId = message);
  }

  onClick(event) {
    this.questionService.openQuestion(this.item.questions[0].id);
    //console.log(this.questionsUnsolved);
  }

  get questionsRemaining() {
    return this.questionService.countRemainingQuestions(this.questions);
  }
}
