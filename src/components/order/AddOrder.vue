<template>
  <EditText
    hintText="Trạng thái đơn hàng"
    v-model:textValue="orderStatus"
    inputType="text"
    className="order-status"
    :errorMsg="errOrderStatus"
    :uuid="uid()"
  />

  <button
    type="submit"
    @click="doAddOrder()"
    class="mdc-button mdc-button--raised"
    style="float: left"
  >
    <i class="material-icons mdc-button__icon" aria-hidden="true">{{
      btnIconOrder
    }}</i>
    <span class="mdc-button__label">{{ btnOrderLable }}</span>
  </button>
</template>

<script>
import { ref, watch } from "vue";
import EditText from "../shared/EditText.vue";
import SelectBox from "../shared/SelectBox.vue";

import { useOrder } from "../../stores/orderStore.js";

export default {
  name: "AddOrder",
  components: { EditText, SelectBox },
  props: ["editOrderData"],
  setup(props, { emit }) {
    let btnOrderLable = ref("Thêm đơn hàng");
    let btnIconOrder = ref("add");

    const { updateOrder, addOrderSuccess } = useOrder();

    const orderStatus = ref(props.editOrderData ? props.editOrderData.status : "");
    const errOrderStatus = ref();


    // set trạng thái khi bấm edit đơn hàng
    if (props.editOrderData) {
      btnOrderLable.value = "Cập nhật đơn hàng";
      btnIconOrder.value = "edit";
    }

    const doAddOrder = () => {
      let hasError = false;
      if (orderStatus.value === "") {
        errOrderStatus.value = "Thông tin bắt buộc";
        hasError = true;
      }

      if (!hasError) {
        if (props.editOrderData) {
          updateOrder({
            orderId: props.editOrderData.orderId,
            status: orderStatus.value,
          });
          return;
        }
      }
    };

    watch(addOrderSuccess, (addOrderSuccess, prevAddOrderSuccess) => {
      if (addOrderSuccess) {
        console.log(addOrderSuccess);
        emit("addOrderSuccess", true);
      }
    });

    // hàm tạo ra id duy nhất cho các thuộc tính của product, phục vụ cho xử lý UI
    // thao tác gì trên html element của phần thuộc tính này thì dựa vào thông số id này
    const uid = function () {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    return {
      orderStatus,
      errOrderStatus,
      btnOrderLable,
      btnIconOrder,

      // func
      doAddOrder,
      uid,
    };
  },
};
</script>
