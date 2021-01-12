<template>
  <div
    class="top-container"
    style="width: 100%; margin-bottom: 15px; height: 40px"
  >
    <button
      type="submit"
      @click="showOrderList()"
      v-if="showBtnOrderList"
      class="mdc-button mdc-button__ripple"
      style="float: left"
    >
      <i class="material-icons mdc-button__icon" aria-hidden="true"
        >arrow_back</i
      >
      <span class="mdc-button__label">Danh sách đơn hàng</span>
    </button>

    <button
      type="submit"
      @click="showAddOrder()"
      v-if="showBtnAddOrder"
      class="mdc-button mdc-button--raised"
      style="float: right"
    >
      <i class="material-icons mdc-button__icon" aria-hidden="true">add</i>
      <span class="mdc-button__label">Thêm đơn hàng</span>
    </button>
  </div>
  <component
    :is="currentTabComponent"
    v-bind="editOrder"
    @addOrderSuccess="addOrderSuccess"
    @editOrderById="editOrderById"
  ></component>
</template>


<script>
import { onMounted, ref } from "vue";
import AddOrder from "./AddOrder.vue";
import OrderList from "./OrderList.vue";


export default {
  name: "Order",
  components: {
    AddOrder,
    OrderList,
  },
  setup(props, { emit }) {
    // Thông tin order muốn edit
    let editOrder = ref();

    let currentTabComponent = ref("OrderList");
    let showBtnOrderList = ref(false);
    let showBtnAddOrder = ref(false);

    const showAddOrder = () => {
      showBtnOrderList.value = true;
      showBtnAddOrder.value = false;
      currentTabComponent.value = "AddOrder";
    };

    const showOrderList = () => {
      // khi tới màn hình danh sách danh mục thì reset currentOrder
      editOrder.value = { currentOrder: null };

      showBtnOrderList.value = false;
      showBtnAddOrder.value = false;
      currentTabComponent.value = "OrderList";
    };

    // Xử lý event addOrderSuccess
    const addOrderSuccess = (added) => {
      showBtnOrderList.value = false;
      showBtnAddOrder.value = false;
      currentTabComponent.value = "OrderList";
    };

    // Xử lý event editOrderById
    const editOrderById = (order) => {
      showBtnOrderList.value = true;
      showBtnAddOrder.value = false;
      currentTabComponent.value = "AddOrder";
      editOrder.value = { editOrderData : order };
    };

    return {
      editOrder,
      currentTabComponent,
      showOrderList,
      showAddOrder,
      showBtnOrderList,
      showBtnAddOrder,
      addOrderSuccess,
      editOrderById,
    };
  },
};
</script>

