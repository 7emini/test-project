<template>
  <el-table ref="table" border :data="table_data" style="width: 100%" v-loading="page_data.loading" :element-loading-text="page_data.loading_text">
    <template v-for="header in page_data.render_header" :key="header.prop">

      <template v-if="config.selection === true && header.type === 'selection'">
        <el-table-column type="selection" :width="header.width"></el-table-column>
      </template>

      <el-table-column v-else-if="header.type === 'function'" :label="header.label" :width="header.width">
        <template #default="scope">
          <div v-html="header.callback && header.callback(scope.row)"></div>
        </template>
      </el-table-column>

      <el-table-column v-else-if="header.type === 'switch'" :label="header.label" :width="header.width">
        <template #default="scope">
            <div>Switch</div>
        </template>
      </el-table-column>

      <el-table-column v-else-if="header.type === 'text'" :label="header.label" :width="header.width" :prop="header.prop"></el-table-column>

    </template>
  </el-table>
</template>
<script setup>
import { onBeforeMount, reactive } from "vue";
import { configHook } from "./configHook";

// 父元素传递的数据
const props = defineProps({
  colunms: {
    type: Array,
    default: () => [],
  },
  config: {
    type: Object,
    default: () => {},
  },
  request: {
    type: Object,
    default: () => {},
  },
});

// 页面所需的一些数据
const page_data = reactive({
  render_header: props.colunms, // 需要渲染的表格列表
  loading: false, // 表格是否为加载状态
  loading_text: "加载中，请稍后", //表格加载时的时文字显示
});

// 表格数据
const table_data = [];


// 配置相关
const { config, configInit } = configHook();

onBeforeMount(() => {
  // 初始化配置
  configInit(props.config);
});
</script>

<style lang="scss" scoped></style>
