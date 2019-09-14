<template>
  <div :class="$style.story">
    <vue-layout @position="changeMenuPosition" :position="menuPosition">
      <vue-grid>
        <vue-grid-row>
          <vue-grid-item>
            <vue-headline level="1">{{ story.title }}</vue-headline>
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-breadcrumb :items="breadcrumbItems"></vue-breadcrumb>
          </vue-grid-item>
        </vue-grid-row>

        <print-view
          :chapters="chapters"
          :get-character-by-id="getCharacterById"
          :get-place-by-id="getPlaceById"
          :get-item-by-id="getItemById"
          v-show="view === 'print'"
        />

        <chronological-view :events="orderedEvents" :get-character-by-id="getCharacterById" v-show="view === 'time'" />

        <storyline-view :events="events" v-show="view === 'storyline'" />
      </vue-grid>

      <vue-mobile-menu slot="sidebar">
        <vue-button
          accent
          @click="$router.push(`/event/edit/${story.id}`)"
          :aria-label="$t('common.add.event' /* Add a new Event */)"
          :title="$t('common.add.event' /* Add a new Event */)"
        >
          <vue-icon-calendar />
        </vue-button>
        <vue-button
          @click="$router.push(`/story/edit/${story.id}`)"
          :aria-label="$t('common.edit' /* Edit */)"
          :title="$t('common.edit' /* Edit */)"
        >
          <vue-icon-pencil />
        </vue-button>
        <vue-button
          @click="changeView"
          :aria-label="$t('common.changeView' /* Change View */)"
          :title="$t('common.changeView' /* Change View */)"
        >
          <vue-icon-book v-if="view === 'time'" />
          <vue-icon-bar-chart v-if="view === 'print'" />
          <vue-icon-clock v-if="view === 'storyline'" />
        </vue-button>
        <vue-button
          @click="exportToDocx"
          :aria-label="$t('common.share.exportToDocx' /* Export to Word */)"
          :title="$t('common.share.exportToDocx' /* Export to Word */)"
        >
          <vue-icon-word />
        </vue-button>
      </vue-mobile-menu>
    </vue-layout>
  </div>
</template>

<script lang="ts">
import { IStory } from '../IStory';
import { mapActions, mapGetters } from 'vuex';
import { IEvent } from '../../event/IEvent';
import { ExportToDocx } from '@/app/story/Story/ExportToDocx';
import VueLayout from '@components/VueLayout/VueLayout.vue';
import VueGrid from '@components/VueGrid/VueGrid.vue';
import VueGridRow from '@components/VueGridRow/VueGridRow.vue';
import VueGridItem from '@components/VueGridItem/VueGridItem.vue';
import VueHeadline from '@components/VueHeadline/VueHeadline.vue';
import PrintView from '@/app/story/PrintView/PrintView.vue';
import ChronologicalView from '@/app/story/ChronologicalView/ChronologicalView.vue';
import StorylineView from '@/app/story/StorylineView/StorylineView.vue';
import VueMobileMenu from '@components/VueMobileMenu/VueMobileMenu.vue';
import VueButton from '@components/VueButton/VueButton.vue';
import VueIconArrowLeft from '@components/icons/VueIconArrowLeft/VueIconArrowLeft.vue';
import VueIconUser from '@components/icons/VueIconUser/VueIconUser.vue';
import VueIconGlobe from '@components/icons/VueIconGlobe/VueIconGlobe.vue';
import VueIconSuitCase from '@components/icons/VueIconSuitCase/VueIconSuitCase.vue';
import VueIconCalendar from '@components/icons/VueIconCalendar/VueIconCalendar.vue';
import VueIconPencil from '@components/icons/VueIconPencil/VueIconPencil.vue';
import VueIconBook from '@components/icons/VueIconBook/VueIconBook.vue';
import VueIconBarChart from '@components/icons/VueIconBarChart/VueIconBarChart.vue';
import VueIconClock from '@components/icons/VueIconClock/VueIconClock.vue';
import VueIconWord from '@components/icons/VueIconWord/VueIconWord.vue';
import VueBreadcrumb from '@components/VueBreadcrumb/VueBreadcrumb.vue';

export default {
  metaInfo() {
    return {
      title: 'Chaptr | Story | ' + this.story.title,
    };
  },
  components: {
    VueBreadcrumb,
    VueIconWord,
    VueIconClock,
    VueIconBarChart,
    VueIconBook,
    VueIconPencil,
    VueIconCalendar,
    VueIconSuitCase,
    VueIconGlobe,
    VueIconUser,
    VueIconArrowLeft,
    VueButton,
    VueMobileMenu,
    StorylineView,
    ChronologicalView,
    PrintView,
    VueHeadline,
    VueGridItem,
    VueGridRow,
    VueGrid,
    VueLayout,
  },
  computed: {
    ...mapGetters('story', ['getStoryById']),
    ...mapGetters('event', ['getEventsByStoryId']),
    ...mapGetters('app', ['menuPosition']),
    ...mapGetters('character', ['allCharacters', 'getCharacterById']),
    ...mapGetters('place', ['allPlaces', 'getPlaceById']),
    ...mapGetters('item', ['allItems', 'getItemById']),
    breadcrumbItems() {
      return [{ label: 'Stories', href: '/' }, { label: this.story.title, href: '/' }];
    },
    orderedEvents() {
      if (this.view === 'time') {
        return this.events.slice(0).sort((a: IEvent, b: IEvent): any => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      }

      return this.events;
    },
    chapters() {
      const chapters: { name: string; events: IEvent[] }[] = [];
      const findChapterIndex = (name: string) => chapters.findIndex((c) => c.name === name);

      this.events.forEach((event: IEvent) => {
        let chapterIndex: number = findChapterIndex(event.chapter.toString());

        if (chapterIndex > -1) {
          chapters[chapterIndex].events.push(event);
        } else {
          chapters.push({ name: event.chapter.toString(), events: [] });
          chapterIndex = findChapterIndex(event.chapter.toString());
          chapters[chapterIndex].events.push(event);
        }
      });

      return chapters;
    },
  },
  data(): { story: IStory; events: IEvent[]; view: string } {
    return {
      story: {
        id: null,
        title: '',
        color: '',
        abstract: '',
      },
      events: [],
      view: 'print',
    };
  },
  methods: {
    ...mapActions('story', ['setCurrentStory']),
    ...mapActions('app', ['changeMenuPosition']),
    changeView() {
      if (this.view === 'print') {
        this.view = 'storyline';
      } else if (this.view === 'storyline') {
        this.view = 'time';
      } else {
        this.view = 'print';
      }
    },
    exportToDocx /* istanbul ignore next */() {
      ExportToDocx(this.story, this.events, this.getCharacterById, this.allCharacters, this.allPlaces, this.allItems);
    },
  },
  mounted() {
    const storyId: string = this.$route.params.id;
    this.story = this.getStoryById(storyId);
    this.setCurrentStory(storyId);
    this.events = this.getEventsByStoryId(storyId);
  },
};
</script>

<style lang="scss" module>
@import '../../shared/design-system';

.story {
}
</style>
