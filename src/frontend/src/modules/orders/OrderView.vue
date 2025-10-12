<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ item.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: 1 564 ₽</span>
      </div>

      <div class="order__button">
        <button
          @click.prevent.stop="$emit('delete', { id: item.id })"
          type="button"
          class="button button--border"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button type="button" class="button">Повторить</button>
      </div>
    </div>

    <transition-group
      tag="ul"
      class="order__list"
      leave-active-class="animate__animated animate__backOutLeft"
    >
      <pizza-item-view
        v-for="pizza of item.orderPizzas"
        :key="pizza.id"
        :item="pizza"
      />
    </transition-group>
    <ul class="order__additional" v-if="additionalItems">
      <li v-for="additionalItem of additionalItems" :key="additionalItem.id">
        <img
          :src="additionalItem.image"
          width="20"
          height="30"
          alt="Coca-Cola 0,5 литра"
        />
        <p>
          <span>{{ additionalItem.name }}</span>
          <b>{{ additionalItem.price * additionalItem.quantity }} ₽</b>
        </p>
      </li>
    </ul>

    <p class="order__address">
      Адрес доставки: Тест (или если адрес новый - писать целиком)
    </p>
  </section>
</template>

<script>
import PizzaItemView from "@/modules/orders/PizzaItemView.vue";
import { mapGetters } from "vuex";
import { BuilderCollection } from "@/common/enums/builder";

export default {
  name: "OrderView",
  components: { PizzaItemView },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters(["getEntityByID"]),
    additionalItems() {
      if (this.item.orderMisc) {
        return this.item.orderMisc.map(({ miscId, quantity }) => ({
          quantity,
          ...this.getEntityByID({ entity: BuilderCollection.MISC, id: miscId }),
        }));
      }

      return [];
    },
  },
};
</script>
