import { Component, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import { BomberosService } from './services/bomberos.service';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];





@Component({
  selector: 'app-bomberos',
  templateUrl: './bomberos.component.html',
  styleUrls: ['./bomberos.component.css']
})
export class BomberosComponent implements AfterViewInit, OnInit {

 

  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['nombres', 'apellidos', 'email', 'fechaNacimiento','fechaAlta','categoria','turno','actions'];
  //dataSource = new MatTableDataSource(ELEMENT_DATA); 
  dataSource = new MatTableDataSource(); 

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private bomberosSvc:BomberosService, private dialog: MatDialog ) {
   
  }


  ngOnInit(): void {
    //this.bomberosSvc.getAll().subscribe(res=>console.log('Bomberos->', res));
    this.bomberosSvc.getAll().subscribe((res)=>{
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onOpenModal(bombero={}):void{
    console.log('bombero->',bombero);
    const dialogRef = this.dialog.open(ModalComponent,{
      height:'600px',
      width:'800px',
      hasBackdrop: true,
      disableClose:true,
      
      data:{title:'Agregando Bombero', bombero:bombero}
    });
    // dialogRef.afterClosed().subscribe
  }

 

}
