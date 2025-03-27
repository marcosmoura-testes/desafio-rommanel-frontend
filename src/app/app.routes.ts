import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component'; // Exemplo de componente
import { ClientesComponent } from './pages/clientes.component'; // Exemplo de componente

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota inicial
  { path: 'home', component: HomeComponent },
  { path: 'clientes', component: ClientesComponent }
];
