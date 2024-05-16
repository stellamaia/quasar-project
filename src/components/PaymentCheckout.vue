<template>
  <div>
    <!-- Mostrando as opções de pagamento -->
    <div v-if="step === 1">
      <div class="checkout-container">
        <h2 class="payment-options-title">Escolha a opção de pagamento:</h2>
      </div>
      <div v-for="option in paymentOptions" :key="option.method">
        <div class="row">
          <div class="col">
            <q-img :src="parseRequireImg(option.icon)" :alt="option.alt" :class="option.styleClass"></q-img>
            <q-btn flat class="payment-buttons" :label="option.description" @click="choosePayment(option.method)" />
          </div>
        </div>
      </div>
    </div>

    <!-- Renderizar o conteúdo específico para o método "cartão de crédito" -->
    <div v-else-if="step === 2">
      <p class="title">Preencher informações adicionais:</p>
      <div v-if="currentPaymentMethod === 'credit-card'">
        <CreditCardPayment @next-step="step = $event" />





      </div>
    </div>
    <div v-else-if="step === 3">
      <div class="information-summary">
        <div class="row">

          <div class="col-1">
            <q-icon name="keyboard_backspace" class="back-icon" @click="goBack"></q-icon>

          </div>
        </div>
        <p class="success-message">Pagamento efetuando com sucesso!</p>
        <p class="purchase-summary "> Resumo da compra </p>



        <div class="card-container">

          <q-card class="my-card  ">
            <div class="row">
              <div class="col-8">

                <q-card-section class="card-text-section">
                  <div class="text-h6">AirPods Max</div>
                  <div class="text-subtitle2">Preço: R${{ formatPrice(prices['AirPods Max']) }}</div>

                  <div>
                    É preciso ter os AirPods Max com a versão mais recente do software e...
                  </div>
                </q-card-section>
              </div>
              <div class="col-4">
                <q-card-section>
                  <q-img src="../assets/airpods-max.png" style="width: 100px; height: 100px;"></q-img>
                </q-card-section>
              </div>
            </div>
            <q-separator />

            <div class="row">
              <div class="col-8">

                <q-card-section class="card-text-section">
                  <div class="text-h6">AirPods (3ª geração)</div>
                  <div class="text-subtitle2">Preço: R${{ formatPrice(prices['AirPods (3ª geração)']) }}</div>

                  <div>
                    Os AirPods são leves e oferecem ajuste arredondado. Eles se...
                  </div>
                </q-card-section>
              </div>
              <div class="col-4">
                <q-card-section>
                  <q-img src="../assets/airpods.png" style="width: 100px; height: 100px;"></q-img>
                </q-card-section>
              </div>
            </div>

            <q-separator />

            <div class="row">
              <div class="col-8">

                <q-card-section class="card-text-section">
                  <div class="text-h6">iPhone 15 Pro</div>
                  <div class="text-subtitle2">Preço: R${{ formatPrice(prices['iPhone 15 Pro']) }}</div>

                  <div>
                    Titânio com a parte de trás em vidro matte texturizado, Botão de Ação...
                  </div>
                </q-card-section>
              </div>
              <div class="col-4">
                <q-card-section>
                  <q-img src="../assets/iphone.png" style="width: 100px; height: 100px;"></q-img>
                </q-card-section>
              </div>
            </div>

            <q-separator />

            <q-card-section class="card-resume-section">
              <p class="text">Método de pagamento: {{ paymentOptions.find(option => option.method ===
                paymentMethod)?.description }}</p>
              <p class="text">Data da compra: {{ new Date().toLocaleDateString() }} </p>
              <p class="text">Previsão de entrega: {{ new Date(Date.now() + 7 * 24 * 60 * 60 *
                1000).toLocaleDateString()
                }}</p>
              <p class="text">Valor da compra: {{ formatPrice(prices['AirPods Max'] + prices['AirPods (3ª geração)'] +
                prices['iPhone 15 Pro']) }} </p>
            </q-card-section>


          </q-card>

        </div>
      </div>
    </div>
    <!-- <div v-else-if="currentPaymentMethod === 'boleto'">
      <p>Outro método de pagamento seleciossssnado</p>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { usePaymentStore } from '../stores/example-store'; // Importando o store

import CreditCardPayment from './CreditCardPayment.vue';
// import BoletoPayment from './BoletoPayment.vue';
// import PixPayment from './PixPayment.vue';

export default defineComponent({
  components: {
    CreditCardPayment,
    // BoletoPayment,
    // PixPayment
  },
  setup() {

    const paymentStore = usePaymentStore();
    const step = ref(1); // Variável para controlar o fluxo de pagamento
    const currentPaymentMethod = computed(() => paymentStore.$state.paymentMethod);




    const accept = ref(false);


    const parseRequireImg = (path: string) => {
      return new URL(`${path}`, import.meta.url).href
    }

    // Lógica para escolher o método de pagamento
    const choosePayment = (method: string) => {
      paymentStore.SET_PAYMENT_METHOD(method);
      step.value = 2; // Avança para o próximo passo ao escolher o método de pagamento
    }


    const formatPrice = (price: number) => {
      return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const goBack = () => {
      step.value = 1;
    }


    return {
      step,
      choosePayment,

      parseRequireImg,
      paymentOptions: paymentStore.$state.paymentOptions,
      currentPaymentMethod,

      accept,

      prices: {
        'AirPods Max': 6590,
        'AirPods (3ª geração)': 1899,
        'iPhone 15 Pro': 10999,
      },
      formatPrice,
      goBack,
      paymentMethod: computed(() => paymentStore.$state.paymentMethod),

    }
  }
})
</script>

<style>
.q-page {
  min-height: auto !important;
}

.checkout-container {
  padding-top: 40px;
}



.title {
  margin: 16px;
  font-size: 20px;
  font-weight: bold;
}

.payment-options-title {
  font-size: 20px;
  font-weight: bold;
}

.payment-style {
  height: 25px !important;
  width: 25px;
  display: flex;
  margin-right: 10px;
}

.col {
  display: flex;
}

.payment-buttons {
  margin-left: 10px;
  cursor: pointer;
}

.success-message {
  padding-top: 50px;

  font-size: 20px;
  font-weight: bold;
}

.purchase-summary {
  font-weight: bold;
}

.title-information {
  padding-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}

.card-text-section {
  text-align: start;
}

.my-card {
  width: 80%;


}

.information-summary {
  justify-content: center;
  text-align: center;
}

.card-container {
  display: flex;
  justify-content: center;
}

.card-resume-section {
  text-align: start;
  font-weight: bold;

}

.text {
  margin: 0;
}

.back-icon {
  cursor: pointer;
  top: 60px;
  left: 43px;
  font-size: 20px;
}
</style>
