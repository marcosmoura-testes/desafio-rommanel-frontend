import { cnpj, cpf } from 'cpf-cnpj-validator'; // Importando as funções de validação

export class Cliente {
  id: string = '';
  fullName: string = '';
  cpfCnpj: string = '';
  birthDate: string = '';
  phone: string = '';
  email: string = '';
  stateRegistration: string = '';
  isStateRegistrationExempt: boolean = false;
  address: ClienteEndereco = new ClienteEndereco();

  constructor(
    fullName = '',
    cpfCnpj = '',
    birthDate = '',
    phone = '',
    email = '',
    stateRegistration = '',
    isStateRegistrationExempt = false,
    address = new ClienteEndereco()
  ) {
    this.fullName = fullName;
    this.cpfCnpj = cpfCnpj;
    this.birthDate = birthDate;
    this.phone = phone;
    this.email = email;
    this.stateRegistration = stateRegistration;
    this.isStateRegistrationExempt = isStateRegistrationExempt;
    this.address = address;
  }

  // Método para validar o CPF ou CNPJ
  validar(): string[] {
    const errors: string[] = [];
    
    // Verificação de CPF e CNPJ
    if (cnpj.isValid(this.cpfCnpj)) {
      // Se for CNPJ, deve ter inscrição estadual ou ser isento
      if (!this.stateRegistration && !this.isStateRegistrationExempt) {
        errors.push('CNPJ deve ter inscrição estadual ou ser marcado como isento.');
      }
    } else if (cpf.isValid(this.cpfCnpj)) {
      // Se for CPF, verificar idade mínima
      const idade = this.calcularIdade();
      if (idade < 18) {
        errors.push('O CPF informado deve ter idade mínima de 18 anos.');
      }
    } else {
      errors.push('CPF ou CNPJ inválido.');
    }

    return errors;
  }

  private calcularIdade(): number {
    const nascimento = new Date(this.birthDate);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  }
}

export class ClienteEndereco {
  street: string = '';
  number: string = '';
  neighborhood: string = '';
  city: string = '';
  state: string = '';
  zipCode: string = '';

  constructor(
    street: string = '',
    number: string = '',
    neighborhood: string = '',
    city: string = '',
    state: string = '',
    zipCode: string = ''
  ) {
    this.street = street;
    this.number = number;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
  }
}
