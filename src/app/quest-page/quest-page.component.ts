
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingSpinnerComponent } from '../ui/loading-spinner/loading-spinner.component';
import { QuestionService } from '../question.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { style, state, animate, transition, trigger } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-quest-page',
  templateUrl: './quest-page.component.html',
  styleUrls: ['./quest-page.component.css'],

  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(700, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(350, style({ opacity: 0 }))
      ])
    ]),
    trigger('phoneAnimation', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0, transform: 'translateY(-100vh)' }),
        animate(1000, style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('questionAnimation', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(100, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(0, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class QuestPageComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private questionService: QuestionService) {
    db.list('/menu-items').valueChanges().subscribe(result => {
      this.menuItems = result;
      this.showSpinner = false;
    });
    this.correctAnswersSubscription = this.questionService.getCorrectAnswers().subscribe(rating => { this.correctAnswersCount = rating; });
    this.questionService.getRating().subscribe(rating => {
      this.rating = Math.round(rating / this.questionsTotal * 100).toFixed(0);
      this.values.rating = this.rating;
    });
  }

  ngOnInit() {
    this.questionService.currentQuestion.subscribe(message => this.openedQuestionId = message);
    this.questionService.questionsTotal.subscribe(message => this.questionsTotal = message);
    //let timer = TimerObservable.create(0, 1000);
    //timer.subscribe(t => this.timer = t);
  }

  _hello: boolean = true;
  _phone: boolean = false;
  _questOver: boolean = false;
  _scheme: boolean = false;


  get hello(): boolean {
    return this._hello;
  }

  set hello(bool) {
    if (bool) {
      this.phone = false;
      this.questOver = false;
      this.scheme = false;
    }
    this._hello = bool;
  }


  get scheme(): boolean {
    return this._scheme;
  }

  set scheme(bool) {
    if (bool) {
      this.phone = false;
      this.questOver = false;
      this.hello = false;
    }
    this._scheme = bool;
  }

  get phone(): boolean {
    return this._phone;
  }

  set phone(bool) {
    if (bool) {
      this.scheme = false;
      this.questOver = false;
      this.hello = false;

    }
    this._phone = bool;
  }

  get questOver(): boolean {
    return this._questOver;
  }

  set questOver(bool) {
    if (bool) {
      this.scheme = false;
      this.phone = false;
      this.hello = false;
    }
    this._questOver = bool;
  }


  get studentName() {
    return this.values['student_name'];
  }

  get studentClass() {
    return this.values['class'];
  }

  private readonly SUBMIT_COOLDOWN: number = 5;

  showSpinner: boolean = true;

  //timer = 0;
  //submitTimer = 0;

  menuItems: any[];
  openedQuestionId: number;

  questionsTotal: number;

  correctAnswers: number = 0;
  //questionsCompleted: number;

  /*   get rating() {
      let rating = Math.round(this.correctAnswers / this.questionsTotal * 100).toFixed(2);
      this.values['rating'] = rating;
      return rating;
    } */

  values = {
    student_name: null,
    class: null,
    questions: {},
    rating: null
  };


  correctAnswersSubscription: Subscription;
  correctAnswersCount: number;

  ratingSubscription: Subscription;
  rating: any;



  get questionsCompleted(): number {
    return this.questionService.answeredQuestionsTotal;
  }

  get progress(): number {
    return this.questionsCompleted / this.questionsTotal * 100;
  }




  onSubmit() {
    console.log("onSubmit: " + this.values);
    //this.submitTimer = this.timer + this.SUBMIT_COOLDOWN; // кулдаун, нужен когда отправляем через кнопку
    this.db.list('/answers').push(this.values);
  }

  onRadioSelect(e) {
    //console.log(e);
    //console.log(this.answeredQuestions);

  }

  acceptQuestion(id, option) {
    if (option) {
      this.correctAnswers++;
      this.questionService.updateCorrectAnswers(1);
    }
    this.questionService.changeAnswered(id);
    //console.log(this.questionService.answeredQuestions);
    if (this.progress == 100) {
      this.onSubmit();
      //this.questOver = true;
    }
    console.log("id:" + id + " option:" + option);

  }


  isQuestionCompleted(id) {
    return this.questionService.isQuestionsCompleted(id);
  }


  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }


  onAnswer(id) {
    this.questionService.changeAnswered(id);
  }

}
