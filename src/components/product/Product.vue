<template>
  <div
    class="top-container"
    style="width: 100%; margin-bottom: 15px; height: 40px"
  >
    <button
      type="submit"
      @click="showProductList()"
      v-if="showBtnProductList"
      class="mdc-button mdc-button__ripple"
      style="float: left"
    >
      <i class="material-icons mdc-button__icon" aria-hidden="true"
        >arrow_back</i
      >
      <span class="mdc-button__label">Danh sách sản phẩm</span>
    </button>

    <button
      type="submit"
      @click="showAddProduct()"
      v-if="showBtnAddProduct"
      class="mdc-button mdc-button--raised"
      style="float: right"
    >
      <i class="material-icons mdc-button__icon" aria-hidden="true">add</i>
      <span class="mdc-button__label">Thêm sản phẩm</span>
    </button>
  </div>
  <Suspense>
      <component
          :is="currentTabComponent"
          v-bind="editProduct"
          @addProductSuccess="addProductSuccess"
          @editProductById ="editProductById"
      ></component>
  </Suspense>
</template>

<script>
import { onMounted, ref } from "vue";
import AddProduct from "./AddProduct.vue";
import ProductList from "./ProductList.vue";

export default {
  name: "Product",
  components: {
    AddProduct,
    ProductList,
  },
  setup(props, { emit }) {
    let editProduct = ref();

    let currentTabComponent = ref("ProductList");
    let showBtnProductList = ref(false);
    let showBtnAddProduct = ref(true);


    const showAddProduct = () => {
      showBtnProductList.value = true;
      showBtnAddProduct.value = false;
      currentTabComponent.value = "AddProduct";
    };

    const showProductList = () => {
      // khi tới màn hình danh sách danh mục thì reset currentCate
      editProduct.value = { currentProduct: null };

      showBtnProductList.value = false;
      showBtnAddProduct.value = true;
      currentTabComponent.value = "ProductList";
    };

    // Xử lý event addProductSuccess
    const addProductSuccess = (added) => {
      showBtnProductList.value = false;
      showBtnAddProduct.value = true;
      currentTabComponent.value = "ProductList";
    };

    const editProductById = (product) => {
      showBtnProductList.value = true;
      showBtnAddProduct.value = false;
      currentTabComponent.value = "AddProduct";
      editProduct.value = { editProductData: product };
    };

    return {
      editProduct,
      currentTabComponent,
      showProductList,
      showAddProduct,
      showBtnProductList,
      showBtnAddProduct,
      addProductSuccess,
      editProductById
    };
  },
};
</script>
