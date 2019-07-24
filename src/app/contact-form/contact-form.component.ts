import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'app/animations/fade-in.animation';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  animations: [fadeInAnimation]
})
export class ContactFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
