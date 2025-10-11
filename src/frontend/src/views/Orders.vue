<template>
  <main class="layout">
    <div class="layout__sidebar sidebar">
      <router-link :to="{ name: 'Index' }" class="logo layout__logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>

      <router-link class="layout__link layout__link--active" to="/orders"
        >История заказов</router-link
      >
      <router-link class="layout__link" to="/profile">Мои данные</router-link>
    </div>

    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Orders",
  computed: {
    ...mapState("Orders", ["orderItems"]),
  },
  async mounted() {
    await this.fetchOrderItems();
  },
  methods: {
    ...mapActions("Orders", ["fetchOrderItems"]),
  },
};
</script>
