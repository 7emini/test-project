<template>
    <!--表格-->

    <el-row>
        <el-table ref="table" border :data="response_table_data.data" style="width: 100%"
            v-loading="response_table_data.loading" element-loading-text="加载中，请稍后...">

        </el-table>
    </el-row>
    <el-row>

    </el-row>
</template>


<script setup>
import { reactive, onBeforeMount } from 'vue';
import { requestHook } from "./requestHook";
import { configHook } from "./configHook";


const props = defineProps({
    table_config: {
        type: Object,
        default: () => { },
    },

    request_config: {
        type: Object,
        default: () => { },
    },

    table_columns: {
        type: Array,
        default: () => [],
    }
});


const { config, configInit } = configHook();

const { response_table_data, requestTableData } = requestHook();

function getTableData(config, type) {
    requestTableData(config, type).then(response => {
    }).catch(error => {
    });
}

onBeforeMount(() => {
    configInit(props.table_config);
    getTableData(props.request_config, "init");
});

</script>
