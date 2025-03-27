import axios from 'axios';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:5277/api/Client'; // Trocar pelo seu endpoint real

  async getClientes() {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  async getClienteById(clienteId: number) {
    try {
      const response = await axios.get(`${this.apiUrl}/${clienteId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter cliente:", error);
    }
  }

  async addCliente(cliente: Cliente) {
    try {
      const response = await axios.post(this.apiUrl, cliente, { timeout: 5000 }); // Timeout de 5s
      console.log("Resposta da API:", response);
      return response.data;
    } catch (error) {
      console.error("Erro ao chamar API:", error);
    }
  }

  async updateCliente(clienteId: string, cliente: Cliente) {
    try {
      const response = await axios.put(`${this.apiUrl}/${clienteId}`, cliente, { timeout: 5000 });
      console.log("Resposta da API:", response);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  }

  async deleteCliente(clienteId: string) {
    try {
      const response = await axios.delete(`${this.apiUrl}/${clienteId}`, { timeout: 5000 });
      console.log("Resposta da API:", response);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  }
}
