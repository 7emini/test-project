<template>
  <el-form label="信息类别：" prop="categoryId" :label-width="label_width">
    <template v-for="item in form_items" :key="item.prop">
      <el-form-item v-if="item.type === 'cascader'" :label="item.label" :prop="item.prop">
        <Cascader :url="item.url" :cascader-props="item.props" v-model:value="field[item.prop]"></Cascader>
      </el-form-item>
      <el-form-item v-if="item.type === 'input'" :label="item.label" :prop="item.prop">
        <el-input :maxlength="item.max_length" :minlength="item.min_length || 0" :style="`width:${item.width}`" :placeholder="item.placeholder" v-model="field[item.prop]"></el-input>
      </el-form-item>
      <el-form-item v-if="item.type === 'upload'" :label="item.label" :prop="item.prop">
        <Upload v-model:imageUrl="field[item.prop]"></Upload>
      </el-form-item>
      <el-form-item v-if="item.type === 'date'" :label="item.label" :prop="item.prop">
        <el-date-picker
          :type="item.date_type || 'datetime'"
          :format="item.date_format || 'YYYY-MM-DD HH:mm:ss'"
          :value-format="item.date_value || 'YYYY-MM-DD HH:mm:ss'"
          :placeholder="item.placeholder || '请选择日期'"
          :start-placeholder="item.start_placeholder || '请选择开始日期'"
          :end-placeholder="item.end_placeholder || '请选择结束日期'"
          :range-separator="item.range_placeholder || '至'"
          v-model="field[item.prop]"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item v-if="item.type === 'radio'" :label="item.label" :prop="item.prop">
        <el-radio-group v-model="field[item.prop]">
          <el-radio v-for="radio in item.options" :key="radio.value" :label="radio.label">{{ radio.label }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="item.type === 'select'" :label="item.label" :prop="item.prop">
        <el-select v-model="field[item.prop]">
          <el-option v-for="select in item.options" :key="select.value" :label="select.label" :value="select.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="item.type === 'checkbox'" :label="item.label" :prop="item.prop">
        <el-checkbox-group v-model="field[item.prop]">
          <el-checkbox v-for="checkbox in item.options" :label="checkbox.value" :key="checkbox.value">{{ checkbox.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item v-if="item.type === 'wangeditor'" :label="item.label" :prop="item.prop">
        <WangEditor v-model:content="field[item.prop]"></WangEditor>
      </el-form-item>
    </template>

    <el-form-item v-if="buttons && buttons.length > 0">
      <el-button v-for="item in buttons" :key="item.key" :type="item.type" @click="item.callback ? item.callback() : handlerFormActive(item)"> {{ item.label }} </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import WangEditor from "@/components/data/wangeditor";
import Cascader from "@/components/data/cascader";
import Upload from "@/components/data/upload";

const props = defineProps({
  items: {
    type: Array,
    default: () => {},
  },

  buttons: {
    type: Array,
    default: () => [],
  },

  labelWidth: {
    type: [String, Number],
    default: "100px",
  },

  field: {
    type: Object,
    default: () => ({}),
  },
});

const label_width = ref(props.labelWidth);

const abc = ref("1");

const form_items = reactive(props.items);

const buttons = reactive(props.buttons);


function handlerFormActive(item) {
    if (item.key === "submit") {

        console.log(props.field);
    } 

    if (item.key === "reset") {
   
    }
}


</script>

<style></style>
