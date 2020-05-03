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
            <vue-breadcrumb :items="breadcrumbItems"></vue-breadcrumb>
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-carousel
              :show-delete="false"
              :images="images"
              @remove="$emit('remove-image-url', $event)"
              :min-height="1024"
            ></vue-carousel>
          </vue-grid-item>
          <vue-grid-item>
            <vue-tab-group>
              <vue-tab-item title="Event">
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
                      :events="events"
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
              </vue-tab-item>
              <vue-tab-item title="Notes">
                <vue-grid-row>
                  <vue-grid-item>
                    <vue-textarea
                      name="notes"
                      id="notes"
                      :placeholder="$t('common.notes' /* Notes */)"
                      v-model="event.notes"
                    />
                  </vue-grid-item>
                </vue-grid-row>
                <vue-grid-row v-if="prevEvent">
                  <vue-grid-item>
                    <strong>{{ prevEvent.title }}</strong>
                    <br />
                    <vue-truncate :lines="2">
                      <vue-markdown>
                        {{ prevEvent.notes }}
                      </vue-markdown>
                    </vue-truncate>
                  </vue-grid-item>
                </vue-grid-row>
                <vue-grid-row v-if="nextEvent">
                  <vue-grid-item>
                    <br />
                    <br />
                    <strong>{{ nextEvent.title }}</strong>
                    <br />
                    <vue-truncate :lines="2">
                      <vue-markdown>
                        {{ nextEvent.notes }}
                      </vue-markdown>
                    </vue-truncate>
                  </vue-grid-item>
                </vue-grid-row>
              </vue-tab-item>
              <vue-tab-item title="Characters, Places and Items">
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
                    <ul :class="$style.list">
                      <li v-for="character in eventCharacters">
                        <router-link :to="`/character/edit/${character.id}`">{{ character.name }}</router-link>
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
                    <vue-autocomplete
                      name="place"
                      id="place"
                      :min-input-chars="0"
                      :max-options="2"
                      :options="places"
                      :placeholder="$t('common.search.places' /* Search for Places */)"
                      @request="getPlaces"
                      @change="event.places.push($event.value)"
                    />
                  </vue-grid-item>
                </vue-grid-row>
                <vue-grid-row v-if="eventPlaces.length > 0">
                  <vue-grid-item>
                    <h5>{{ $t('common.places' /* Places */) }}</h5>
                    <ul :class="$style.list">
                      <li v-for="place in eventPlaces">
                        <router-link :to="`/place/edit/${place.id}`">{{ place.name }}</router-link>
                        <vue-button
                          color="danger"
                          :aria-label="$t('common.delete' /* Delete */)"
                          @click.prevent="removePlace(place)"
                        >
                          <vue-icon-trash />
                        </vue-button>
                      </li>
                    </ul>
                  </vue-grid-item>
                </vue-grid-row>

                <vue-grid-row>
                  <vue-grid-item>
                    <vue-autocomplete
                      name="item"
                      id="item"
                      :min-input-chars="0"
                      :max-options="2"
                      :options="items"
                      :placeholder="$t('common.search.items' /* Search for Items */)"
                      @request="getItems"
                      @change="event.items.push($event.value)"
                    />
                  </vue-grid-item>
                </vue-grid-row>
                <vue-grid-row v-if="eventItems.length > 0">
                  <vue-grid-item>
                    <h5>{{ $t('common.items' /* Items */) }}</h5>
                    <ul :class="$style.list">
                      <li v-for="item in eventItems">
                        <router-link :to="`/item/edit/${item.id}`">{{ item.name }}</router-link>
                        <vue-button
                          color="danger"
                          :aria-label="$t('common.delete' /* Delete */)"
                          @click.prevent="removeItem(item)"
                        >
                          <vue-icon-trash />
                        </vue-button>
                      </li>
                    </ul>
                  </vue-grid-item>
                </vue-grid-row>
              </vue-tab-item>
            </vue-tab-group>
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <br />
            <br />
            <vue-button color="primary">
              {{ $t('common.save' /* Save */) }}
            </vue-button>

            <vue-button ghost @click="$router.go(-1)">
              {{ $t('common.cancel' /* Cancel */) }}
            </vue-button>
          </vue-grid-item>
        </vue-grid-row>
      </vue-grid>
    </form>

    <vue-mobile-menu slot="sidebar">
      <vue-button
        primary
        @click="$router.push('/character/edit')"
        :aria-label="$t('common.add.character' /* Add a new Character */)"
        :title="$t('common.add.character' /* Add a new Character */)"
      >
        <vue-icon-user />
      </vue-button>
      <vue-button
        primary
        @click="$router.push('/place/edit')"
        :aria-label="$t('common.add.place' /* Add a new Place */)"
        :title="$t('common.add.place' /* Add a new Place */)"
      >
        <vue-icon-globe />
      </vue-button>
      <vue-button
        primary
        @click="$router.push('/item/edit')"
        :aria-label="$t('common.add.item' /* Add a new Item */)"
        :title="$t('common.add.item' /* Add a new Item */)"
      >
        <vue-icon-suit-case />
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
import { IPlace } from '@/app/place/IPlace';
import { IItem } from '@/app/item/IItem';
import VueTabGroup from '@components/VueTabGroup/VueTabGroup.vue';
import VueTabItem from '@components/VueTabGroup/VueTabItem/VueTabItem.vue';
import VueCarousel, { ICarouselImage } from '@components/VueCarousel/VueCarousel.vue';
import VueIconUser from '@components/icons/VueIconUser/VueIconUser.vue';
import VueIconGlobe from '@components/icons/VueIconGlobe/VueIconGlobe.vue';
import VueIconSuitCase from '@components/icons/VueIconSuitCase/VueIconSuitCase.vue';
import VueBreadcrumb from '@components/VueBreadcrumb/VueBreadcrumb.vue';
import { IStory } from '@/app/story/IStory';
import shuffle from 'lodash/shuffle';
import VueMarkdown from '@components/VueMarkdown/VueMarkdown.vue';
import VueTruncate from '@components/VueTruncate/VueTruncate.vue';
import { Route } from 'vue-router';

