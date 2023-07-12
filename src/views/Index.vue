<template>
  <Data-Table :config="table_config.config" :colunms="table_config.columns" :request="table_config.request"></Data-Table>
</template>

<script setup>

import {reactive} from "vue";

import DataTable from "@/components/data-table";

import { getDate } from "@/utils/common";


const table_config = reactive({
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
      width: "200",
    },
  ],
  config: {
    selection: true,
    batch_delete: true,
    pagination: true,
  },
  request: {
    url: "info",
    data: {
      pageNumber: 1,
      pageSize: 10,
    },
  },
});

</script>
