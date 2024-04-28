import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { ErrorPageComponent } from "./pages/error-page/error-page.component";
import { AuthGuard } from "./guard/auth.guard";
import { ResetPasswordPageComponent } from "./pages/reset-password-page/reset-password-page.component";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { HeaderComponent } from "./components/header/header.component";


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomePageComponent},
    {path: 'users-list', component: UsersListComponent},
    {path: 'header', component: HeaderComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'resetpassword', component: ResetPasswordPageComponent},
    {path: '**', component: ErrorPageComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}