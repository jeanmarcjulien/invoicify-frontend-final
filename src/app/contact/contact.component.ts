import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'app/animations/fade-in.animation';
import { MatDialog } from '@angular/material';
import { DataService } from 'app/data.service';
import { DeleteConfirmComponent } from 'app/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [fadeInAnimation]
})
export class ContactComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  contacts: any[];

  constructor(private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit() { this.getContacts(); }
  
  getContacts() {
    this.dataService.getRecords("contact")
      .subscribe(
        contacts => this.contacts = contacts,
        error => this.errorMessage = <any>error);
  }

  deleteContact(id:number) {
    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteRecord("contact", id)
          .subscribe(
            contact => {this.successMessage = "Record(s) deleted successfully"; this.getContacts(); },
            error => this.errorMessage = <any>error);
      }
    })
  }

}
