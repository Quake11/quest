import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { QuestionService } from './question.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MatRadioModule, MatButtonModule, MatInputModule } from '@angular/material';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { QuestionComponent } from './question/question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { SchemeComponent } from './scheme/scheme.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestPageComponent } from './quest-page/quest-page.component';
import { MatTableModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    MenuItemComponent,
    QuestionComponent,
    LoadingSpinnerComponent,
    SchemeComponent,
    DashboardComponent,
    QuestPageComponent
  ],
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'quest', pathMatch: 'full' },
      {
        path: 'quest',
        component: QuestPageComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      { path: '**', redirectTo: 'quest', pathMatch: 'full' }
    ]),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
