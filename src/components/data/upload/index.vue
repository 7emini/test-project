<template>
  <el-upload class="avatar-uploader" action="#" :show-file-list="false" :http-request="handlerUpload" :on-success="handlerOnSuccess" :before-upload="handlerBeforeOnUpload">
    <img v-if="data.image_url" :src="data.image_url" class="avatar" />
    <span v-else>+</span>
  </el-upload>
</template>
<script setup>
import { reactive } from "vue";
import { uploadFile } from "@/apis/common";

const props = defineProps({
    imageUrl: {
        type:String,
        default:"",
    }
});

const emits = defineEmits(["update:imageUrl"]);

const data = reactive({
  image_url: "",
});

function handlerUpload(params) {
  const file = params.file;
  console.log(file);
  const form = new FormData();
  form.append("files", file);
  uploadFile(form).then((response) => {
    data.image_url = response.data.files_path;
    emits("update:imageUrl", response.data.files_path);
  });
}

function handlerOnSuccess(val) {
  console.log(val);
  console.log("上传成功");
}

function handlerBeforeOnUpload(val) {
    console.log(val);
}
</script>


<style lang="scss" scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  color: #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}
</style>
