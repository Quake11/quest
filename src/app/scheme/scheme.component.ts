import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.css']
})
export class SchemeComponent implements OnInit {

  constructor(private element: ElementRef) { }

  subjectsIds: string[] = [
    "#BIO", "#PH", "#GEO", "#CH", "#INF", "#MATH"
  ];

  linesIds: string[] = [
    "#Line_GEO", "#Line_PH", "#Line_BIO", "#Line_CH", "#Line_INF", "#Line_MATH"
  ];

  textIds: string[] = [
    "#block_x5F_GEO", "#block_x5F_PH", "#block_x5F_BIO", "#block_x5F_CH", "#block_x5F_INF", "#block_x5F_MATH"
  ];

  subjects: any[] = [];
  lines: any[] = [];

  ngOnInit() {
    this.subjectsIds.forEach(id => {
      let element = this.element.nativeElement.querySelector(id);
      this.subjects.push(element);
      element.addEventListener('click', this.openSubject, false);
    });

    this.linesIds.forEach(id => {
      this.lines.push(this.element.nativeElement.querySelector(id));
    });
  }

  openSubject() {
    document.getElementById('block_x5F_' + this['id']).classList.add("opened");
  }


  showSubjects() {
    this.subjects.forEach(function (subj, index) {
      setTimeout(function () {
        document.getElementById(subj['id']).classList.add("active");
      }, index * 300);
    });

    this.lines.forEach(function (subj, index) {
      setTimeout(function () {
        document.getElementById(subj['id']).classList.add("active");
      }, index * 300);
    });
  }

  addClass(object, name) {
    object.classList.add(name);
  }

}
