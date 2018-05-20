<template>
  <div id="app" :class="$style.app">
    <vue-notification-stack />

    <router-view :class="$style.content" />
  </div>
</template>

<script lang="ts">
  import { mapActions }       from 'vuex';
  import VueNotificationStack from '../../shared/components/VueNotificationStack/VueNotificationStack.vue';
  import { loadLocaleAsync }  from '../../shared/plugins/i18n/i18n';
  import { EventBus }         from '../../shared/services/EventBus';

  export default {
    components: {
      VueNotificationStack,
    },
    methods:    {
      ...mapActions('app', ['changeLocale']),
      localeSwitch(locale: string): void {
        loadLocaleAsync(locale)
        .catch((error: Error) => console.log(error));

        this.changeLocale(locale);
        this.navBarClose();
      },
      navBarClose() {
        EventBus.$emit('navbar.close');
      },
    },
  };
</script>

<style lang="scss" module>
  @import "../../shared/styles";
  @import "../../shared/styles/reset";
  @import "../../shared/styles/typo";
  @import "../../shared/styles/global";
  @import url($google-font);

  .app {
    min-height:     100vh;
    display:        flex;
    flex-direction: column;
  }

  .content {
    flex:           1;
    padding-bottom: $space-unit * 6;
  }

  .nav {
    margin:         $space-unit 0 0 0;
    padding:        0;
    list-style:     none;
    display:        flex;
    flex-direction: row;
    flex-wrap:      wrap;
    width:          100%;

    li {
      flex:       1;
      margin:     $space-unit / 2;
      color:      $text-color;
      flex-basis: $space-unit * 10;
      height:     $space-unit * 10;
      background: $divider-color;
      cursor:     pointer;

      a {
        padding:         $space-unit;
        display:         block;
        color:           $text-color;
        text-align:      center;
        font-size:       32px;
        text-decoration: none;

        small {
          font-size: 12px;
          display:   block;
        }
      }
    }

    @include media(tabletLandscape) {
      li {
        opacity:    .8;
        transition: opacity 250ms linear;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
</style>
