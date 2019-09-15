<template>
  <vue-grid-row :class="$style.printView">
    <vue-grid-item>
      <vue-accordion multiple>
        <vue-accordion-item
          initOpen
          :title="`Chapter: ${chapter.name}`"
          v-for="chapter in chapters"
          :key="chapter.name"
        >
          <vue-grid-row v-for="event in chapter.events" :key="event.id">
            <vue-grid-item>
              <vue-card>
                <template slot="header">{{ event.title }}</template>

                <vue-grid-row :class="$style.meta">
                  <vue-grid-item>
                    <vue-grid-row>
                      <vue-grid-item>
                        <label>{{ $t('common.characters' /* Characters */) }}</label>
                        <ul>
                          <li v-for="characterId in event.characters" :key="characterId">
                            <router-link :to="`/character/edit/${getCharacterById(characterId).id}`">
                              {{ getCharacterById(characterId).name }}
                            </router-link>
                          </li>
                        </ul>
                      </vue-grid-item>
                      <vue-grid-item>
                        <label>{{ $t('common.places' /* Places */) }}</label>
                        <ul>
                          <li v-for="placeId in event.places" :key="placeId">
                            <router-link :to="`/place/edit/${getPlaceById(placeId).id}`">
                              {{ getPlaceById(placeId).name }}
                            </router-link>
                          </li>
                        </ul>
                      </vue-grid-item>
                      <vue-grid-item>
                        <label>{{ $t('common.items' /* Items */) }}</label>
                        <ul>
                          <li v-for="itemId in event.items" :key="itemId">
                            <router-link :to="`/item/edit/${getItemById(itemId).id}`">
                              {{ getItemById(itemId).name }}
                            </router-link>
                          </li>
                        </ul>
                      </vue-grid-item>
                    </vue-grid-row>
                  </vue-grid-item>
                  <vue-grid-item>
                    <ul :class="$style.thumbnails">
                      <li
                        v-for="(image, idx) in images(event)"
                        :key="`${event.id}-image-${idx}`"
                        :style="{ backgroundImage: `url(${image})` }"
                      ></li>
                    </ul>
                  </vue-grid-item>
                </vue-grid-row>

                <vue-grid-row>
                  <vue-grid-item>
                    <label>{{ $t('common.notes' /* Notes */) }}</label>
                    <vue-markdown>
                      {{ event.notes }}
                    </vue-markdown>
                  </vue-grid-item>
                </vue-grid-row>

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
        </vue-accordion-item>
      </vue-accordion>
    </vue-grid-item>
  </vue-grid-row>
</template>

<script lang="ts">
import VueGridRow from '@components/VueGridRow/VueGridRow.vue';
import VueGridItem from '@components/VueGridItem/VueGridItem.vue';
import VueAccordion from '@components/VueAccordion/VueAccordion.vue';
import VueAccordionItem from '@components/VueAccordion/VueAccordionItem/VueAccordionItem.vue';
import VueCard from '@components/VueCard/VueCard.vue';
import VueMarkdown from '@components/VueMarkdown/VueMarkdown.vue';
import VueButton from '@components/VueButton/VueButton.vue';
import VueIconPencil from '@components/icons/VueIconPencil/VueIconPencil.vue';
import { IEvent } from '@/app/event/IEvent';
import { ICharacter } from '@/app/character/ICharacter';
import { IPlace } from '@/app/place/IPlace';
import { IItem } from '@/app/item/IItem';

export default {
  name: 'PrintView',
  components: {
    VueIconPencil,
    VueButton,
    VueMarkdown,
    VueCard,
    VueAccordionItem,
    VueAccordion,
    VueGridItem,
    VueGridRow,
  },
  props: {
    chapters: {
      type: Array,
      required: true,
    },
    getCharacterById: {
      type: Function,
      required: true,
    },
    getPlaceById: {
      type: Function,
      required: true,
    },
    getItemById: {
      type: Function,
      required: true,
    },
  },
  data(): any {
    return {};
  },
  computed: {},
  methods: {
    images(event: IEvent) {
      let images: string[] = [];

      event.characters &&
        event.characters.forEach((id) => {
          const character: ICharacter = this.getCharacterById(id);

          if (character.images) {
            images = [...images, character.images[0]];
          }
        });

      event.places &&
        event.places.forEach((id) => {
          const place: IPlace = this.getPlaceById(id);

          if (place.images) {
            images = [...images, place.images[0]];
          }
        });

      event.items &&
        event.items.forEach((id) => {
          const item: IItem = this.getItemById(id);

          if (item.images) {
            images = [...images, item.images[0]];
          }
        });

      return images;
    },
  },
};
</script>

<style lang="scss" module>
@import '~@/app/shared/design-system';

.printView {
  label {
    display: block;
    font-family: $font-family-headings;
    font-weight: $font-weight-bold;
    margin: $space-8 0;
  }

  .meta {
    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        display: block;
        height: $space-24;
      }
    }
  }

  .thumbnails {
    display: flex;
    overflow-x: scroll;

    li {
      flex: 0 0 25%;
      height: 250px !important;
      display: inline-flex;
      background-size: cover;
      background-position: center;
      margin: 0 $space-4 $space-4 0;
      box-shadow: inset 0 0 4px 0 rgba(18, 19, 21, 0.12), inset 0 4px 12px 0 rgba(18, 19, 21, 0.5);
    }
  }
}
</style>
