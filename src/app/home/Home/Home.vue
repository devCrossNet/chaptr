<template>
  <div :class="$style.home">
    <input type="file" ref="fileupload" :style="{ display: 'none' }" />

    <vue-layout @position="changeMenuPosition" :position="menuPosition">
      <vue-grid>
        <vue-grid-row v-show="hasStories === true">
          <vue-grid-item fill>
            <vue-headline level="1">{{ $t('common.yourStories' /* Your Stories */) }}</vue-headline>
          </vue-grid-item>

          <vue-grid-item v-for="story in allStories" :key="story.id" :class="$style.item">
            <vue-card :class="$style.card">
              <template slot="header">{{ story.title }}</template>

              <vue-markdown>
                {{ story.abstract }}
              </vue-markdown>

              <vue-button slot="footer" color="secondary" as="router-link" :target="`/story/${story.id}`">
                <vue-icon-pencil />
              </vue-button>
            </vue-card>
          </vue-grid-item>
        </vue-grid-row>
      </vue-grid>

      <vue-mobile-menu slot="sidebar">
        <vue-button @click="addStory" :aria-label="$t('common.add.story' /* Add a new Story */)">
          <vue-icon-add />
        </vue-button>
        <vue-button @click="saveState" :aria-label="$t('common.save.State' /* Save current State */)">
          <vue-icon-save />
        </vue-button>
        <vue-button @click="loadState" :aria-label="$t('common.load.State' /* Load current State */)">
          <vue-icon-upload />
        </vue-button>
        <vue-button @click="shareState" :aria-label="$t('common.share.State' /* Share current State */)">
          <vue-icon-share />
        </vue-button>
        <vue-button @click="show = true" :aria-label="$t('common.share.EnterCode' /* Enter Code */)">
          <vue-icon-keyboard />
        </vue-button>
      </vue-mobile-menu>
    </vue-layout>

    <vue-modal :show="show">
      <vue-headline level="3">{{ $t('common.share.EnterCode' /* Enter Code */) }}</vue-headline>
      <vue-input name="code" id="code" placeholder="code" v-model="code" autofocus />
      <vue-button
        color="primary"
        :aria-label="$t('common.restore' /* Restore Stories */)"
        @click="loadStateFromServer()"
        :disabled="code.length > 6"
      >
        {{ $t('common.restore' /* Restore Stories */) }}
      </vue-button>
      <vue-button ghost :aria-label="$t('common.cancel' /* Cancel */)" @click="show = false">
        {{ $t('common.cancel' /* Cancel */) }}
      </vue-button>
    </vue-modal>
  </div>
</template>

<script lang="ts">
import { saveAs } from 'file-saver';
import { mapActions, mapGetters } from 'vuex';
import VueGrid from '../../shared/components/VueGrid/VueGrid.vue';
import VueGridRow from '../../shared/components/VueGridRow/VueGridRow.vue';
import VueGridItem from '../../shared/components/VueGridItem/VueGridItem.vue';
import VueButton from '../../shared/components/VueButton/VueButton.vue';
import VueMobileMenu from '../../shared/components/VueMobileMenu/VueMobileMenu.vue';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { IState } from '../../state';
import { HttpService } from '@shared/services/HttpService/HttpService';
import { addNotification } from '@components/VueNotificationStack/utils';
import VueModal from '../../shared/components/VueModal/VueModal.vue';
import VueInput from '../../shared/components/VueInput/VueInput.vue';
import VueHeadline from '@components/VueHeadline/VueHeadline.vue';
import VueCard from '@components/VueCard/VueCard.vue';
import VueIconBook from '@components/icons/VueIconBook/VueIconBook.vue';
import VueLayout from '@components/VueLayout/VueLayout.vue';
import VueIconAdd from '@components/icons/VueIconAdd/VueIconAdd.vue';
import VueIconSave from '@components/icons/VueIconSave/VueIconSave.vue';
import VueIconUpload from '@components/icons/VueIconUpload/VueIconUpload.vue';
import VueIconShare from '@components/icons/VueIconShare/VueIconShare.vue';
import VueIconKeyboard from '@components/icons/VueIconKeyboard/VueIconKeyboard.vue';
import VueIconPencil from '@components/icons/VueIconPencil/VueIconPencil.vue';
import VueMarkdown from '@components/VueMarkdown/VueMarkdown.vue';

export default {
  metaInfo: {
    title: 'Chaptr',
  },
  components: {
    VueMarkdown,
    VueIconPencil,
    VueIconKeyboard,
    VueIconShare,
    VueIconUpload,
    VueIconSave,
    VueIconAdd,
    VueLayout,
    VueIconBook,
    VueCard,
    VueHeadline,
    VueInput,
    VueModal,
    VueMobileMenu,
    VueButton,
    VueGridItem,
    VueGridRow,
    VueGrid,
  },
  computed: {
    ...mapGetters('story', ['allStories']),
    ...mapGetters('app', ['menuPosition']),
    hasStories() {
      return this.allStories.length > 0;
    },
  },
  methods: {
    ...mapActions('app', ['changeMenuPosition', 'changeLocale']),
    addStory() {
      this.$router.push('/story/edit');
    },
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
    shareState() {
      HttpService.post('/upload', this.$store.state).then((res: any) => {
        addNotification({
          title: 'Here is your code!',
          text: 'Enter the following code on the target device: ' + res.data.code,
        });
      });
    },
    loadStateFromServer() {
      HttpService.get(`/share/${this.code}`)
        .then((res: any) => {
          this.replaceState(res.data.content);
          addNotification({
            title: 'Stories restored!',
            text: 'Your stories are now transferred',
          });
          this.show = false;
        })
        .catch(() => {
          addNotification({
            title: 'Code is not valid!',
            text: 'Stories can not be restored, please try again.',
          });
        });
    },
  },
  data() {
    return {
      show: false,
      code: '',
    };
  },
};
</script>

<style lang="scss" module>
@import '../../shared/design-system';
.home {
  .item {
    flex: 1 1 50%;
    display: flex;
  }

  .card {
    flex: 1 1 50%;
  }
}
</style>
