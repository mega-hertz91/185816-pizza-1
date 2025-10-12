<template>
  <form method="post" class="layout-form">
    <slot name="popup" />
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>
        <div class="sheet cart__empty" v-if="isEmpty">
          <p>В корзине нет ни одного товара</p>
        </div>
        <div v-else>
          <cart-orders
            @update="updateItem"
            @delete="deleteItemOrder"
            @edit="editOrder"
            :items="orders"
          />
          <cart-additional
            @add="addItem"
            @delete="deleteItem"
            @update="updateItem"
            :items="misc"
          />
          <cart-form
            @set="(data) => (address = data)"
            :phone="isAuthenticated ? user.phone : ''"
            :addresses="addresses"
          />
        </div>
      </div>
    </main>
    <cart-footer :sum="sumOrders" @makeOrder="makeOnOrder" />
    <router-view />
  </form>
</template>

<script>
import CartFooter from "@/modules/cart/CartFooter";
import { mapActions, mapGetters, mapState } from "vuex";
import CartOrders from "@/modules/cart/CartOrders";
import CartAdditional from "@/modules/cart/CartAdditional";
import CartForm from "@/modules/cart/CartForm";

export default {
  name: "CartView",
  components: {
    CartOrders,
    CartFooter,
    CartAdditional,
    CartForm,
  },
  data() {
    return {
      address: {},
    };
  },
  computed: {
    ...mapState(["misc"]),
    ...mapState("Auth", ["user", "isAuthenticated"]),
    ...mapState("Cart", ["orders", "mics"]),
    ...mapState("Address", {
      addresses: "items",
    }),
    ...mapGetters("Cart", ["isEmpty", "sumOrders", "selectMisc"]),
  },
  async mounted() {
    if (this.isAuthenticated) {
      await this.fetchAddresses();
    }
  },
  methods: {
    ...mapActions("Cart", ["deleteItem", "updateItem", "addItem", "clearCart"]),
    ...mapActions("Address", {
      fetchAddresses: "fetchItems",
    }),
    editOrder(payload) {
      this.$store.state.Builder = payload;

      this.$router.push("/");
    },
    deleteItemOrder(payload) {
      this.deleteItem(payload);

      if (this.orders.length < 1) {
        this.clearCart();
      }
    },
    async makeOnOrder() {
      let request = {};
      const { phone, type, ...address } = this.address;

      console.log(type);

      if (this.isAuthenticated) {
        request = {
          userId: this.user.id,
          address: (() => {
            if (type < 0) {
              return { ...address };
            }

            if (type > 0) {
              return type;
            }

            return null;
          })(),
          phone: this.isAuthenticated ? this.user.phone : phone,
          pizzas: this.orders.map(
            ({ name, dough, ingredients, sauces, sizes, quantity }) => ({
              name,
              doughId: dough,
              sauceId: sauces,
              quantity,
              sizeId: sizes,
              ingredients: ingredients.map(({ id, quantity }) => ({
                ingredientId: id,
                quantity,
              })),
            })
          ),
          misc: this.selectMisc.map(({ id, quantity }) => ({
            miscId: id,
            quantity,
          })),
        };
        await this.$api.orders.post(request);
      } else {
        request = {
          address: { ...this.address },
          phone: this.isAuthenticated ? this.user.phone : this.address.phone,
          pizzas: this.orders,
          misc: this.misc,
        };
      }

      await this.clearCart();
      await this.$router.push("cart/success-popup");
    },
  },
};
</script>
