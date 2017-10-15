import { QuestionService } from './../question.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent implements OnInit {

  @Input() item;

  questions: any[];
  questionsTotal: number;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questions = this.item.questions;
    this.questionsTotal = this.questions.length;
    this.questionService.changeTotal(this.questionsTotal);
  }

  onClick(event) {
    this.questionService.openQuestion(this.item.questions[0].id);
  }

  get questionsRemaining() {
    return this.questionService.countRemainingQuestions(this.questions);
  }
}
