<template>
  <div id="app" :class="$style.app">
    <vue-notification-stack />

    <router-view :class="$style.content" />
  </div>
</template>

<script lang="ts">
import '@shared/designSystem/global.scss';
import VueNotificationStack from '@components/VueNotificationStack/VueNotificationStack.vue';

export default {
  name: 'App',
  components: {
    VueNotificationStack,
  },
};
</script>

<style lang="scss" module>
@import '~@/app/shared/design-system';
@import '~@/app/shared/designSystem/reset';
@import '~@/app/shared/designSystem/typo';

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}
</style>
