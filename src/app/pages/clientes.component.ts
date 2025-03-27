import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../utils/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  imports: [
    FormsModule,CommonModule,
  ]
})

export class ClientesComponent implements OnInit {
  ehCPF = false;
  ehCNPJ = false;

  clientes: Cliente[] = [];
  novoCliente : Cliente = new Cliente("","","","","","",false, { street: '', number: '', neighborhood: '', city: '', state: '', zipCode: '' });

  constructor(private clienteService: ClienteService, private modalService : ModalService) { }

  async ngOnInit() {
    this.carregarClientes();
  }

  async carregarClientes() {
    this.clientes = await this.clienteService.getClientes();
  }

  criaNovoCliente() {

    this.novoCliente =  new Cliente("","","","","","",false, { street: '', number: '', neighborhood: '', city: '', state: '', zipCode: '' });
    this.modalService.abrirModal('clienteModal'); 
  }
  
  async adicionarCliente() {
    const erros = this.novoCliente.validar();

  if (erros.length > 0) {
    // Exibe os erros para o usuário
    
    erros.forEach(erro => {
      Swal.fire({
        title: "ERRO",
        text: erro,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false
      });
    })
   
    // Você pode exibir esses erros de forma mais amigável para o usuário (ex. via toast, alert, etc.)
    return;
  }

  if(this.novoCliente.id == "") {
    await this.clienteService.addCliente(this.novoCliente);
  }
  else
  {
    await this.clienteService.updateCliente(this.novoCliente.id, this.novoCliente);
  }
  this.carregarClientes();
    this.modalService.fecharModal('clienteModal');
  }

  verificarTipoDocumento() {
    const doc = this.novoCliente.cpfCnpj.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (doc.length === 11) {
      this.ehCPF = true;
      this.ehCNPJ = false;
      this.novoCliente.stateRegistration = ''; // Limpa o campo se mudar para CPF
      this.novoCliente.isStateRegistrationExempt = false;
    } else if (doc.length === 14) {
      this.ehCPF = false;
      this.ehCNPJ = true;
      this.novoCliente.birthDate = ''; // Limpa o campo se mudar para CNPJ
    } else {
      this.ehCPF = false;
      this.ehCNPJ = false;
    }
  }

  editarCliente(cliente: Cliente) {
    this.novoCliente = Object.assign(new Cliente(), cliente); // Copia os dados do cliente para o modal
    this.modalService.abrirModal('clienteModal');  // Abre o modal de edição
  }

   // Função para excluir um cliente
   async excluirCliente(cliente: Cliente) {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: `Você deseja excluir o cliente ${cliente.fullName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      await this.clienteService.deleteCliente(cliente.id);  // Chama o serviço para excluir o cliente
      Swal.fire(
        'Excluído!',
        `O cliente ${cliente.fullName} foi excluído.`,
        'success'
      );
      this.carregarClientes();  // Atualiza a lista de clientes
    }
  }
}
