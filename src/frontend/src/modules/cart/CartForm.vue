<template>
  <div class="cart__form">
    <div
      class="cart-form"
      @input.stop="$emit('set', { phone, type, address })"
      @change.stop="$emit('set', { phone, type, address })"
    >
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>
        <select v-model="type" name="test" class="select">
          <option value="0">Заберу сам</option>
          <option value="-1">Новый адрес</option>
          <option
            v-for="address of addresses"
            :key="address.id"
            :value="address.id"
          >
            {{ address.name }}
          </option>
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
          v-model="phone"
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
              <input
                v-validate="['required']"
                v-model="address['street']"
                type="text"
                name="street"
                :style="{
                  borderColor: currentError('street') ? 'crimson' : 'gray',
                }"
              />
            </label>
          </div>

          <div class="cart-form__input cart-form__input--small">
            <label class="input">
              <span>Дом*</span>
              <input
                v-validate="['required']"
                v-model="address['building']"
                type="text"
                name="building"
                :style="{
                  borderColor: currentError('building') ? 'crimson' : 'gray',
                }"
              />
            </label>
          </div>

          <div class="cart-form__input cart-form__input--small">
            <label class="input">
              <span>Квартира</span>
              <input v-model="address['flat']" type="text" name="flat" />
            </label>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { CrudCollection } from "@/common/heplers";
import DeliveryType from "@/common/enums/delivery-type";

export default {
  name: "CartForm",
  props: {
    phone: {
      type: String,
      default: "",
    },
    addresses: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      DeliveryType,
      type: 0,
      address: {},
      tel: "",
      errors: [],
    };
  },
  mounted() {
    if (this.phone) {
      this.tel = this.phone;
    }
  },
  created() {
    this.$emit("set", {
      phone: this.phone,
      type: this.type,
      address: this.address,
    });
  },
  computed: {
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
