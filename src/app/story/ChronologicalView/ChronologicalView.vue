<template>
  <vue-grid-row :class="$style.chronologicalView">
    <vue-grid-item fill v-for="event in events" :key="event.id">
      <vue-card :class="$style.card" @click.native="$router.push(`/event/edit/${$route.params.id}/${event.id}`)">
        <template slot="header">{{ event.title }}</template>

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
</template>

<script lang="ts">
import VueGridRow from '@components/VueGridRow/VueGridRow.vue';
import VueGridItem from '@components/VueGridItem/VueGridItem.vue';
import VueCard from '@components/VueCard/VueCard.vue';
import VueMarkdown from '@components/VueMarkdown/VueMarkdown.vue';
import VueButton from '@components/VueButton/VueButton.vue';
import VueIconPencil from '@components/icons/VueIconPencil/VueIconPencil.vue';
import VueTruncate from '@components/VueTruncate/VueTruncate.vue';

export default {
  name: 'ChronologicalView',
  components: { VueTruncate, VueIconPencil, VueButton, VueMarkdown, VueCard, VueGridItem, VueGridRow },
  props: {
    events: {
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

.chronologicalView {
  .card {
    cursor: pointer;
  }
}
</style>
