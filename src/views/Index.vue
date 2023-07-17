<template>
  <div>
    <BaseTable :table_columns="table_data.columns" :table_config="table_data.config" :request_config="table_data.request">
      <template v-slot:operation="soltData">
        <el-button type="danger" size="small" @click="handlerDetailed(soltData.data.id)">编辑</el-button>
      </template>
    </BaseTable>
  </div>
</template>

<script setup>
import BaseTable from "@/components/data/table";
import { getDate } from "@/utils/common";
import { reactive } from "vue";

const table_data = reactive({
  columns: [
    { label: "标题", prop: "title", type: "text", width: "500" },
    { label: "类别", prop: "category_name", type: "text", width: "200" },
    {
      label: "日期",
      prop: "createDate",
      type: "function",
      callback: (row) => {
        return getDate({ value: row.currentDate * 1000 });
      },
    },
    { label: "发布状态", prop: "status", type: "switch", width: "100", api_module: "info", api_key: "info_status", api_url: "/news/status/", key_id: "id" },
    {
      label: "操作",
      type: "slot",
      slot_name: "operation",
      delete_elem: true,
      width: "200",
    },
  ],
  config: {
    use_selection: true,
    use_batch_delete: true,
    use_pagination: true,
  },
  request: {
    url: "info",
    delete_key: "id",
    data: {
      pageNumber: 1,
      pageSize: 10,
    },
  },
});

function handlerOnload(data) {
  // console.log(data);
}
</script>

<style></style>
