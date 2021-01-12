<template>
  <div class="add-product" style="padding-bottom: 50px">
    <EditText
      hintText="Tên sản phẩm"
      v-model:textValue="productName"
      inputType="text"
      className="product-name"
      :errorMsg="errProductName"
      :uuid="uid()"
    />

    <EditText
      hintText="Hình ảnh"
      v-model:textValue="productImage"
      inputType="text"
      className="product-image"
      :errorMsg="errProductImage"
      :uuid="uid()"
    />

    <SelectBox
      className="categories"
      label="Chọn danh mục"
      @DropdownListSelected="dropdownItemSelected"
      :data="categories"
      :uuid="uid()"
    />

    <EditText
      hintText="Giá"
      v-model:textValue="productPrice"
      inputType="number"
      className="product-price"
      :errorMsg="errProductPrice"
      :uuid="uid()"
    />

      <EditText
      hintText="Số lượng"
      v-model:textValue="productQuantity"
      inputType="number" 
      className="product-quantity"
      :errorMsg="errProductQuantity"
      :uuid="uid()"
    />

    <div style="width: 100%">
      <CKEditor v-model:productDes="productDes" />
    </div>

    <button
      type="submit"
      @click="submitAddProduct()"
      class="mdc-button mdc-button--raised"
      style="float: right; margin-top: 40px"
    >
      <i class="material-icons mdc-button__icon" aria-hidden="true">add</i>
      <span class="mdc-button__label">{{ btnProductLabel }}</span>
    </button>

    <div class="empty" style="height: 40px; width: 100%"></div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import EditText from "../shared/EditText.vue";
import SelectBox from "../shared/SelectBox.vue";
import CKEditor from "../shared/CKEditor.vue";

import { useProduct } from "../../stores/productStore.js";

export default {
  name: "AddProduct",
  props: ["editProductData"],
  components: {
    EditText,
    SelectBox,
    CKEditor,
  },

  async setup(props, { emit }) {
    let btnProductLabel = ref("Thêm sản phẩm");
    let btnIconProduct = ref("add");

    const productName = ref(props.editProductData ? props.editProductData.productName : "");
    const errProductName = ref();

    const productImage = ref(props.editProductData ? props.editProductData.productImage : "");
    const errProductImage = ref();

    const productPrice = ref(props.editProductData ? props.editProductData.price : "");
    const errProductPrice = ref();

    const productQuantity = ref(props.editProductData ? props.editProductData.quantity : "");
    const errProductQuantity = ref();

    const productDes = ref(props.editProductData ? props.editProductData.description: "");

    let cateSelected = null;

    // Lấy về danh sách danh mục
    const { getCateList, addProduct, updateProduct, addProductSuccess } = useProduct();
    const categories = await getCateList();

    // Lấy mặc định giá trị đầu tiền của danh sách danh mục
    if (categories.length > 0) {
      cateSelected = categories[0].id;
    }


    // event khi thay đổi giá trị select box, khi thay đổi thì update giá trị mới cho cateSelected
    const dropdownItemSelected = async (payload) => {
        cateSelected = payload.id;
    };

    // set trạng thái khi bấm edit sản phẩm
    if (props.editProductData) {
      btnProductLabel.value = "Cập nhật sản phẩm";
      btnIconProduct.value = "edit";
      let cateSelected = props.editProductData.cateId;
    }

    // hàm tạo ra id duy nhất cho các thuộc tính của product, phục vụ cho xử lý UI
    // thao tác gì trên html element của phần thuộc tính này thì dựa vào thông số id này
    const uid = function () {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };


    const submitAddProduct = () => {
      if (!cateSelected) {
        console.log("Yêu cầu danh mục");
        return;
      }
  
  if (props.editProductData) {
          updateProduct({
            productId: props.editProductData.productId,
            productName: productName.value,
            productImage: productImage.value,
            cateId: cateSelected,
            price : parseInt(productPrice.value),
            quantity : parseInt(productQuantity.value),
            description: productDes.value,
          });
          return;
        }

      const collectProductFormData = {
        productName: productName.value,
        productImage: productImage.value,
        cateId: cateSelected,
        price : parseInt(productPrice.value),
        quantity : parseInt(productQuantity.value),
        description: productDes.value,
        collectionId: "1", // giá trị này là hardcode do hệ thống chỉ bán đồng hồ, nếu mở rộng bán sản phẩm khác thì giá trị này sẽ thay đổi
      };

      console.log(JSON.stringify(collectProductFormData));
      addProduct(collectProductFormData);
    };

  
    watch(addProductSuccess, (addProductSuccess, prevAddProductSuccess) => {
      if (addProductSuccess) {
        console.log(addProductSuccess);
        emit("addProductSuccess", true);
      }
    });

    return {
      productName,
      errProductName,
      productImage,
      errProductImage,
      productPrice,
      errProductPrice,
      productQuantity,
      errProductQuantity,
      productDes,

      // data
      categories,

      // func
      btnProductLabel,
      btnIconProduct,
      dropdownItemSelected,
      submitAddProduct,
      uid,
    };
  },
};
</script>