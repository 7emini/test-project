<template>
  <!--options 是数据源 props 是配置项-->
  <el-cascader v-model="data.value" :options="data.options" :props="data.props"></el-cascader>
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
});

const data = reactive({
  props: props.cascaderProps,
  options: [],
  value: 0,
});

const getData = ()=>{
    const url = apiUrl?.cascader?.[props.url]?.url;
    const method = apiUrl?.cascader?.[props.url]?.method || "post";
    if (!url) {
        throw new Error("URL 地址不存在");
    }
    const request_data = {
        url,
        method,
        data:props.data,
    }
    console.log(request_data);

    CommonApi(request_data).then(response=>{
        data.options = response.data;
    }).catch(error=>{

    });
}

onBeforeMount(()=>{
    getData();
})
</script>

<style></style>
