<template>
  <div class="response-status">
    <span style="">{{ orderListStatus }}</span>
  </div>
  <div v-if="orderListData !== null" class="mdc-data-table">
    <div class="mdc-data-table__table-container">
      <table
        class="mdc-data-table__table"
        aria-label="Dessert calories"
        style="width: 100%"
      >
        <thead>
          <tr class="mdc-data-table__header-row" style="width: 50px">
            <th
              class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric"
              role="columnheader"
              scope="col"
              style="
                text-align: left;
                vertical-align: middle;
                font-weight: bold;
              "
            >
              Tên Người dùng

            </th>
               <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
              style="
                text-align: left;
                vertical-align: middle;
                font-weight: bold;
                width: 250px;
              "
            >
              Ngày tạo
            </th>

            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
              style="
                text-align: left;
                vertical-align: middle;
                font-weight: bold;
                width: 250px;
              "
            >
              Cập nhật
            </th>

            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
              style="
                text-align: left;
                vertical-align: middle;
                font-weight: bold;
                width: 200px;
              "
            >
             Trạng thái
            </th>
            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
              style="
                text-align: left;
                vertical-align: middle;
                font-weight: bold;
                width: 200px;
              "
            >
            Tổng tiền
            </th>
             <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
              style="
                text-align: left;
                vertical-align: middle;
                font-weight: bold;
                width: 120px;
              "
            >
           Thao tác
            </th>
          </tr>
        </thead>
        <tbody class="mdc-data-table__content">
          <tr
            class="mdc-data-table__row"
            v-for="order in orderListData"
            :key="order.orderId"
          >
          
            <td
              class="mdc-data-table__cell mdc-data-table__cell--numeric"
              style="text-align: left; vertical-align: middle"
            >
              {{ order.userName }}
            </td>

             <td
              class="mdc-data-table__cell"
              style="text-align: left; vertical-align: middle"
            >
              {{ formatDate(order.createdAt) }}
            </td>

            <td
              class="mdc-data-table__cell"
              style="text-align: left; vertical-align: middle"
            >
              {{ formatDate(order.updatedAt) }}
            </td>

            <td
              class="mdc-data-table__cell"
              style="text-align: left; vertical-align: middle; color:green;"
            >
              {{ order.status }}
            </td>

            <td
              class="mdc-data-table__cell"
              style="text-align: left; vertical-align: middle"
            >
              {{ formatPrice(order.total) }}
            </td>
            
            <td
              class="mdc-data-table__cell"
              style="text-align: left; vertical-align: middle"
            >
              <button
                @click="editOrder(order)"
                class="mdc-button mdc-button--raised"
                style="border-radius: 20px; margin-right :10px;"
              >
                <i
                  class="material-icons mdc-button__icon"
                  aria-hidden="true"
                  style="margin-left: 8px"
                  >edit</i
                >
              </button>
<!-- 
              <button
                class="mdc-button mdc-button--raised"
                style="border-radius: 20px"
              >
                <i
                  class="material-icons mdc-button__icon"
                  aria-hidden="true"
                  style="margin-left: 8px"
                  >delete</i
                >
              </button> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useOrder } from "../../stores/orderStore";
import { parseDate } from "../../helper/timeFormat";


export default {
  name: "OrderList",

  setup(props, { emit }) {
    const { orderListData, orderListStatus, getOrderList } = useOrder();

    getOrderList();

    const editOrder = (order) => {
      emit("editOrderById", order);
    };

    const formatDate = (d) => {
      return parseDate(d);
    };

    const formatPrice = (value) => {
    let val = (value/1).toFixed(2).replace('.', ',')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    
    return {
      editOrder,
      orderListData,
      orderListStatus,
      formatDate,  
      formatPrice,
      getOrderList
    };
  },
};
</script>

<style lang="css" scoped>
.response-status {
  width: 100% !important;
  margin-top: 20px;
  text-align: center;
}
.response-status span {
  color: #666;
  font-size: 23px;
}
</style>
