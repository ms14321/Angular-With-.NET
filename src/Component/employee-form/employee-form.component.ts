import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { HttpService } from '../../app/http.service';
import { IEmployee } from '../../Interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
formBuilder=inject(FormBuilder);
toaster=inject(ToastrService);
httpService=inject(HttpService);
router=inject(Router);
route=inject(ActivatedRoute);

EmployeeForms=this.formBuilder.group({
  name:['',[Validators.required]],
  email:['',[Validators.required,Validators.email]],
  age:[0,[Validators.required]],
  phone:['',[]],
  salary:[0,[Validators.required]],
  password: ['', [Validators.required, Validators.minLength(4)]],
});
employeeId!: number;
isEdit = false;
ngOnInit()
{
  this.employeeId=this.route.snapshot.params['id'];
  if(this.employeeId){
    this.isEdit = true;
    this.httpService.getEmployee(this.employeeId).subscribe(result=>{
      console.log(result);
      this.EmployeeForms.patchValue(result);
      // this.EmployeeForms.controls.email.disable();
    })
  }

}

save(){
  console.log(this.EmployeeForms.value)
  const employee :IEmployee={
    name:this.EmployeeForms.value.name!,
    age:this.EmployeeForms.value.age!,
    email:this.EmployeeForms.value.email!,
    phone:this.EmployeeForms.value.phone!,
    salary:this.EmployeeForms.value.salary!,
    password: this.EmployeeForms.value.password!,
  } as IEmployee

  if(this.isEdit){
    this.httpService.updateEmployee(this.employeeId,employee).subscribe(()=>{
      console.log("success");
      this.toaster.success("Record Update Successfully.");
      this.router.navigateByUrl("/employee-list");
  
    });
  }
  else{
    this.httpService.createEmployee(employee).subscribe(()=>{
      console.log("success");
      this.toaster.success("Record Added Successfully");
      this.router.navigateByUrl("/employee-list");
  
    });
  }
  

}
}
