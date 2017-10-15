import { QuestPageComponent } from './quest-page/quest-page.component';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { QuestionService } from './question.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { style, state, animate, transition, trigger } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {


  ngOnInit() {

  }
}
