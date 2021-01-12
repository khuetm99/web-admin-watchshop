import {
    toRefs,
    reactive
} from "vue";
import {
    timewiseApi
} from "../network/timewise_api";

export const useOrder = () => {
    const state = reactive({
        orderListData: null,
        orderListStatus: null,
        addOrderSuccess: null
    });

    const getOrderList = async () => {
        const response = await timewiseApi.get('/order/list');
        if (response.data.data) {
            state.orderListData = response.data.data;
        } else {
            state.orderListStatus = "Bạn chưa có đơn hàng nào"
        }
    };

    const updateOrder = async (order) => {
        const response = await timewiseApi.put('/order/edit', order);
        state.addOrderSuccess = response.status == 200;
    };

    return {
        ...toRefs(state),
        getOrderList,
        updateOrder
    };

}