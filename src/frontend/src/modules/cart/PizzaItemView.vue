<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="item.name"
      />
      <div class="product__text">
        <h2>{{ item.name }}</h2>
        <ul>
          <li>{{ selectSize.name }}, {{ selectDough.name }},</li>
          <li>Соус: {{ selectSauce.name }}</li>
          <li v-if="fill">
            Начинка:
            {{ fill }}
          </li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        :disabled="item.quantity < 1"
        @click="changeItem({ ...item, quantity: (item.quantity -= 1) })"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        :value="item.quantity"
      />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
        @click="changeItem({ ...item, quantity: (item.quantity += 1) })"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ totalPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        @click="$emit('edit', item)"
        type="button"
        class="cart-list__edit"
      >
        Изменить
      </button>
      <button
        type="button"
        class="cart-list__edit"
        @click="
          $emit('delete', {
            entity,
            payload: item,
          })
        "
      >
        Удалить
      </button>
    </div>
  </li>
</template>

<script>
import { BuilderCollection } from "@/common/enums/builder";
import { Cart } from "@/common/enums/entity";
import { CrudCollection } from "@/common/heplers";
import { mapState } from "vuex";

export default {
  name: "itemItemView",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    entity: Cart.ORDERS,
  }),
  computed: {
    ...mapState(["dough", "ingredients", "sauces", "sizes"]),
    selectDough() {
      return CrudCollection.getElementByID(
        this.dough,
        this.item[BuilderCollection.DOUGH]
      );
    },
    selectSauce() {
      return CrudCollection.getElementByID(
        this.sauces,
        this.item[BuilderCollection.SAUCES]
      );
    },
    selectSize() {
      return CrudCollection.getElementByID(
        this.sizes,
        this.item[BuilderCollection.SIZES]
      );
    },
    selectIngredients() {
      return this.item.ingredients.map((item) => {
        const payload = CrudCollection.getElementByID(
          this.ingredients,
          item.id
        );

        return {
          ...item,
          ...payload,
        };
      });
    },
    fill() {
      return this.selectIngredients.map(({ name }) => name).join(", ");
    },
    totalPrice() {
      return this.item.totalPrice * this.item.quantity;
    },
  },
  methods: {
    changeItem(payload) {
      if (payload.quantity < 1) {
        this.$emit("delete", {
          entity: Cart.ORDERS,
          payload,
        });
      }

      this.$emit("update", {
        entity: Cart.ORDERS,
        payload,
      });
    },
  },
};
</script>

<style scoped></style>
