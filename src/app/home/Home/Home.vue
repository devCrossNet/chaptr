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
    </vue-mobile-menu>
  </div>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex';
  import VueGrid        from '../../shared/components/VueGrid/VueGrid';
  import VueGridRow     from '../../shared/components/VueGridRow/VueGridRow';
  import VueGridItem    from '../../shared/components/VueGridItem/VueGridItem';
  import VueButton      from '../../shared/components/VueButton/VueButton';
  import VueMobileMenu  from '../../shared/components/VueMobileMenu/VueMobileMenu';
  import cloneDeep      from 'lodash/cloneDeep';
  import merge          from 'lodash/merge';
  import { IState }     from '../../state';

  export default {
    metaInfo:   {
      title: 'Chaptr',
    },
    components: { VueMobileMenu, VueButton, VueGridItem, VueGridRow, VueGrid },
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
</style>
