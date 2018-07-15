<template>
  <div :class="$style.story">
    <vue-grid>
      <vue-grid-row>
        <vue-grid-item fill>
          <h1>{{ story.title }}</h1>
          <div :class="$style.viewSwitch">
            <vue-button
              :accent="view === 'print'"
              @click="view='print'"
            >{{ $t('common.view.storyLine' /* Storyline */) }}
            </vue-button>
            <vue-button
              :accent="view === 'storyline'"
              @click="view='storyline'"
            >{{ $t('common.view.storyLineDiagram' /* Diagram */) }}
            </vue-button>
            <vue-button
              :accent="view === 'time'"
              @click="view='time'"
            >{{ $t('common.view.chronological' /* Chronological */) }}
            </vue-button>
          </div>
        </vue-grid-item>
      </vue-grid-row>

      <storyline-view :events="events" v-show="view === 'storyline'" />

      <vue-grid-row v-show="view !== 'storyline'" v-for="event in orderedEvents" :key="event.id">
        <vue-grid-item fill>
          <vue-panel
            :class="$style.eventPanel">
            <vue-panel-header
              :title="(event.storylineOrder + 1) + '. ' + event.title"
              :subtitle="$d(event.date ? new Date(event.date) : new Date())" />
            <vue-panel-body>
              <label>Storyline:</label>
              <div :class="$style.storylineColor" :style="{background: getStorylineColor(event.storyline)}">
                {{ event.storyline }}
              </div>

              <div v-show="event.notes && event.notes !== ''">
                <label>Notes:</label>
                <vue-truncate :lines="1">
                  {{ event.notes }}
                </vue-truncate>
              </div>
            </vue-panel-body>
            <vue-panel-footer>
              <vue-button
                accent
                @click="$router.push(`/event/edit/${$route.params.id}/${event.id}`)" icon="edit">
                {{ $t('common.edit' /* Edit */) }}
              </vue-button>
            </vue-panel-footer>
          </vue-panel>
        </vue-grid-item>
      </vue-grid-row>
    </vue-grid>

    <vue-mobile-menu v-show="view !== 'storyline'">
      <vue-button
        warn
        icon="arrow-left"
        :aria-label="$t('common.back' /* Back */)"
        @click="$router.push('/')" />
      <vue-button
        primary
        icon="user"
        :aria-label="$t('common.add.character' /* Add a new Character */)"
        @click="$router.push('/character')" />

      <vue-button
        accent
        icon="calendar-alt"
        :aria-label="$t('common.add.event' /* Add a new Event */)"
        @click="$router.push(`/event/edit/${story.id}`)" />

      <vue-button
        icon="pencil-alt"
        :aria-label="$t('common.edit' /* Edit */)"
        @click="$router.push(`/story/edit/${story.id}`)" />
    </vue-mobile-menu>
  </div>
</template>

<script lang="ts">
  import VueGrid                    from '../../shared/components/VueGrid/VueGrid';
  import VueGridItem                from '../../shared/components/VueGridItem/VueGridItem';
  import VueButton                  from '../../shared/components/VueButton/VueButton';
  import VueGridRow                 from '../../shared/components/VueGridRow/VueGridRow';
  import { IStory }                 from '../IStory';
  import VueMobileMenu              from '../../shared/components/VueMobileMenu/VueMobileMenu';
  import { mapActions, mapGetters } from 'vuex';
  import { IEvent }                 from '../../event/IEvent';
  import VuePanel                   from '../../shared/components/VuePanel/VuePanel';
  import VuePanelHeader             from '../../shared/components/VuePanel/VuePanelHeader/VuePanelHeader';
  import VuePanelBody               from '../../shared/components/VuePanel/VuePanelBody/VuePanelBody';
  import VuePanelFooter             from '../../shared/components/VuePanel/VuePanelFooter/VuePanelFooter';
  import StorylineView              from '../StorylineView/StorylineView';
  import { StorylineColorMapping }  from '../StorylineColorMapping';
  import VueTruncate                from '../../shared/components/VueTruncate/VueTruncate';

  export default {
    metaInfo() {
      return {
        title: 'Chaptr | Story | ' + this.story.title,
      };
    },
    components: {
      VueTruncate,
      StorylineView,
      VuePanelFooter,
      VuePanelBody,
      VuePanelHeader,
      VuePanel,
      VueMobileMenu,
      VueGrid,
      VueGridItem,
      VueButton,
      VueGridRow,
    },
    computed:   {
      ...mapGetters('story', ['getStoryById']),
      ...mapGetters('event', ['getEventsByStoryId']),
      orderedEvents() {
        if (this.view === 'time') {
          return this.events.slice(0).sort((a: IEvent, b: IEvent): any => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          });
        }

        return this.events;
      },
    },
    data(): { story: IStory, events: IEvent[], view: string } {
      return {
        story:  {
          id:       null,
          title:    '',
          color:    '',
          abstract: '',
        },
        events: [],
        view:   'print',
      };
    },
    methods:    {
      ...mapActions('story', ['setCurrentStory']),
      getStorylineColor(storyline: number) {
        return StorylineColorMapping[storyline - 1];
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
  @import "../../shared/styles";

  .story {
  }

  .eventPanel {
    cursor:        pointer;
    margin-bottom: $space-unit * 2;

    label {
      display:     inline-block;
      font-family: $font-family-headings;
      font-weight: 400;
      margin-top:  $space-unit;
    }
  }

  .viewSwitch {
    text-align:     center;
    margin-bottom:  $space-unit * 2;
    display:        flex;
    flex-direction: row;

    button {
      min-width: auto;
      margin:    0;
      flex:      1;
      padding:   0;
      font-size: 12px;
    }
  }

  .storylineColor {
    height:      $space-unit * 4;
    width:       $space-unit * 4;
    display:     inline-block;
    position:    relative;
    margin-left: $space-unit;
    text-align:  center;
    padding:     $space-unit * 0.5;
    font-family: $font-family-headings;
  }
</style>
