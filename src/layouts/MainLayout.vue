<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark">
      <q-toolbar>


        <q-toolbar-title>
          Pagamento Recomb
        </q-toolbar-title>

        <div>
          <q-img class="img-main" src="https://randomuser.me/api/portraits/women/75.jpg"></q-img>
        </div>
      </q-toolbar>
    </q-header>



    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

defineOptions({
  name: 'MainLayout'
});


</script>
<style>
.img-main {
  width: 40px;
  height: 40px;
  border-radius: 40px;
}
</style>