<template>
  <div v-if="productListData !== null"  class="mdc-data-table">
    <div class="mdc-data-table__table-container">
      <table
        class="mdc-data-table__table"
        aria-label="Dessert calories"
        style="width: 100%"
      >
        <thead>
          <tr class="mdc-data-table__header-row" style="width: 50px">
            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
              style="
                text-align: left;
                vertical-align: middle;
                font-weight: bold;
                width: 100px;
              "
            >
              Hình ảnh
            </th>
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
              Tên
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
              Danh mục
            </th>

            <th
              class="mdc-data-table__header-cell"
              role="columnheader"
              scope="col"
              style="
                text-align: left;
                vertical-align: middle;
                font-weight: bold;
                width: 150px;
              "
            >
              Giá
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
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody class="mdc-data-table__content">
          <tr
            v-for="(product, index) in productListData"
            class="mdc-data-table__row"
            v-bind:key="product.productId"
          >
            <th
              class="mdc-data-table__cell"
              scope="row"
              style="position: relative"
            >
              <img
                :src="product.productImage"
                width="35"
                height="35"
                style="
                  position: absolute;
                  top: 50%;
                  -ms-transform: translateY(-50%);
                  transform: translateY(-50%);
                  border-radius: 8%;
                "
              />
            </th>
            <td
              class="mdc-data-table__cell mdc-data-table__cell--numeric"
              style="text-align: left; vertical-align: middle"
            >
              {{ product.productName }}
            </td>

            <td
              class="mdc-data-table__cell"
              style="text-align: left; vertical-align: middle"
            >
              {{ product.cateName }}
            </td>
            
            <td
              class="mdc-data-table__cell"
              style="text-align: left; vertical-align: middle"
            >
              {{ formatPrice(product.price)  }}
            </td>
            <td
              class="mdc-data-table__cell"
              style="text-align: left; vertical-align: middle"
            >
              {{ formatDate(product.updatedAt) }}
            </td>

            <td
              class="mdc-data-table__cell"
              style="text-align: left; vertical-align: middle"
            >
              <button
               @click="editProduct(product)"
                type="submit"
                class="mdc-button mdc-button--raised"
                style="border-radius: 20px; margin-right: 10px"
              >
                <i
                  class="material-icons mdc-button__icon"
                  aria-hidden="true"
                  style="margin-left: 8px"
                  >edit</i
                >
              </button>

              <button
                 @click="submitdeleteProduct(product.productId, index)"
                type="submit"
                class="mdc-button mdc-button--raised"
                style="border-radius: 20px"
              >
                <i
                  class="material-icons mdc-button__icon"
                  aria-hidden="true"
                  style="margin-left: 8px"
                  >delete</i
                >
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useProduct } from "../../stores/productStore";
import { parseDate } from "../../helper/timeFormat";

export default {
  name: "ProductList",
  async setup(props, { emit }) {

    const { productListData, productListStatus, getProductList ,deleteProduct } = useProduct();
    
    getProductList();

    const editProduct = (product) => {
      emit("editProductById", product);
    }; 

    const formatDate = (d) => {
      return parseDate(d);
    };

   const formatPrice = (value) => {
      let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    const submitdeleteProduct = (productId, index) => {
      productListData.value.splice(index , 1);
      deleteProduct(productId);
    }

    return {
      editProduct,
      deleteProduct,
      productListData,
      productListStatus,
      formatDate,
      formatPrice,
      submitdeleteProduct,
      getProductList
    };
  },
};
</script>
