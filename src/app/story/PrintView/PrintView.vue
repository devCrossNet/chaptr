<template>
  <vue-grid-row :class="$style.printView">
    <vue-grid-item>
      <vue-accordion multiple>
        <vue-accordion-item
          initOpen
          :title="`Chapter: ${chapter.name} (${chapter.wordCount} words)`"
          v-for="chapter in chapters"
          :key="chapter.name"
        >
          <vue-grid-row v-for="event in chapter.events" :key="event.id">
            <vue-grid-item>
              <vue-card
                :class="$style.card"
                @click.native="$router.push(`/event/edit/${$route.params.id}/${event.id}`)"
              >
                <template slot="header">
                  {{ event.title }} <span v-if="event.date">({{ $d(new Date(event.date), 'datePicker', 'de') }})</span>
                </template>

                <vue-grid-row v-if="event.notes">
                  <vue-grid-item>
                    <vue-truncate :lines="3">
                      <vue-markdown>
                        {{ event.notes }}
                      </vue-markdown>
                    </vue-truncate>
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
import VueTruncate from '@components/VueTruncate/VueTruncate.vue';

export default {
  name: 'PrintView',
  components: {
    VueTruncate,
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
  .card {
    cursor: pointer;
  }
}
</style>
