import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js/src/typed.js';
import {entitiesService} from "../../partitial/entities/entities.service";
import {AuthService} from "../../partitial/auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public authService : AuthService){}
  ngOnInit() {
    const options = {
      strings: ["We are Classboost", "We are Classboots*", "We are Awesome.","Your'e Awesome.*"],
      // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
      stringsElement: null,
      // typing speed
      typeSpeed: 100,
      // time before typing starts
      startDelay: 1000,
      // backspacing speed
      backSpeed: 70,
      // time before backspacing
      backDelay: 1000,
      // loop
      loop: true,
      // false = infinite
      loopCount: 5,
      // show cursor
      showCursor: false,
      // character for cursor
      cursorChar: '|',
      // attribute to type (null == text)
      attr: null,
      // either html or text
      contentType: 'html',
      // call when done callback function
      callback: function() {},
      // starting callback function before each string
      preStringTyped: function() {},
      //callback for every typed string
      onStringTyped: function() {},
      // callback for reset
      resetCallback: function() {}
    };
    const typed = new Typed('.typed', options);
  }
}
