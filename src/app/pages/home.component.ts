import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<h2 class="mt-4">Bem-vindo ao sistema de administração</h2>`,
  styles: []
})
export class HomeComponent implements OnInit {
  async ngOnInit() {
    console.log("!CLIENTES")
    //this.carregarClientes();
  }
}