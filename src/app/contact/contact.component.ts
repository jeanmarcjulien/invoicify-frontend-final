import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'app/animations/fade-in.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [fadeInAnimation]
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
