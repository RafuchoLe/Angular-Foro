// Importar los modulos del router
import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

// Importar componentes
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { TopicsComponent } from "./components/topics/topics.component";
import { TopicDetailComponent } from "./components/topic-detail/topic-detail.component";

// Array de rutas
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegisterComponent},
    { path: 'ajustes', component: UserEditComponent},
    { path: 'temas', component:TopicsComponent},
    { path: 'temas/:page', component:TopicsComponent},
    { path: 'tema/:id', component: TopicDetailComponent},
    { path: '**', component: HomeComponent},
]

// Export configuraciones
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes)
