import { Component, OnInit, Input, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-billing-record',
  templateUrl: './billing-record.component.html',
  styleUrls: ['./billing-record.component.css'],
  animations: [fadeInAnimation]
})
export class BillingRecordComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  billingRecords: any[];
  originalBR: any[];
  searchText: string = '';
  filterBy: string = '';

  constructor (private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit() { this.getBillingRecords(); }

  getBillingRecords() {
    this.dataService.getRecords("billing-record")
      .subscribe(
        results => this.billingRecords = results,
        error =>  this.errorMessage = <any>error);
    this.dataService.getRecords("billing-record")
      .subscribe(
        results => this.originalBR = results,
        error => this.errorMessage = <any>error);
  }

  @HostListener('input') onInput(){
    if(this.filterBy=='description'){
      this.billingRecords = this.originalBR.filter(br=> br.description.toLowerCase().includes(this.searchText.toLowerCase()));
    } 
    else if(this.filterBy=='companyName'){
      this.billingRecords = this.originalBR.filter(br=> br.client.name.toLowerCase().includes(this.searchText.toLowerCase()));
    }
    else if(this.filterBy=='createdBy'){
      this.billingRecords = this.originalBR.filter(br=> br.createdBy.username.toLowerCase().includes(this.searchText.toLowerCase()));
    }
  }

  idSort(billingRecords: any) {
    billingRecords.sort(function(a,b) {
      return a.id - b.id;
    })
  }

  descSort(billingRecords: any){
    billingRecords.sort(function(a,b) {
      let nameA = a.description.toLowerCase(), nameB = b.description.toLowerCase();
      if(nameA < nameB) return -1;
      if(nameA > nameB) return 1;
      return 0;
    })
  }

  clientSort(billingRecords: any){
    billingRecords.sort(function(a,b) {
      let nameA = a.client.name.toLowerCase(), nameB = b.client.name.toLowerCase();
      if(nameA < nameB) return -1;
      if(nameA > nameB) return 1;
      return 0;
    })
  } 
}
