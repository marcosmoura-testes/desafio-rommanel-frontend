import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  constructor() {}

  fecharModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    
    if (modalElement) {
      let modalInstance = bootstrap.Modal.getInstance(modalElement);
      
      if (!modalInstance) {
        modalInstance = new bootstrap.Modal(modalElement);
      }

      modalInstance.hide();

      const backdropElement = document.querySelector('.modal-backdrop');
      if (backdropElement) {
        backdropElement.remove();
      }
    }
  }

  abrirModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    
    if (modalElement) {
      let modalInstance = bootstrap.Modal.getInstance(modalElement);
      
      if (!modalInstance) {
        modalInstance = new bootstrap.Modal(modalElement);
      }

      modalInstance.show();
    }
  }
}
