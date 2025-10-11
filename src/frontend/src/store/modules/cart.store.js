import {
  ADD_ENTITY,
  CLEAR_ENTITY,
  DELETE_ENTITY,
  REPLACE_ENTITY,
  UPDATE_ENTITY,
} from "@/store/mutations";
import Module from "@/common/enums/module";
import { Cart } from "@/common/enums/entity";
import { v4 as uuidv4 } from "uuid";

const module = Module.CART;

export default {
  namespaced: true,
  state: {
    [Cart.ORDERS]: [],
    [Cart.MISC]: [],
  },
  getters: {
    isEmpty(state) {
      return state[Cart.ORDERS].length === 0;
    },
    totalCountOrders(state) {
      return state[Cart.ORDERS].reduce(
        (sum, order) => sum + order.totalPrice * order.quantity,
        0
      );
    },
    totalCountMics(state) {
      return state[Cart.MISC].reduce(
        (sum, order) => sum + order.price * order.quantity,
        0
      );
    },
    sumOrders(state, getters) {
      return getters.totalCountOrders + getters.totalCountMics;
    },
  },
  actions: {
    updateItem({ commit }, { entity, payload }) {
      commit(
        UPDATE_ENTITY,
        {
          module,
          entity,
          payload,
        },
        { root: true }
      );
    },
    addItem({ commit }, { entity, payload }) {
      commit(
        ADD_ENTITY,
        {
          module,
          entity,
          payload: { ...payload, id: payload.id ? payload.id : uuidv4() },
        },
        { root: true }
      );
    },
    deleteItem({ commit }, { entity, payload: { id } }) {
      commit(
        DELETE_ENTITY,
        {
          module,
          entity,
          id,
        },
        { root: true }
      );
    },
    clearCart({ commit }) {
      commit(
        REPLACE_ENTITY,
        {
          module,
          entity: Cart.MISC,
          payload: [],
        },
        { root: true }
      );

      commit(
        CLEAR_ENTITY,
        {
          module,
          entity: Cart.ORDERS,
          payload: [],
        },
        { root: true }
      );
    },
  },
};
