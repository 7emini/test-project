import { reactive } from "vue";
import { CommonApi } from "@/apis/common";
import RequestUrl from "@/apis/requestUrl";

export function requestHook() {
    // 请求配置
    let request_config = {
        url: "",
        method: "",
        data: {},
    }

    // 响应数据
    const response_table_data = reactive({
        data: [],
        total: 0,
        loading: false,
    });

    /**
     * 请求表格数据 
     * @param {*} config 
     * @param {*} type 请求数据的类型：init page 
     * @returns 
     */
    const requestTableData = (config = {}, type) => {
        if (type === "init") {
            request_config = { ...request_config, ...config };
        }

        if (type === "page") {
            request_config.data = { ...request_config.data, ...config };
        }

        if (!request_config.url) {
            return false;
        }

        // 获取默认配置的url
        const url = RequestUrl[request_config.url]?.list?.url;
        // 获取默认配置的请求方式
        const method = RequestUrl[request_config.method]?.list?.method || "post";
        // 获取默认配置的请求参数
        const data = request_config.data;

        const reqeust_params = {
            url,
            method,
            data,
        }

        response_table_data.loading = true;
        return new Promise((resolve, reject) => {
            CommonApi(reqeust_params).then((response) => {
                response_table_data.data = response.data.data;
                response_table_data.total = response.data.total;
                response_table_data.loading = false;
                resolve(response_table_data);
            }).catch(error => {
                response_table_data.loading = false;
                reject(error);
            });
        });
    }

    return { response_table_data, requestTableData }
}