import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: 'home',
        loadChildren: () => import('../app/views/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'billing',
        loadChildren: () => import('../app/views/billing/billing.module').then(m => m.BillingModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'inventory',
        loadChildren: () => import('../app/views/inventory/inventory.module').then(m => m.InventoryModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        loadChildren: () => import('../app/views/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'reports',
        loadChildren: () => import('../app/views/reports/reports.module').then(m => m.ReportsModule) ,
        canActivate: [AuthGuard]
    }
    /*Page not found*/
    // {
    //     path: '**',
    //     component: PageNotFoundComponent
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
