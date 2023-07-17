<template>
    <el-form label="信息类别：" prop="categoryId">
        <template v-for="item in form_items" :key="item.prop">
            <el-form-item  v-if="item.type==='cascader'" :label="item.label" :prop="item.prop">
                <Cascader :url="item.url" :cascader-props="item.props"></Cascader>
            </el-form-item>
            <el-form-item  v-if="item.type==='input'" :label="item.label" :prop="item.prop">form item type input</el-form-item>
            <el-form-item  v-if="item.type==='upload'" :label="item.label" :prop="item.prop">form item type upload</el-form-item>
            <el-form-item  v-if="item.type==='date'" :label="item.label" :prop="item.prop">form item type date</el-form-item>
            <el-form-item  v-if="item.type==='radio'" :label="item.label" :prop="item.prop">form item type radio</el-form-item>
            <el-form-item  v-if="item.type==='wangeditor'" :label="item.label" :prop="item.prop">form item type wangeditor</el-form-item>

        </template>
    </el-form>
</template>

<script setup>
import { reactive } from 'vue';
import Cascader from "@/components/data/cascader";


const props = defineProps({
    items:{
        type: Array,
        default:()=>{}
    },
})

const form_items = reactive(props.items);

</script>

<style></style>