interface IData {
  event: IEvent;
  characters: IAutocompleteOption[];
  places: IAutocompleteOption[];
  items: IAutocompleteOption[];
  chapters: any[];
  storylineOrders: any[];
  storylines: any[];
  story: IStory;
  events: IEvent[];
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
    ...mapGetters('place', ['allPlaces', 'getPlaceById']),
    ...mapGetters('item', ['allItems', 'getItemById']),
    ...mapGetters('event', ['getEventsByStoryId', 'getEventById']),
    ...mapGetters('story', ['getStoryById']),
    ...mapGetters('app', ['menuPosition']),
    breadcrumbItems() {
      return [
        { label: 'Stories', href: '/' },
        { label: this.story && this.story.title, href: (this.story && `/story/${this.story.id}`) || '' },
        { label: this.event.id === null ? 'Add Event' : 'Edit Event', href: '/' },
      ];
    },
    eventCharacters() {
      const characters: ICharacter[] = [];

      this.event.characters.forEach((characterId: string) => {
        characters.push(this.getCharacterById(characterId));
      });

      return characters;
    },
    eventPlaces() {
      const places: IPlace[] = [];

      this.event.places.forEach((placeId: string) => {
        places.push(this.getPlaceById(placeId));
      });

      return places;
    },
    eventItems() {
      const items: IItem[] = [];

      this.event.items.forEach((itemId: string) => {
        items.push(this.getItemById(itemId));
      });
      return items;
    },
    images(): any[] {
      let images: ICarouselImage[] = [];

      this.eventCharacters.forEach((c: ICharacter) => {
        if (c.images) {
          c.images.forEach((url: string) => {
            images.push({ url, alt: '', copyright: '' });
          });
        }
      });

      this.eventPlaces.forEach((p: IPlace) => {
        if (p.images) {
          p.images.forEach((url: string) => {
            images.push({ url, alt: '', copyright: '' });
          });
        }
      });

      this.eventItems.forEach((i: IItem) => {
        if (i.images) {
          i.images.forEach((url: string) => {
            images.push({ url, alt: '', copyright: '' });
          });
        }
      });

      return shuffle(images);
    },
    prevEvent() {
      const idx: number = this.events.findIndex((event: IEvent) => event.id === this.event.id);

      if (idx > 0) {
        return this.events[idx - 1];
      } else {
        return null;
      }
    },
    nextEvent() {
      const idx: number = this.events.findIndex((event: IEvent) => event.id === this.event.id);

      if (idx < this.events.length) {
        return this.events[idx + 1];
      } else {
        return null;
      }
    },
  },
  components: {
    VueTruncate,
    VueMarkdown,
    VueBreadcrumb,
    VueIconSuitCase,
    VueIconGlobe,
    VueIconUser,
    VueCarousel,
    VueTabItem,
    VueTabGroup,
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
        places: [],
        items: [],
        chapter: 0,
        storylineOrder: -1,
        storyline: 0,
        date: '',
        notes: '',
      },
      characters: [],
      places: [],
      items: [],
      chapters: [],
      storylineOrders: [],
      storylines: [],
      story: null,
      events: [],
    };
  },
  methods: {
    ...mapActions('event', ['addEvent', 'updateEvent']),
    ...mapActions('app', ['changeMenuPosition']),
    async onSubmit() {
      const storyId: string = this.$route.params.storyId;

      if (this.event.id === null) {
        this.event.id = getGUID();
        this.event.storyId = storyId;
        await this.addEvent(this.event);
      } else {
        await this.updateEvent(this.event);
      }
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
    removeCharacter(character: ICharacter) {
      this.event.characters = this.event.characters.filter((c: string) => {
        return c !== character.id;
      });
    },
    getPlaces(query: string) {
      this.places = this.allPlaces
        .filter((place: IPlace): boolean => {
          return (
            place.name.toLowerCase().indexOf(query.toLowerCase()) > -1 && this.event.places.indexOf(place.id) === -1
          );
        })
        .map(
          (place: IPlace): IAutocompleteOption => {
            return {
              label: place.name,
              value: place.id,
            };
          },
        );
    },
    removePlace(place: IPlace) {
      this.event.places = this.event.places.filter((p: string) => {
        return p !== place.id;
      });
    },
    getItems(query: string) {
      this.items = this.allItems
        .filter((item: IItem): boolean => {
          return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 && this.event.items.indexOf(item.id) === -1;
        })
        .map(
          (item: IItem): IAutocompleteOption => {
            return {
              label: item.name,
              value: item.id,
            };
          },
        );
    },
    removeItem(item: IItem) {
      this.event.items = this.event.items.filter((i: string) => {
        return i !== item.id;
      });
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
    fillStoryLineOrders(events: IEvent[]) {
      for (let i = 0; i < events.length; i++) {
        this.storylineOrders.push({ label: `${i + 1} - ${events[i].title}`, value: i.toString() });
      }

      this.storylineOrders.push({
        label: `${events.length + 1} - ${this.$t('common.event.new' /* New Event */)}`,
        value: events.length.toString(),
      });
      this.event.storylineOrder = this.event.storylineOrder === -1 ? events.length : this.event.storylineOrder;
    },
  },
  mounted() {
    this.events = this.getEventsByStoryId(this.$route.params.storyId);

    this.story = this.getStoryById(this.$route.params.storyId);

    if (this.$route.params.id) {
      this.event = this.getEventById(this.$route.params.id);
    }

    this.fillChapters();
    this.fillStoryLines();
    this.fillStoryLineOrders(this.events);
  },
  async beforeRouteLeave(to: Route, from: Route, next: any) {
    await this.onSubmit();

    next();
  },
};
</script>

<style lang="scss" module>
@import '../../shared/design-system';

.editEvent {
  h5 {
    margin: 0 0 $space-16 0;
  }
}

.list {
  margin: 0 0 $space-unit * 4 0;
  padding: 0;
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
