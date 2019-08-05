<template>
  <vue-layout @position="changeMenuPosition" :position="menuPosition">
    <form :class="$style.editStory" @submit.prevent="onSubmit">
      <vue-grid>
        <vue-grid-row>
          <vue-grid-item>
            <vue-headline level="1" v-if="story.id === null">{{
              $t('common.add.story' /* Add a new Story */)
            }}</vue-headline>
            <vue-headline level="1" v-if="story.id !== null">{{
              $t('common.edit.story' /* Edit Story */)
            }}</vue-headline>
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-input
              autofocus=""
              name="title"
              id="title"
              required
              :placeholder="$t('common.title' /* Title */)"
              validation="required"
              v-model="story.title"
            />
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-textarea
              name="abstract"
              id="abstract"
              required
              :placeholder="$t('common.abstract' /* Abstract */)"
              validation="required"
              v-model="story.abstract"
            />
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-button color="primary">
              {{ $t('common.save' /* Save */) }}
            </vue-button>

            <vue-button ghost @click="$router.push('/')">
              {{ $t('common.cancel' /* Cancel */) }}
            </vue-button>
          </vue-grid-item>
        </vue-grid-row>
      </vue-grid>
    </form>

    <vue-mobile-menu slot="sidebar">
      <vue-button
        @click="$router.push('/')"
        :aria-label="$t('common.back' /* Back */)"
        :title="$t('common.back' /* Back */)"
      >
        <vue-icon-arrow-left />
      </vue-button>
    </vue-mobile-menu>
  </vue-layout>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import VueGrid from '../../shared/components/VueGrid/VueGrid.vue';
import VueGridItem from '../../shared/components/VueGridItem/VueGridItem.vue';
import VueButton from '../../shared/components/VueButton/VueButton.vue';
import VueGridRow from '../../shared/components/VueGridRow/VueGridRow.vue';
import { IStory } from '../IStory';
import VueInput from '../../shared/components/VueInput/VueInput.vue';
import VueSelect from '../../shared/components/VueSelect/VueSelect.vue';
import { getGUID } from '@vuesion/utils/dist/randomGenerator';
import VueTextarea from '../../shared/components/VueTextarea/VueTextarea.vue';
import VueHeadline from '@components/VueHeadline/VueHeadline.vue';
import VueLayout from '@components/VueLayout/VueLayout.vue';
import VueMobileMenu from '@components/VueMobileMenu/VueMobileMenu.vue';
import VueIconArrowLeft from '@components/icons/VueIconArrowLeft/VueIconArrowLeft.vue';

export default {
  name: 'EditStory',
  $_veeValidate: {
    validator: 'new',
  },
  metaInfo: {
    title: 'Chaptr | Edit Story',
  },
  components: {
    VueIconArrowLeft,
    VueMobileMenu,
    VueLayout,
    VueHeadline,
    VueTextarea,
    VueSelect,
    VueInput,
    VueGrid,
    VueGridItem,
    VueButton,
    VueGridRow,
  },
  computed: {
    ...mapGetters('story', ['getStoryById']),
    ...mapGetters('app', ['menuPosition']),
  },
  methods: {
    ...mapActions('story', ['addStory', 'updateStory']),
    ...mapActions('app', ['changeMenuPosition']),
    onSubmit() {
      if (this.story.id === null) {
        this.story.id = getGUID();
        this.addStory(this.story);
      } else {
        this.updateStory(this.story);
      }

      this.$router.push(`/story/${this.story.id}`);
    },
  },
  data(): { story: IStory } {
    return {
      story: {
        id: null,
        title: '',
        abstract: '',
      },
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.story = this.getStoryById(this.$route.params.id);
    }
  },
};
</script>

<style lang="scss" module>
@import '../../shared/design-system';

.editStory {
}
</style>
