<template>
  <el-switch :model-value = "modelValue" :loading="init_data.loading" :before-change="handlerSwitch"> </el-switch>
</template>

<script setup>
import { reactive, getCurrentInstance, watchEffect, watch, ref, emit } from "vue";

import { SwitchStatus } from "@/apis/common";
import ApiUrl from "@/apis/requestUrl";

const props = defineProps({

  modelValue: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => { },
  },
  config: {
    type: Object,
    default: () => { },
  },
});

// console.log(props);
const { proxy } = getCurrentInstance();
const config = reactive(props.config);
const data = reactive(props.data);

const init_data = reactive({
  value: data[config.prop],
  loading: false,
});


const internalValue = ref(props.modelValue);

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
});

function updateModelValue(value) {
  internalValue.value = value;
}


function handlerSwitch(value) {
  if (!data.id) {
    return false;
  }
  init_data.loading = true;

  const url = config.api_url || ApiUrl?.[config.api_module]?.[config.api_key]?.url;
  const method = config.method || ApiUrl?.[config.api_module]?.[config.api_key]?.method || "post";

  if (!url) {
    throw new Error("Url 地址不存在");
  }

  const key_id = config.key_id || 'id';

  const request_data = {
    url,
    method,
    data: {
      [key_id]: data[key_id],
      [config.prop]: !init_data.value,
    }
  }



  return new Promise((resolve, reject) => {
    SwitchStatus(request_data)
      .then((response) => {
        proxy.$message.success(response.message);
        data.status = value;
        init_data.loading = false;
        resolve(response);
      })
      .catch((error) => {
        init_data.loading = false;
        reject(error);
      });
  });
}
</script>
