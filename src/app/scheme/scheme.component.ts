import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.css']
})
export class SchemeComponent implements OnInit {

  constructor(private element: ElementRef) { }

  //math: ElementRef;

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
    //this.math = this.element.nativeElement.querySelector('#Math');
    //  console.log(this.element.nativeElement.querySelector('#Math'));

    //this.math = document.getElementById("Math")
    //this.subjects.push(this.element.nativeElement.querySelector('#Math'));
    //this.subjects.push(this.element.nativeElement.querySelector('#Physics'));

    this.subjectsIds.forEach(id => {
      let element = this.element.nativeElement.querySelector(id);
      this.subjects.push(element);
      element.addEventListener('click', this.openSubject, false);

      //this.element.nativeElement.querySelector(id).onclick = this.test;
      /*       element.addEventListener('click', function () {
              console.log(element.id);
              element.classList.add("opened");
            }, false); */
    });

    this.linesIds.forEach(id => {
      this.lines.push(this.element.nativeElement.querySelector(id));
    });
  }

  openSubject() {
    document.getElementById('block_x5F_' + this['id']).classList.add("opened");
    console.log(this['id']);
    //document.getElementsByClassName("opened").for classList.remove("opened");

/*     if (!document.getElementById('block_x5F_' + this['id']).classList.contains("zoomed")) {
      let elements = [].slice.call(document.getElementsByClassName('zoomed'));
      elements.forEach(element => {
        element.classList.remove("zoomed");
      });
      document.getElementById('block_x5F_' + this['id']).classList.add("zoomed");
    } else document.getElementById('block_x5F_' + this['id']).classList.remove("zoomed"); */
  }

  openText() {

  }

  showSubjects() {
    this.subjects.forEach(function (subj, index) {
      setTimeout(function () {
        document.getElementById(subj['id']).classList.add("active");
      }, index * 300);
      //this.addClass(subj, "active");
    });

    this.lines.forEach(function (subj, index) {
      setTimeout(function () {
        document.getElementById(subj['id']).classList.add("active");
      }, index * 300);
      //this.addClass(subj, "active");
    });
  }

  addClass(object, name) {
    object.classList.add(name);
  }

}
