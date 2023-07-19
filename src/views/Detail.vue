<template>
  <DataForm :items="form_config.form_items" :buttons="form_config.form_buttons" :field="form_config.form_data" :hidden="form_config.form_hidden" @callback="handlerSubmitForm"></DataForm>
</template>

<script setup>
import { getDetailed } from "@/apis/info";
import DataForm from "@/components/data/form";
import { dataType } from "element-plus/es/components/table-v2/src/common";
import { onBeforeMount, reactive } from "vue";

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
    { label: "信息标题", prop: "title", type: "input", placeholder: "请输入标题", width: "300px", max_length: 50, min_length: 1, required: true, message: "请务必输入标题！", rules: [{ min: 3, max: 20, message: "长度在3到20个字符", trigger: "change" }] },
    { label: "缩略图", prop: "image_url", type: "upload" },
    { label: "发布日期", prop: "create_date", type: "date" },
    {
      label: "是否发布",
      prop: "status",
      type: "radio",
      options: [
        { value: "1", label: "是" },
        { value: "0", label: "否" },
      ],
      relation_hidden: [
        ["title", { "1": false, "0": true }],
        ["image_url", { "1": false, "0": true }],
      ],
    },
    {
      label: "是否发布",
      prop: "status",
      type: "select",
      options: [
        { value: "1", label: "是" },
        { value: "2", label: "否" },
      ],
    },

    {
      label: "城市",
      prop: "city",
      type: "checkbox",
      options: [
        { value: "1", label: "深圳" },
        { value: "2", label: "北京" },
        { value: "3", label: "广州" },
        { value: "4", label: "上海" },
      ],
    },
    { label: "内容描述", prop: "content", type: "wangeditor" },
  ],

  form_buttons: [
    {
      label: "提交",
      type: "danger",
      key: "submit",
    },
    {
      label: "重置",
      type: "primary",
      key: "reset",
    },
    {
      label: "关闭",
      type: "primary",
      key: "close",
      callback: () => {
        handlerClose();
      },
    },
  ],

  form_data: {
    category_id: "",
    title: "",
    image_url: "",
    create_date: "",
    start_date: "",
    end_date: "",
    status: "",
    content: "",
    city: ["2", "3"],
  },

  form_hidden: {
    category_id: false,
  },
});

function handlerClose() {
  alert("close");
}

function handlerGetDetail(id) {
  getDetailed({ id }).then((response) => {
    form_config.form_data = response.data;
  });
}

function handlerSubmitForm() {
  console.log("添加数据");
}

onBeforeMount(() => {
  handlerGetDetail("1173");
});
</script>

<style></style>
