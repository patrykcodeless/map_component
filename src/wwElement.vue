<template>
  <div class="simple-text-component">
    <h2>{{ content?.text || 'Hello from WeWeb!' }}</h2>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    uid: { type: String, required: true },
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  setup(props) {
    /* wwEditor:start */
    const isEditing = computed(() => {
      return props.wwEditorState?.isEditing || false;
    });
    /* wwEditor:end */

    return {
      /* wwEditor:start */
      isEditing,
      /* wwEditor:end */
    };
  },
};
</script>

<style scoped>
.simple-text-component {
  padding: 20px;
  text-align: center;
}

.simple-text-component h2 {
  margin: 0;
  color: #333;
  font-size: 24px;
}
</style>
