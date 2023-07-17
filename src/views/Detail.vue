<template>
  <DataForm :items="form_config.form_items"></DataForm>
</template>

<script setup>
import DataForm from "@/components/data/form";
import { reactive } from "vue";

const form_config = reactive({
  form_items: [
    {
      label: "信息分类",
      prop: "category_id",
      type: "cascader",
      props: {
        label: "category_name",
        value: "id",
      },
      url: "category",
    },
    { label: "信息标题", prop: "title", type: "input" },
    { label: "缩略图", prop: "image_url", type: "upload" },
    { label: "发布日期", prop: "create_date", type: "date" },
    { label: "是否发布", prop: "status", type: "radio" },
    { label: "内容描述", prop: "content", type: "wangeditor" },
  ],
});
</script>

<style></style>
