<template>
  您选择的位置是：{{ place.address }}
  <a-button @click="toggleVisible">选择位置</a-button>
  <map-dialog
    v-model:visible="visible"
    :point="place.point"
    :range="place.range"
    @confirm="handleConfirm"
  />
</template>

<script>
import { reactive, toRefs } from "vue";
import MapDialog from "./components/MapDialog.vue";
export default {
  name: "App",
  components: {
    MapDialog,
  },
  setup() {
    const data = reactive({
      place: {},
      visible: false,
      toggleVisible() {
        data.visible = !data.visible;
      },
      handleConfirm(place) {
        data.place = place;
      },
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>