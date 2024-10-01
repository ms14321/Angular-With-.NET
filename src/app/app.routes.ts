import { Routes } from '@angular/router';
import { EmployeeListComponent } from '../Component/employee-list/employee-list.component';
import { EmployeeFormComponent } from '../Component/employee-form/employee-form.component';
import { LoginComponent } from '../Component/login/login.component';

export const routes: Routes = [
    {
        path:"",
        component:EmployeeListComponent
    },
    {
        path:"employee-list",
        component:EmployeeListComponent
    },
    {
        path:"create-employee",
        component:EmployeeFormComponent
    },
    {
        path:"employee/:id",
        component:EmployeeFormComponent
    },
    {
        path:"login",
        component:LoginComponent
    },

    
];
