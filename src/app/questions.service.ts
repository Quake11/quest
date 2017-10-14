import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from "@angular/core";

@Injectable()
export class QuestionsService {



  constructor(private http: Http) {
  }


  getObjectData() {

    return this.http.get('/phone-questions.json');

  }
}
