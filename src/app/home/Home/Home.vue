<template>
  <div :class="$style.home">
    <input type="file" ref="fileupload" :style="{ display: 'none' }" />

    <vue-layout @position="changeMenuPosition" :position="menuPosition">
      <story-list :stories="allStories" />

      <vue-mobile-menu slot="sidebar">
        <vue-button
          @click="$router.push('/story/edit')"
          :aria-label="$t('common.add.story' /* Add a new Story */)"
          :title="$t('common.add.story' /* Add a new Story */)"
        >
          <vue-icon-add />
        </vue-button>
        <vue-button
          primary
          @click="$router.push('/character')"
          :aria-label="$t('common.characters' /* Characters */)"
          :title="$t('common.characters' /* Characters */)"
        >
          <vue-icon-user />
        </vue-button>
        <vue-button
          primary
          @click="$router.push('/place')"
          :aria-label="$t('common.places' /* Places */)"
          :title="$t('common.places' /* Places */)"
        >
          <vue-icon-globe />
        </vue-button>
        <vue-button
          primary
          @click="$router.push('/item')"
          :aria-label="$t('common.items' /* Items */)"
          :title="$t('common.items' /* Items */)"
        >
          <vue-icon-suit-case />
        </vue-button>
        <vue-button
          @click="saveState"
          :aria-label="$t('common.save.State' /* Save current State */)"
          :title="$t('common.save.State' /* Save current State */)"
        >
          <vue-icon-save />
        </vue-button>
        <vue-button
          @click="loadState"
          :aria-label="$t('common.load.State' /* Load current State */)"
          :title="$t('common.load.State' /* Load current State */)"
        >
          <vue-icon-upload />
        </vue-button>
        <vue-button
          @click="shareState"
          :aria-label="$t('common.share.State' /* Share current State */)"
          :title="$t('common.share.State' /* Share current State */)"
        >
          <vue-icon-share />
        </vue-button>
        <vue-button
          @click="show = true"
          :aria-label="$t('common.share.EnterCode' /* Enter Code */)"
          :title="$t('common.share.EnterCode' /* Enter Code */)"
        >
          <vue-icon-keyboard />
        </vue-button>
      </vue-mobile-menu>
    </vue-layout>

    <enter-code-modal :show="show" @submit="loadStateFromServer" />
  </div>
</template>

<script lang="ts">
import { saveAs } from 'file-saver';
import { mapActions, mapGetters } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { IState } from '../../state';
import { HttpService } from '@shared/services/HttpService/HttpService';
import { addNotification } from '@components/VueNotificationStack/utils';
import VueLayout from '@components/VueLayout/VueLayout.vue';
import StoryList from '@/app/home/StoryList/StoryList.vue';
import VueMobileMenu from '@components/VueMobileMenu/VueMobileMenu.vue';
import VueButton from '@components/VueButton/VueButton.vue';
import VueIconAdd from '@components/icons/VueIconAdd/VueIconAdd.vue';
import VueIconSave from '@components/icons/VueIconSave/VueIconSave.vue';
import VueIconUpload from '@components/icons/VueIconUpload/VueIconUpload.vue';
import VueIconShare from '@components/icons/VueIconShare/VueIconShare.vue';
import VueIconKeyboard from '@components/icons/VueIconKeyboard/VueIconKeyboard.vue';
import EnterCodeModal from '@/app/home/EnterCodeModal/EnterCodeModal.vue';
import VueIconUser from '@components/icons/VueIconUser/VueIconUser.vue';
import VueIconGlobe from '@components/icons/VueIconGlobe/VueIconGlobe.vue';
import VueIconSuitCase from '@components/icons/VueIconSuitCase/VueIconSuitCase.vue';

export default {
  metaInfo: {
    title: 'Chaptr',
  },
  components: {
    VueIconSuitCase,
    VueIconGlobe,
    VueIconUser,
    EnterCodeModal,
    VueIconKeyboard,
    VueIconShare,
    VueIconUpload,
    VueIconSave,
    VueIconAdd,
    VueButton,
    VueMobileMenu,
    StoryList,
    VueLayout,
  },
  computed: {
    ...mapGetters('story', ['allStories']),
    ...mapGetters('app', ['menuPosition']),
  },
  methods: {
    ...mapActions('app', ['changeMenuPosition', 'changeLocale']),
    replaceState(newState: IState) {
      const oldState: IState = cloneDeep(this.$store.state);
      this.$store.replaceState(merge(oldState, newState));
      this.changeLocale('foo');
      this.changeLocale(newState.app.locale);
    },
    saveState() {
      const state: IState = cloneDeep(this.$store.state);
      delete state.app;
      delete state.route;

      const newBlob = new Blob([JSON.stringify(state)], { type: 'application/json;' });
      const filename = `chaptr-${new Date().getTime()}.json`;
      saveAs(newBlob, filename);
    },
    loadState() {
      this.$refs.fileupload.click();

      this.$refs.fileupload.addEventListener('change', () => {
        const files = this.$refs.fileupload.files;
        const fileReader = new FileReader();

        fileReader.onload = (e: any) => {
          const loadedState = JSON.parse(e.target.result);

          this.replaceState(loadedState);
        };

        fileReader.readAsText(files.item(0));
      });
    },
    async shareState() {
      try {
        const res = await HttpService.post('/upload', this.$store.state);

        addNotification({
          title: 'Here is your code!',
          text: 'Enter the following code on the target device: ' + res.data.code,
        });
      } catch (e) {
        addNotification({
          title: 'Something went wrong!',
          text: 'Please try again!',
        });
      }
    },
    async loadStateFromServer(code: string) {
      console.log(code);
      try {
        const res = await HttpService.get(`/share/${code}`);
        this.replaceState(res.data.content);
        addNotification({
          title: 'Stories restored!',
          text: 'Your stories are now transferred',
        });
        this.show = false;
      } catch (e) {
        addNotification({
          title: 'Code is not valid!',
          text: 'Stories can not be restored, please try again.',
        });
      }
    },
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style lang="scss" module>
@import '../../shared/design-system';
.home {
}
</style>
