<template>
  <div :class="[$style.home, hasStories ? $style.hasStories : '']">
    <vue-grid>
      <vue-grid-row :class="$style.header">
        <vue-grid-item>
          <h1>Chaptr</h1>
          <p>write books the easy way.</p>
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row v-show="hasStories === true">
        <vue-grid-item>
          <h3>{{ $t('common.yourStories' /* Your Stories */) }}</h3>

          <ul :class="$style.storyList">
            <li v-for="story in allStories"
                :key="story.id"
                :style="{backgroundColor: story.color}"
                role="button"
                @click="$router.push(`/story/${story.id}`)">
              <strong>{{ story.title }}</strong>
            </li>
          </ul>
        </vue-grid-item>
      </vue-grid-row>
    </vue-grid>

    <vue-mobile-menu>
      <vue-button
        accent
        @click="addStory"
        icon="plus"
        :aria-label="$t('common.add.story' /* Add a new Story */)" />

      <vue-button
        primary
        @click="saveState"
        icon="download"
        :aria-label="$t('common.save.State' /* Save current State */)" />

      <input type="file" ref="fileupload" :style="{display:'none'}" />
      <vue-button
        warn
        @click="loadState"
        icon="upload"
        :aria-label="$t('common.load.State' /* Load current State */)" />
      <vue-button
        @click="shareState"
        icon="share"
        :aria-label="$t('common.share.State' /* Share current State */)" />
      <vue-button
        @click="show = true"
        icon="keyboard"
        :aria-label="$t('common.share.State' /* Share current State */)" />
    </vue-mobile-menu>

    <vue-modal :show="show" :class="$style.modal">
      <vue-input
        name="code"
        id="code"
        placeholder="code"
        v-model="code"
        autofocus
      />
      <vue-button
        accent
        aria-label="Restore Stories"
        @click="loadStateFromServer()"
        :disabled="code.length > 6"
      >
        Restore
      </vue-button>
      <vue-button
        aria-label="Cancel"
        @click="show = false"
      >
        Cancel
      </vue-button>
    </vue-modal>
  </div>
</template>

<script lang="ts">
  import { mapGetters }      from 'vuex';
  import VueGrid             from '../../shared/components/VueGrid/VueGrid';
  import VueGridRow          from '../../shared/components/VueGridRow/VueGridRow';
  import VueGridItem         from '../../shared/components/VueGridItem/VueGridItem';
  import VueButton           from '../../shared/components/VueButton/VueButton';
  import VueMobileMenu       from '../../shared/components/VueMobileMenu/VueMobileMenu';
  import cloneDeep           from 'lodash/cloneDeep';
  import merge               from 'lodash/merge';
  import { IState }          from '../../state';
  import { HttpService }     from '../../shared/services/HttpService';
  import { addNotification } from '../../shared/components/VueNotificationStack/utils';
  import VueModal            from '../../shared/components/VueModal/VueModal';
  import VueInput            from '../../shared/components/VueInput/VueInput';

  export default {
    metaInfo:   {
      title: 'Chaptr',
    },
    components: { VueInput, VueModal, VueMobileMenu, VueButton, VueGridItem, VueGridRow, VueGrid },
    computed:   {
      ...mapGetters('story', ['allStories']),
      hasStories() {
        return this.allStories.length > 0;
      },
    },
    methods:    {
      addStory() {
        this.$router.push('/story/edit');
      },
      saveState() {
        const state: IState = cloneDeep(this.$store.state);
        delete state.app;
        delete state.route;

        const newBlob = new Blob([JSON.stringify(state)], { type: 'application/json;' });
        const filename = `chaptr-${new Date().getTime()}.json`;
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob, filename);
          return;
        }
        const data = window.URL.createObjectURL(newBlob);
        const link = document.createElement('a');
        link.href = data;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(data);
        }, 1000);
      },
      loadState() {
        this.$refs.fileupload.click();

        this.$refs.fileupload.addEventListener('change', () => {
          const files = this.$refs.fileupload.files;
          const fileReader = new FileReader();

          fileReader.onload = (e: FileReaderProgressEvent) => {
            const state: IState = cloneDeep(this.$store.state);
            const loadedState = JSON.parse(e.target.result);

            this.$store.replaceState(merge(state, loadedState));
          };

          fileReader.readAsText(files.item(0));
        });
      },
      shareState() {
        HttpService
        .post('/upload', this.$store.state)
        .then((res: any) => {
          addNotification({
                            title: 'Here is your code!',
                            text:  'Enter the following code on the target device: ' + res.data.code,
                          });
        });
      },
      loadStateFromServer() {
        HttpService
        .get(`/share/${this.code}`)
        .then((res: any) => {
          const state: IState = cloneDeep(this.$store.state);
          this.$store.replaceState(merge(state, res.data.content));
          addNotification({
                            title: 'Stories restored!',
                            text:  'Your stories are now transfered',
                          });
          this.show = false;
        })
        .catch(() => {
          addNotification({
                            title: 'Code is not valid!',
                            text:  'Stories can not be restored, please try again.',
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
  @import "../../shared/styles";

  .home {
    background:  linear-gradient(to bottom, $brand-dark-primary 0%, lighten($brand-light-primary, 2%) 50%, $brand-primary 100%);
    text-align:  center;
    text-shadow: 3px 5px 10px rgba(0, 0, 0, .25);
    color:       $text-color-inverse;
    padding-top: $nav-bar-height;

    h1 {
      font-weight: 700;
    }
  }

  .hasStories {
    .header {
      h1 {
        font-size: $font-size-h2;
        margin:    0;
      }
      p {
        font-size: 75%;
      }
    }
  }

  .storyList {
    li {
      padding:       $space-unit * 2;
      cursor:        pointer;
      margin-bottom: $space-unit;
    }
  }

  .modal {
    text-align: left !important;
  }
</style>
