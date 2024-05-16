import { defineStore } from 'pinia';

interface PaymentOption {
  method: string;
  description: string;
  icon: string;
  alt?: string;
  formComponent: string; // Adicionando propriedade formComponent
  styleClass: string;    // Adicionando propriedade styleClass
  // Outros campos relevantes
}

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    paymentOptions: [
      { method: 'credit-card', description: 'Cartão de Crédito', icon: ('../assets/credit-card.png'), alt: 'Ícone de cartão de crédito', formComponent: 'CreditCardPayment', styleClass: 'payment-style' },
      { method: 'boleto', description: 'Boleto ', icon: ('../assets/boleto.jpg'), alt: 'Ícone de boleto', formComponent: 'BoletoPayment', styleClass: 'payment-style' },
      { method: 'pix', description: 'Pix', icon: ('../assets/pix-icon.png'), alt: 'Ícone de cartão de crédito', formComponent: 'PixPayment', styleClass: 'payment-style' }
    ] as PaymentOption[],
    paymentMethod: null as string | null // Adicionando paymentMethod ao estado
  }),
  getters: {
    getPaymentOptions(state) {
      return state.paymentOptions;
    }
  },

  actions: {
    SET_PAYMENT_METHOD(method: string) {
      const paymentOption = this.paymentOptions.find(option => option.method === method);

      if (paymentOption) {
        this.paymentOptions.forEach(option => option.styleClass = 'payment-style');
        paymentOption.styleClass = 'payment-style active';
        this.paymentMethod = method; // Definindo o método de pagamento selecionado
      }
    }
  }
});

export { }




// interface PaymentOption {
//   method: string;
//   label: string;
//   icon: string;
//   alt: string;
//   formComponent: string;
//   styleClass: string;
// }

// interface PaymentState {
//   step: number;
//   paymentMethod: string | null; // União de tipos
//   paymentOptions: PaymentOption[];
// }

// export const usePaymentStore = defineStore({
//   id: 'payment',
//   state: (): PaymentState => ({
//     step: 1,
//     paymentMethod: null,
//     paymentOptions: [
//       {
//         method: 'cartao',
//         label: 'Cartão de Crédito',
//         icon: require('@/assets/credit-card.png'),
//         alt: 'Ícone de cartão de crédito',
//         formComponent: 'CreditCardForm',
//         styleClass: 'pix-icon',
//       },
//       {
//         method: 'boleto',
//         label: 'Boleto',
//         icon: require('@/assets/boleto.jpg'),
//         alt: 'Ícone de boleto',
//         formComponent: 'BoletoForm',
//         styleClass: 'pix-icon',
//       },
//       {
//         method: 'pix',
//         label: 'Pix',
//         icon: require('@/assets/pix-icon.png'),
//         alt: 'Ícone de Pix',
//         formComponent: 'PixForm',
//         styleClass: 'pix-icon',
//       },
//     ],
//   }),
//   actions: {
//     setStep(step: number): void {
//       this.$state.step = step;
//     },

//     setPaymentMethod(method: string | null): void {
//       this.$state.paymentMethod = method;
//     },
//   },
// });
