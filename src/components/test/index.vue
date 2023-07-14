<template>
    <div>
        <input :value="modelValue" @input="updateModelValue($event.target.value)">
    </div>
</template>
  
<script>
import { ref, watch } from 'vue';

export default {
    props: {
        modelValue: {
            type: String,
            required: true
        }
    },
    setup(props, { emit }) {
        const internalValue = ref(props.modelValue);

        watch(internalValue, (newValue) => {
            emit('update:modelValue', newValue);
        });

        function updateModelValue(value) {
            internalValue.value = value;
        }

        return {
            updateModelValue
        };
    }
};
</script>
  