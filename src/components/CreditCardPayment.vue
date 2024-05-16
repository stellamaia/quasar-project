<template>
    <div class="credit-checkout-container">
        <div>
            <q-form>

                <div id="q-app">
                    <q-select v-model="flags" :options="options" label="Bandeira"></q-select>

                </div>
                <q-input v-model="number" label="Numero do Cartão" class="font-size-12"
                    :rules="[val => !!val && val.length === 16 || 'Por favor, insira o número do cartão']"
                    @keypress="onlyNumbers"></q-input>
                <div class="row">
                    <div class="col-6 space">
                        <q-input v-model="cvv" label="CVV" class="font-size-12"
                            :rules="[val => !!val && val.length === 3 || 'Por favor, insira o CVV']" maxlength="3"
                            @keypress="onlyNumbers"></q-input>
                    </div>
                    <div class="col-6 ">
                        <q-input v-model="expiryDate" label="Vencimento" class="font-size-12" @input="formatExpiryDate"
                            :rules="[val => /^(0[1-9]|1[0-2])\/20[2-9][0-9]$/.test(val) || 'Formato de data inválido (MM/YYYY)']"></q-input>
                    </div>
                </div>

                <q-input v-model="name" label="Nome" lazy-rules :rules="[val => !!val || 'Por favor, insira seu nome']"
                    class="font-size-12"></q-input>

                <div class="row">
                    <div class="col-6 space">
                        <q-input v-model="cpf" label="CPF" class="font-size-12" maxlength="11"
                            :rules="[val => !!val && val.length === 11 || 'CPF deve ter 11 dígitos']"
                            @keypress="onlyNumbers"></q-input>
                    </div>
                    <div class="col-6 ">
                        <q-input v-model="cnpj" label="CNPJ" class="font-size-12" maxlength="14" @keypress="onlyNumbers"
                            :rules="[val => !!val && val.length === 14 || 'CNPJ deve ter 14 dígitos']"></q-input>
                    </div>

                </div>

                <q-btn color="black full-width" @click="confirmPayment">Confirmar Pagamento</q-btn>

                <q-dialog v-model="dialogVisible" persistent>
                    <q-card>
                        <q-card-section class="text-center">
                            <p>Por favor, preencha todos os campos.</p>
                        </q-card-section>
                        <q-card-actions align="center">
                            <q-btn color="primary" label="OK" @click="dialogVisible = false" />
                        </q-card-actions>
                    </q-card>
                </q-dialog>
            </q-form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({


    setup(_props, { emit }) {
        // Data and methods to handle credit card payment
        const flags = ref(null);

        const number = ref(null);
        const cvv = ref(null);
        const expiryDate = ref(null);
        const cpf = ref(null);
        const cnpj = ref(null);
        const name = ref(null);
        const formattedExpiryDate = ref();
        const dialogVisible = ref(false);

        const onlyNumbers = (event: KeyboardEvent) => {
            const keyCode = event.keyCode;
            const validKeys = [8, 46, 37, 38, 39, 40]; // backspace, delete, arrows
            if ((keyCode < 48 || keyCode > 57) && !validKeys.includes(keyCode)) {
                event.preventDefault();
            }
        };

        const formatExpiryDate = (event: InputEvent) => {
            const input = event.target as HTMLInputElement;
            const value = input.value.replace(/\D/g, '');
            const formatted = value
                .slice(0, 2)
                .replace(/^(1[3-9])$/, '12')
                .replace(/^(0[1-9]|1[0-2])$/, '$1/');
            formattedExpiryDate.value = formatted;
        };

        const confirmPayment = () => {

            console.log('Verificando campos:');
            console.log('Bandeira:', flags.value);
            console.log('Número do cartão:', number.value);
            console.log('CVV:', cvv.value);
            console.log('Data de vencimento:', expiryDate.value);
            console.log('CPF:', cpf.value);
            console.log('CNPJ:', cnpj.value);
            console.log('Nome:', name.value);
            // Check if all fields are empty
            if (flags.value && number.value && cvv.value && expiryDate.value && cpf.value && cnpj.value && name.value) {
                // All fields are empty, proceed to step 1
                console.log('Todos os campos estão preenchidos.');
                emit('next-step', 3);
                // step.value = 3;
            } else {
                // Some fields are filled, do not proceed to step 1
                console.log('Alguns campos não estão preenchidos.');
                dialogVisible.value = true;
            }


        };
        return {
            // Data and methods to be used in template
            // step,
            flags,
            options: [
                'Mastercard', 'Visa'
            ],
            number,
            cvv,
            expiryDate,
            cpf,
            cnpj,
            name,
            formattedExpiryDate,
            onlyNumbers,
            formatExpiryDate,
            confirmPayment,
            dialogVisible,
        }
    }
})
</script>

<style scoped>
.font-size-12 {
    font-size: 12px;
}

.credit-checkout-container {
    padding-top: 60px;
    padding-bottom: 60px;
}

.q-field ::v-deep .q-field__inner.relative-position.col.self-stretch {
    display: inline !important;
}

.space {
    padding-right: 20px;
}
</style>
