import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExcursionCardsListComponent } from './components/excursion-cards-list/excursion-cards-list.component';
import { AddExcursionFormComponent } from './components/add-excursion-form/add-excursion-form.component';
import { CartComponent } from './components/cart/cart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ReservationsHistoryComponent } from './components/reservations-history/reservations-history.component';
import { SingleExcursionViewComponent } from './components/single-excursion-view/single-excursion-view.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { UserRoles } from './shared/models/user-roles';
import { AdminPanelUsersComponent } from './components/admin-panel-users/admin-panel-users.component';


const routes: Routes = [
  { path: 'excursions', component: ExcursionCardsListComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard], data: { customer: true, admin: false, manager: false } as UserRoles},
  { path: 'add-excursion-form', component: AddExcursionFormComponent, canActivate: [AuthGuard], data: { customer: false, admin: true, manager: true } as UserRoles },
  { path: 'home', component: HomeComponent },
  { path: 'reservations-history', component: ReservationsHistoryComponent, canActivate: [AuthGuard], data: { customer: true, admin: false, manager: false } as UserRoles },
  { path: 'excursion/:id', component: SingleExcursionViewComponent, canActivate: [AuthGuard], data: { customer: true, admin: true, manager: true } as UserRoles },
  { path: 'login-register', component: LoginRegisterComponent },
  { path: 'admin-panel-users', component: AdminPanelUsersComponent, canActivate: [AuthGuard], data: { customer: false, admin: true, manager: false } as UserRoles },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
