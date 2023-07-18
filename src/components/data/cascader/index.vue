<template>
  <!--options 是数据源 props 是配置项-->
  <el-cascader v-model="data.value" :options="data.options" :props="data.props" @change="handlerChange"></el-cascader>
</template>

<script setup>
import { onBeforeMount, reactive } from "vue";
import { CommonApi } from "@/apis/common";
import apiUrl from "@/apis/requestUrl";

const props = defineProps({
  cascaderProps: {
    type: Object,
    default: () => {},
  },
  url: {
    type: String,
    default: "",
  },
  method: {
    type: String,
    default: "post",
  },
  data: {
    type: Object,
    default: () => {},
  },
  value: {
    type: [String, Number],
    default: 0,
  },
});

const emit = defineEmits(["update:value"]);

const data = reactive({
  props: props.cascaderProps,
  options: [],
  value: 0,
});

const getData = () => {
  const url = apiUrl?.cascader?.[props.url]?.url;
  const method = apiUrl?.cascader?.[props.url]?.method || "post";
  if (!url) {
    throw new Error("URL 地址不存在");
  }
  const request_data = {
    url,
    method,
    data: props.data,
  };
  console.log(request_data);

  CommonApi(request_data)
    .then((response) => {
      data.options = response.data;
    })
    .catch((error) => {});
};

const handlerChange = (value) => {
  const val = value.length !== 0 ? value[value.length - 1] : "";
  emit("update:value", val);
};

onBeforeMount(() => {
  getData();
});
</script>

<style></style>
