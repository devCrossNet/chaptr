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
  },
  data(): any {
    return {};
  },
  computed: {},
  methods: {},
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

  .characters {
    flex: 0 1 25%;
  }
}
</style>
