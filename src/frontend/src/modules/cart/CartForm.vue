<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>
        <select v-model="type" name="test" class="select">
          <option value="1">Заберу сам</option>
          <option value="2">Новый адрес</option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          v-validate="['required']"
          placeholder="+7 999-999-99-99"
          :style="{
            borderColor: currentError('tel') ? 'crimson' : 'gray',
          }"
        />
      </label>

      <transition
        name="address"
        appear
        enter-active-class="animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOutDown"
      >
        <div
          class="cart-form__address"
          v-if="parseInt(type) === DeliveryType.NEW_ADDRESS"
        >
          <span class="cart-form__label">Новый адрес:</span>

          <div class="cart-form__input">
            <label class="input">
              <span>Улица*</span>
              <input type="text" name="street" />
            </label>
          </div>

          <div class="cart-form__input cart-form__input--small">
            <label class="input">
              <span>Дом*</span>
              <input type="text" name="house" />
            </label>
          </div>

          <div class="cart-form__input cart-form__input--small">
            <label class="input">
              <span>Квартира</span>
              <input type="text" name="apartment" />
            </label>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { CrudCollection } from "@/common/heplers";

const DeliveryType = {
  MYSELF: 1,
  NEW_ADDRESS: 2,
};

export default {
  name: "CartForm",
  data() {
    return {
      type: 1,
      errors: [],
    };
  },
  computed: {
    DeliveryType: () => DeliveryType,
    currentError: function () {
      return function (id) {
        return CrudCollection.getElement(this.errors, (item) =>
          item.id.match(id)
        );
      };
    },
  },
};
</script>
