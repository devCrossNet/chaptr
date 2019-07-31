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
            <vue-card>
              <template slot="header">{{ event.title }}</template>

              <div v-show="event.notes && event.notes !== ''">
                <vue-grid-row>
                  <vue-grid-item :class="$style.characters">
                    <label>{{ $t('common.characters' /* Characters */) }}</label>
                    <ul>
                      <li v-for="characterId in event.characters" :key="characterId">
                        {{ getCharacterById(characterId).name }}
                      </li>
                    </ul>
                  </vue-grid-item>

                  <vue-grid-item>
                    <label>{{ $t('common.notes' /* Notes */) }}</label>
                    <vue-markdown>
                      {{ event.notes }}
                    </vue-markdown>
                  </vue-grid-item>
                </vue-grid-row>
              </div>

              <vue-button
                slot="footer"
                color="secondary"
                as="router-link"
                :target="`/event/edit/${$route.params.id}/${event.id}`"
              >
                <vue-icon-pencil />
              </vue-button>
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
          <vue-icon-book v-if="view === 'time'" />
          <vue-icon-bar-chart v-if="view === 'print'" />
          <vue-icon-clock v-if="view === 'storyline'" />
        </vue-button>
        <vue-button @click="exportToWord" :aria-label="$t('common.share.exportToWord' /* Export to Word */)">
          <vue-icon-word />
        </vue-button>
      </vue-mobile-menu>
    </vue-layout>
  </div>
</template>

<script lang="ts">
import marked from 'marked';
import * as htmlDocx from 'html-docx-js/dist/html-docx';
import { saveAs } from 'file-saver';
import VueGrid from '../../shared/components/VueGrid/VueGrid.vue';
import VueGridItem from '../../shared/components/VueGridItem/VueGridItem.vue';
import VueButton from '../../shared/components/VueButton/VueButton.vue';
import VueGridRow from '../../shared/components/VueGridRow/VueGridRow.vue';
import { IStory } from '../IStory';
import VueMobileMenu from '../../shared/components/VueMobileMenu/VueMobileMenu.vue';
import { mapActions, mapGetters } from 'vuex';
import { IEvent } from '../../event/IEvent';
import VueCard from '../../shared/components/VueCard/VueCard.vue';
import StorylineView from '../StorylineView/StorylineView.vue';
import VueHeadline from '@components/VueHeadline/VueHeadline.vue';
import VueLayout from '@components/VueLayout/VueLayout.vue';
import VueIconArrowLeft from '@components/icons/VueIconArrowLeft/VueIconArrowLeft.vue';
import VueIconUser from '@components/icons/VueIconUser/VueIconUser.vue';
import VueIconCalendar from '@components/icons/VueIconCalendar/VueIconCalendar.vue';
import VueIconPencil from '@components/icons/VueIconPencil/VueIconPencil.vue';
import VueIconBook from '@components/icons/VueIconBook/VueIconBook.vue';
import VueIconBarChart from '@components/icons/VueIconBarChart/VueIconBarChart.vue';
import VueIconClock from '@components/icons/VueIconClock/VueIconClock.vue';
import VueMarkdown from '@components/VueMarkdown/VueMarkdown.vue';
import VueIconWord from '@components/icons/VueIconWord/VueIconWord.vue';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

export default {
  metaInfo() {
    return {
      title: 'Chaptr | Story | ' + this.story.title,
    };
  },
  components: {
    VueIconWord,
    VueMarkdown,
    VueIconClock,
    VueIconBarChart,
    VueIconBook,
    VueIconPencil,
    VueIconCalendar,
    VueIconUser,
    VueIconArrowLeft,
    VueLayout,
    VueHeadline,
    StorylineView,
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
    ...mapGetters('character', ['getCharacterById']),
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
    changeView() {
      if (this.view === 'print') {
        this.view = 'storyline';
      } else if (this.view === 'storyline') {
        this.view = 'time';
      } else {
        this.view = 'print';
      }
    },
    exportToWord /* istanbul ignore next */() {
      const story: IStory = this.story;
      let text = `# ${story.title}\n\n## Abstract\n\n${story.abstract}\n\n## Story\n\n`;

      this.events.forEach((e: IEvent) => {
        text += `### ${e.title} *(${
          e ? new Date(e.date).toDateString() : 'no date information'
        })*\n\n**Characters**: ${e.characters
          .map((characterId: string) => this.getCharacterById(characterId).name)
          .join(', ')}\n\n${e.notes}\n\n`;
      });

      const html = `<!DOCTYPE html><html><body>${(marked as any)(text)}</body></html>`;
      const converted = htmlDocx.asBlob(html);
      saveAs(converted, `${story.title}.docx`);
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
  label {
    display: block;
    font-family: $font-family-headings;
    font-weight: $font-weight-bold;
    margin: $space-8 0;
  }

  .characters {
    flex: 0 1 25%;
  }
}
</style>
