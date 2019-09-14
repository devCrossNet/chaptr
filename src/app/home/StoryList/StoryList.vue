<template>
  <vue-grid>
    <vue-grid-row v-show="hasStories === true">
      <vue-grid-item fill>
        <vue-headline level="1">{{ $t('common.yourStories' /* Your Stories */) }}</vue-headline>
      </vue-grid-item>

      <vue-grid-item fill>
        <vue-breadcrumb :items="[{ label: 'Stories', href: '' }]"></vue-breadcrumb>
      </vue-grid-item>

      <vue-grid-item v-for="story in stories" :key="story.id" :class="$style.item">
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

    <vue-grid-row v-show="hasStories === false">
      <vue-grid-item fill>
        <vue-headline level="1">{{ $t('common.yourStories' /* Your Stories */) }}</vue-headline>
      </vue-grid-item>

      <vue-grid-item fill>
        <vue-button
          color="secondary"
          @click="$router.push('/story/edit')"
          :aria-label="$t('common.add.story' /* Add a new Story */)"
          :title="$t('common.add.story' /* Add a new Story */)"
        >
          <vue-icon-add /> {{ $t('common.add.story' /* Add a new Story */) }}
        </vue-button>
      </vue-grid-item>
    </vue-grid-row>
  </vue-grid>
</template>

<script lang="ts">
import VueGrid from '@components/VueGrid/VueGrid.vue';
import VueGridRow from '@components/VueGridRow/VueGridRow.vue';
import VueGridItem from '@components/VueGridItem/VueGridItem.vue';
import VueHeadline from '@components/VueHeadline/VueHeadline.vue';
import VueCard from '@components/VueCard/VueCard.vue';
import VueMarkdown from '@components/VueMarkdown/VueMarkdown.vue';
import VueButton from '@components/VueButton/VueButton.vue';
import VueIconPencil from '@components/icons/VueIconPencil/VueIconPencil.vue';
import VueIconAdd from '@components/icons/VueIconAdd/VueIconAdd.vue';
import VueBreadcrumb from '@components/VueBreadcrumb/VueBreadcrumb.vue';

export default {
  name: 'StoryList',
  components: {
    VueBreadcrumb,
    VueIconAdd,
    VueIconPencil,
    VueButton,
    VueMarkdown,
    VueCard,
    VueHeadline,
    VueGridItem,
    VueGridRow,
    VueGrid,
  },
  props: {
    stories: {
      type: Array,
      required: true,
    },
  },
  data(): any {
    return {};
  },
  computed: {
    hasStories() {
      return this.stories.length > 0;
    },
  },
  methods: {},
};
</script>

<style lang="scss" module>
@import '~@/app/shared/design-system';

.storyList {
  .item {
    flex: 1 1 50%;
    display: flex;
  }

  .card {
    flex: 1 1 50%;
  }
}
</style>
