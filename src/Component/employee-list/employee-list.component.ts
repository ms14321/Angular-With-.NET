import { Component, inject } from '@angular/core';
import { IEmployee } from '../../Interfaces/employee';
// import { HttpStatusCode } from '@angular/common/http';
import { HttpService } from '../../app/http.service';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router,RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Token } from '@angular/compiler';
// import { Router } from 'express';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
employeeList: IEmployee[] =  [];
toaster=inject(ToastrService);
router=inject(Router);
httpServices =inject(HttpService);
displayedColumns: string[] = [
  'id',
  'name',
  'email',
  'age',
  'phone',
  'salary',
  'action'
];
ngOnInit(){
  this.getEmployeeFromServer();
  // const token= localStorage.getItem("token");
  
  }

  getEmployeeFromServer()
  {
    this.httpServices.getAllEmployee().subscribe(result=>{
      this.employeeList=result;
      console.log(this.employeeList);
  });
}

edit(id:number)
{
  console.log(id);
  this.router.navigateByUrl("employee/"+id);
}
delete(id:number)
{
  console.log(id);
  this.httpServices.deleteEmployee(id).subscribe(()=>{
    console.log("Deleted");
    this.toaster.success("Record Deleted Successfully");
    // this.employeeList=this.employeeList.filter(x=>x.id!=id);
    this.getEmployeeFromServer();
  })
}


}
