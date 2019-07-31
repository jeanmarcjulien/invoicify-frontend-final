import { Component, OnInit, HostListener } from '@angular/core';
import { fadeInAnimation } from 'app/animations/fade-in.animation';
import { MatDialog } from '@angular/material';
import { DataService } from 'app/data.service';
import { DeleteConfirmComponent } from 'app/delete-confirm/delete-confirm.component';
import {DomSanitizer} from '@angular/platform-browser';

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
  originalContacts: any[];
  searchText: string = '';
  prevSearchText: string = '';

  constructor(private dataService: DataService, public dialog: MatDialog, private sanitizer:DomSanitizer) {}

  ngOnInit() { this.getContacts(); }
  
  setSkypeNumber(n){
    return this.sanitizer.bypassSecurityTrustUrl(`skype://+1${n}?call`);
  }

  getContacts() {
    this.dataService.getRecords("contact")
      .subscribe(
        contacts => this.contacts = contacts,
        error => this.errorMessage = <any>error);
    this.dataService.getRecords("contact")
      .subscribe(
        contacts => this.originalContacts = contacts,
        error => this.errorMessage = <any>error);
  }

  @HostListener('input') onInput(){
    console.log(this.originalContacts);
      console.log(this.searchText);
      this.contacts = this.originalContacts.filter(c=> c.firstName.includes(this.searchText));
      console.log(this.searchText)
      //console.log(filteredContacts);
  }

  idSort(contacts: any) {
    contacts.sort(function(a,b) {
      return a.id - b.id;
    })
  }

  firstNameSort(contacts: any){
    contacts.sort(function(a,b) {
      let nameA = a.firstName.toLowerCase(), nameB = b.firstName.toLowerCase();
      if(nameA < nameB) return -1;
      if(nameA > nameB) return 1;
      return 0;
    })
  }

  lastNameSort(contacts: any){
    contacts.sort(function(a,b) {
      let nameA = a.lastName.toLowerCase(), nameB = b.lastName.toLowerCase();
      if(nameA < nameB) return -1;
      if(nameA > nameB) return 1;
      return 0;
    })
  }

  companySort(contacts: any){
    contacts.sort(function(a,b) {
      let nameA = a.client.name.toLowerCase(), nameB = b.client.name.toLowerCase();
      if(nameA < nameB) return -1;
      if(nameA > nameB) return 1;
      return 0;
    })
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