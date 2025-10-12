import {
  ADD_ORDER_ITEM,
  REMOVE_ORDER_ITEM,
  REPLACE_ENTITY,
} from "@/store/mutations";
import { v4 as uuidv4 } from "uuid";
import Module from "@/common/enums/module";

const module = Module.ORDERS;

export default {
  namespaced: true,
  state: {
    orderItems: [],
  },
  mutations: {
    [ADD_ORDER_ITEM](state, orderItem) {
      return state.orderItems.push({
        id: uuidv4(),
        orders: orderItem,
      });
    },
    [REMOVE_ORDER_ITEM](state, order) {
      const index = state.orderItems.findIndex(
        (orderItem) => orderItem.id === order.id
      );

      return state.orderItems.splice(index, 1);
    },
  },
  actions: {
    addOrder({ commit }, orders) {
      commit(ADD_ORDER_ITEM, orders);
    },
    async fetchOrderItems({ commit }) {
      const payload = await this.$api.orders.query();

      commit(REPLACE_ENTITY, {
        module,
        entity: "orderItems",
        payload,
      });
    },
  },
};
