<template>
  <div :class="$style.story">
    <vue-layout @position="changeMenuPosition" :position="menuPosition">
      <vue-grid>
        <vue-grid-row>
          <vue-grid-item>
            <vue-headline level="1">{{ story.title }}</vue-headline>
          </vue-grid-item>
        </vue-grid-row>

        <storyline-view :events="events" v-show="view === 'storyline'" />

        <vue-grid-row v-show="view !== 'storyline'" v-for="event in orderedEvents" :key="event.id">
          <vue-grid-item>
            <vue-card :class="$style.eventPanel">
              <vue-card-header
                :title="event.storylineOrder + 1 + '. ' + event.title"
                :subtitle="$d(event.date ? new Date(event.date) : new Date())"
              />
              <vue-card-body>
                <label>Storyline:</label>
                <div :class="$style.storylineColor" :style="{ background: getStorylineColor(event.storyline) }">
                  {{ event.storyline }}
                </div>

                <div v-show="event.notes && event.notes !== ''">
                  <label>Notes:</label>
                  <vue-truncate :lines="1">
                    {{ event.notes }}
                  </vue-truncate>
                </div>
              </vue-card-body>
              <vue-card-footer>
                <vue-button color="secondary" as="router-link" :target="`/event/edit/${$route.params.id}/${event.id}`">
                  <vue-icon-pencil /> &nbsp; {{ $t('common.edit' /* Edit */) }}
                </vue-button>
              </vue-card-footer>
            </vue-card>
          </vue-grid-item>
        </vue-grid-row>
      </vue-grid>

      <vue-mobile-menu slot="sidebar">
        <vue-button warn :aria-label="$t('common.back' /* Back */)" @click="$router.push('/')">
          <vue-icon-arrow-left />
        </vue-button>
        <vue-button
          primary
          :aria-label="$t('common.add.character' /* Add a new Character */)"
          @click="$router.push('/character')"
        >
          <vue-icon-user />
        </vue-button>
        <vue-button
          accent
          :aria-label="$t('common.add.event' /* Add a new Event */)"
          @click="$router.push(`/event/edit/${story.id}`)"
        >
          <vue-icon-calendar />
        </vue-button>
        <vue-button :aria-label="$t('common.edit' /* Edit */)" @click="$router.push(`/story/edit/${story.id}`)">
          <vue-icon-pencil />
        </vue-button>
        <vue-button :aria-label="$t('common.changeView' /* Change View */)" @click="changeView">
          VIEW
          <vue-icon-book v-if="view === 'time'" />
          <vue-icon-bar-chart v-if="view === 'print'" />
          <vue-icon-clock v-if="view === 'storyline'" />
        </vue-button>
      </vue-mobile-menu>
    </vue-layout>
  </div>
</template>

<script lang="ts">
import VueGrid from '../../shared/components/VueGrid/VueGrid.vue';
import VueGridItem from '../../shared/components/VueGridItem/VueGridItem.vue';
import VueButton from '../../shared/components/VueButton/VueButton.vue';
import VueGridRow from '../../shared/components/VueGridRow/VueGridRow.vue';
import { IStory } from '../IStory';
import VueMobileMenu from '../../shared/components/VueMobileMenu/VueMobileMenu.vue';
import { mapActions, mapGetters } from 'vuex';
import { IEvent } from '../../event/IEvent';
import VueCard from '../../shared/components/VueCard/VueCard.vue';
import VueCardHeader from '../../shared/components/VueCard/VueCardHeader/VueCardHeader.vue';
import VueCardBody from '../../shared/components/VueCard/VueCardBody/VueCardBody.vue';
import VueCardFooter from '../../shared/components/VueCard/VueCardFooter/VueCardFooter.vue';
import StorylineView from '../StorylineView/StorylineView.vue';
import { StorylineColorMapping } from '../StorylineColorMapping';
import VueTruncate from '../../shared/components/VueTruncate/VueTruncate.vue';
import VueHeadline from '@components/VueHeadline/VueHeadline.vue';
import VueLayout from '@components/VueLayout/VueLayout.vue';
import VueIconArrowLeft from '@components/icons/VueIconArrowLeft/VueIconArrowLeft.vue';
import VueIconUser from '@components/icons/VueIconUser/VueIconUser.vue';
import VueIconCalendar from '@components/icons/VueIconCalendar/VueIconCalendar.vue';
import VueIconPencil from '@components/icons/VueIconPencil/VueIconPencil.vue';
import VueIconBook from '@components/icons/VueIconBook/VueIconBook.vue';
import VueIconBarChart from '@components/icons/VueIconBarChart/VueIconBarChart.vue';
import VueIconClock from '@components/icons/VueIconClock/VueIconClock.vue';

export default {
  metaInfo() {
    return {
      title: 'Chaptr | Story | ' + this.story.title,
    };
  },
  components: {
    VueIconClock,
    VueIconBarChart,
    VueIconBook,
    VueIconPencil,
    VueIconCalendar,
    VueIconUser,
    VueIconArrowLeft,
    VueLayout,
    VueHeadline,
    VueTruncate,
    StorylineView,
    VueCardFooter,
    VueCardBody,
    VueCardHeader,
    VueCard,
    VueMobileMenu,
    VueGrid,
    VueGridItem,
    VueButton,
    VueGridRow,
  },
  computed: {
    ...mapGetters('story', ['getStoryById']),
    ...mapGetters('event', ['getEventsByStoryId']),
    ...mapGetters('app', ['menuPosition']),
    orderedEvents() {
      if (this.view === 'time') {
        return this.events.slice(0).sort(
          (a: IEvent, b: IEvent): any => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          },
        );
      }

      return this.events;
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
    getStorylineColor(storyline: number) {
      return StorylineColorMapping[storyline - 1];
    },
    changeView() {
      if (this.view === 'print') {
        this.view = 'storyline';
      } else if (this.view === 'storyline') {
        this.view = 'time';
      } else {
        this.view = 'print';
      }
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

.eventPanel {
  label {
    display: inline-block;
    font-family: $font-family-headings;
    font-weight: 400;
    margin-top: $space-unit;
  }
}

.storylineColor {
  height: $space-unit * 4;
  width: $space-unit * 4;
  display: inline-block;
  position: relative;
  margin-left: $space-unit;
  text-align: center;
  padding: $space-unit * 0.5;
  font-family: $font-family-headings;
}
</style>
