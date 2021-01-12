import {
    toRefs,
    reactive
} from "vue";
import {
    timewiseApi
} from "../network/timewise_api";

export const useProduct = () => {
    const state = reactive({
        productListData :null,
        productListStatus: null,
        addProductSuccess: null
    });

    const getCateList = async () => {
        const response = await timewiseApi.get('/cate/list');
        if (!response.data.data) {
            return [];
        }
        return response.data.data.map((item) => {
            return {
                id: item.cateId,
                value: item.cateName
            }
        });
    };

    const addProduct = async (product) => {
        const response = await timewiseApi.post('/product/add', product);
        state.addProductSuccess = response.status == 200;
    };

    const updateProduct = async (product) => {
        const response = await timewiseApi.put('/product/edit', product);
        state.addProductSuccess = response.status == 200;
    };

    const deleteProduct = async (productId) => {
        const response = await timewiseApi.delete('/product/delete/' + productId);
        state.addProductSuccess = response.status == 200;
    };

    const getProductList = async () => {
        const response = await timewiseApi.get('/product/list');
        if (response.data.data) {
            state.productListData= response.data.data;
        }else {
            state.productListStatus = "Bạn chưa có sản phẩm nào"
        }
    };

    return {
        ...toRefs(state),
        getCateList,
        addProduct,
        getProductList,
        updateProduct,
        deleteProduct,
    };

}