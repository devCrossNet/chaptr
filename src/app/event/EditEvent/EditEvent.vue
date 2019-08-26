<template>
  <vue-layout @position="changeMenuPosition" :position="menuPosition">
    <form :class="$style.editEvent" @submit.prevent="onSubmit">
      <vue-grid>
        <vue-grid-row>
          <vue-grid-item>
            <vue-headline level="1" v-if="event.id === null">{{
              $t('common.add.event' /* Add a new Event */)
            }}</vue-headline>
            <vue-headline level="1" v-if="event.id !== null">{{
              $t('common.edit.event' /* Edit Event */)
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
              v-model="event.title"
            />
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-date-picker
              name="date"
              id="date"
              required
              :min-date="new Date('1950-01-01')"
              :current-date="event.date ? new Date(event.date) : new Date()"
              :first-day-of-week="1"
              :placeholder="$t('common.date' /* Date */)"
              @change="event.date = $event.toUTCString()"
            />
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-select
              :placeholder="$t('common.storyline' /* Storyline */)"
              required
              validation="required"
              name="storyline"
              id="storyline"
              :value="event.storyline.toString()"
              :options="storylines"
              @input="event.storyline = parseInt($event, 10)"
            />
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-select
              :placeholder="$t('common.chapter' /* Chapter */)"
              required
              validation="required"
              name="chapter"
              id="chapter"
              :value="event.chapter.toString()"
              :options="chapters"
              @input="event.chapter = parseInt($event, 10)"
            />
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-select
              :placeholder="$t('common.storylineOrder' /* Storyline Order */)"
              required
              validation="required"
              name="storylineOrder"
              id="storylineOrder"
              :value="event.storylineOrder.toString()"
              :options="storylineOrders"
              @input="event.storylineOrder = parseInt($event, 10)"
            />
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-autocomplete
              name="character"
              id="character"
              :min-input-chars="0"
              :max-options="2"
              :options="characters"
              :placeholder="$t('common.search.characters' /* Search for Characters */)"
              @request="getCharacters"
              @change="event.characters.push($event.value)"
            />
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row v-if="eventCharacters.length > 0">
          <vue-grid-item>
            <h5>{{ $t('common.characters' /* Characters */) }}</h5>
            <ul :class="$style.characterList">
              <li v-for="character in eventCharacters">
                {{ character.name }}
                <vue-button
                  color="danger"
                  :aria-label="$t('common.delete' /* Delete */)"
                  @click.prevent="removeCharacter(character)"
                >
                  <vue-icon-trash />
                </vue-button>
              </li>
            </ul>
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-textarea name="notes" id="notes" :placeholder="$t('common.notes' /* Notes */)" v-model="event.notes" />
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-button color="primary">
              {{ $t('common.save' /* Save */) }}
            </vue-button>

            <vue-button ghost as="router-link" :target="`/story/${$route.params.storyId}`">
              {{ $t('common.cancel' /* Cancel */) }}
            </vue-button>
          </vue-grid-item>
        </vue-grid-row>
      </vue-grid>
    </form>

    <vue-mobile-menu slot="sidebar">
      <vue-button
        @click="$router.push(`/story/${$route.params.storyId}`)"
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
import { IEvent } from '../IEvent';
import VueInput from '../../shared/components/VueInput/VueInput.vue';
import VueSelect from '../../shared/components/VueSelect/VueSelect.vue';
import { getGUID } from '@vuesion/utils/dist/randomGenerator';
import VueAutocomplete from '../../shared/components/VueAutocomplete/VueAutocomplete.vue';
import { ICharacter } from '../../character/ICharacter';
import { IAutocompleteOption } from '@components/VueAutocomplete/IAutocompleteOption';
import VueDatePicker from '../../shared/components/VueDatePicker/VueDatePicker.vue';
import VueTextarea from '../../shared/components/VueTextarea/VueTextarea.vue';
import VueLayout from '@components/VueLayout/VueLayout.vue';
import VueMobileMenu from '@components/VueMobileMenu/VueMobileMenu.vue';
import VueIconArrowLeft from '@components/icons/VueIconArrowLeft/VueIconArrowLeft.vue';
import VueHeadline from '@components/VueHeadline/VueHeadline.vue';
import VueIconTrash from '@components/icons/VueIconTrash/VueIconTrash.vue';

interface IData {
  event: IEvent;
  characters: IAutocompleteOption[];
  chapters: any[];
  storylineOrders: any[];
  storylines: any[];
}

export default {
  name: 'EditEvent',
  $_veeValidate: {
    validator: 'new',
  },
  metaInfo: {
    title: 'Chaptr | Edit Event',
  },
  computed: {
    ...mapGetters('character', ['allCharacters', 'getCharacterById']),
    ...mapGetters('event', ['getEventsByStoryId', 'getEventById']),
    ...mapGetters('app', ['menuPosition']),
    eventCharacters() {
      const characters: ICharacter[] = [];

      this.event.characters.forEach((characterId: string) => {
        characters.push(this.getCharacterById(characterId));
      });

      return characters;
    },
  },
  components: {
    VueIconTrash,
    VueHeadline,
    VueIconArrowLeft,
    VueMobileMenu,
    VueLayout,
    VueTextarea,
    VueDatePicker,
    VueAutocomplete,
    VueSelect,
    VueInput,
    VueGrid,
    VueGridItem,
    VueButton,
    VueGridRow,
  },
  data(): IData {
    return {
      event: {
        id: null,
        storyId: null,
        title: '',
        characters: [],
        chapter: 0,
        storylineOrder: -1,
        storyline: 0,
        date: '',
        notes: '',
      },
      characters: [],
      chapters: [],
      storylineOrders: [],
      storylines: [],
    };
  },
  methods: {
    ...mapActions('event', ['addEvent', 'updateEvent']),
    ...mapActions('app', ['changeMenuPosition']),
    onSubmit() {
      const storyId: string = this.$route.params.storyId;

      if (this.event.id === null) {
        this.event.id = getGUID();
        this.event.storyId = storyId;
        this.addEvent(this.event);
      } else {
        this.updateEvent(this.event);
      }

      this.$router.push(`/story/${storyId}`);
    },
    getCharacters(query: string) {
      this.characters = this.allCharacters
        .filter((character: ICharacter): boolean => {
          return (
            character.name.toLowerCase().indexOf(query.toLowerCase()) > -1 &&
            this.event.characters.indexOf(character.id) === -1
          );
        })
        .map(
          (character: ICharacter): IAutocompleteOption => {
            return {
              label: character.name,
              value: character.id,
            };
          },
        );
    },
    fillChapters() {
      for (let i = 1; i <= 99; i++) {
        this.chapters.push({ label: i.toString(), value: i.toString() });
      }
    },
    fillStoryLines() {
      for (let i = 1; i <= 20; i++) {
        this.storylines.push({ label: i.toString(), value: i.toString() });
      }
    },
    fillStoryLineOrders(storyEvents: IEvent[]) {
      for (let i = 0; i < storyEvents.length; i++) {
        this.storylineOrders.push({ label: `${i + 1} - ${storyEvents[i].title}`, value: i.toString() });
      }

      this.storylineOrders.push({
        label: `${storyEvents.length + 1} - ${this.$t('common.event.new' /* New Event */)}`,
        value: storyEvents.length.toString(),
      });
      this.event.storylineOrder = this.event.storylineOrder === -1 ? storyEvents.length : this.event.storylineOrder;
    },
    removeCharacter(character: ICharacter) {
      this.event.characters = this.event.characters.filter((c: string) => {
        return c !== character.id;
      });
    },
  },
  mounted() {
    const storyEvents: IEvent[] = this.getEventsByStoryId(this.$route.params.storyId);

    if (this.$route.params.id) {
      this.event = this.getEventById(this.$route.params.id);
    }

    this.fillChapters();
    this.fillStoryLines();
    this.fillStoryLineOrders(storyEvents);
  },
};
</script>

<style lang="scss" module>
@import '../../shared/design-system';

.editEvent {
  h5 {
    margin-top: 0;
  }
}

.characterList {
  margin-bottom: $space-unit * 4;
  list-style: initial;

  li {
    display: block;
    height: $space-unit * 6;
  }

  button {
    min-width: auto;
    float: right;
    padding: 0;
    height: $space-unit * 4;
    width: $space-unit * 4;
  }
}
</style>
