import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatSort } from '@angular/material';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private db: AngularFireDatabase) { }
  displayedColumns = ['id', 'name', 'student_class', 'rating'];
  exampleDatabase = new ExampleDatabase(this.db);
  dataSource: ExampleDataSource | null;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort);
  }
}


export interface UserData {
  id: string;
  name: string;
  student_class: string;
  rating: string;
}




export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
  get data(): UserData[] { return this.dataChange.value; }

  answers: any[];

  constructor(db) {
    db.list('/answers').valueChanges().subscribe(result => {
      this.answers = result;
      result.forEach(userData => {
        this.addUser(userData);
      });
    });
  }

  /** Adds a new user to the database. */
  addUser(userData) {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser(userData));
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser(userData) {
    const name = userData['student_name'];
    const student_class = userData['class'];
    const rating = userData['rating'];

    return {
      id: (this.data.length + 1).toString(),
      name: name,
      student_class: student_class,
      rating: rating
    };
  }
}

export class ExampleDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: ExampleDatabase, private _sort: MatSort) {
    super();
  }


  connect(): Observable<UserData[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }
  getSortedData(): UserData[] {
    const data = this._exampleDatabase.data.slice();
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'student_class': [propertyA, propertyB] = [a.student_class, b.student_class]; break;
        case 'rating': [propertyA, propertyB] = [a.rating, b.rating]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

  disconnect() { }
}
