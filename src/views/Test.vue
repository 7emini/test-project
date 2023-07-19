<template>
  <el-form :model="data">
    <el-form-item prop="title" :rules="rules.title" label="title">
      <el-input v-model="data.title"  ></el-input>
    </el-form-item>

    <el-form-item prop="name" :rules="rules.name" label="name">
      <el-input v-model="data.name" ></el-input>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from "vue";

const data = reactive({
  title: "",
  name: "",
});

const rules = reactive({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  name: [{ required: true, message: "请输入名称", trigger: "blur" }],
});
</script>
