import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  animations: [fadeInAnimation]
})
export class InvoiceComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  invoices: any[];

  constructor (private dataService: DataService) {}

  ngOnInit() { this.getInvoices(); }

  getInvoices() {
    this.dataService.getRecords("invoice")
      .subscribe(
        results => this.invoices = results,
        error =>  this.errorMessage = <any>error);
  }

  idSort(invoices: any) {
    invoices.sort(function(a,b) {
      return a.id - b.id;
    })
  }

  descSort(invoices: any){
    invoices.sort(function(a,b) {
      let nameA = a.invoiceDescription.toLowerCase(), nameB = b.invoiceDescription.toLowerCase();
      if(nameA < nameB) return -1;
      if(nameA > nameB) return 1;
      return 0;
    })
  }

  clientSort(invoices: any){
    invoices.sort(function(a,b) {
      let nameA = a.company.name.toLowerCase(), nameB = b.company.name.toLowerCase();
      if(nameA < nameB) return -1;
      if(nameA > nameB) return 1;
      return 0;
    })
  } 

}
