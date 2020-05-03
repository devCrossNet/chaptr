<template>
  <vue-layout :class="$style.place" @position="changeMenuPosition" :position="menuPosition">
    <vue-grid>
      <vue-grid-row>
        <vue-grid-item fill>
          <vue-headline level="1">
            {{ $t('common.places' /* Places */) }}
          </vue-headline>
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-breadcrumb :items="breadcrumbItems"></vue-breadcrumb>
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item fill v-for="place in allPlaces" :key="place.id" :class="$style.card">
          <vue-card @click.native="$router.push(`/place/edit/${place.id}`)">
            <template slot="header">
              {{ place.name }}
            </template>

            <vue-grid-row>
              <vue-grid-item>
                <div>
                  <label>{{ $t('common.type' /* Type */) }}</label>
                  <div>{{ place.type }}</div>
                </div>
                <div>
                  <label>{{ $t('common.location' /* Location */) }}</label>
                  <div>{{ place.location }}</div>
                </div>
              </vue-grid-item>

              <vue-grid-item>
                <div>
                  <label>{{ $t('common.notes' /* Notes */) }}</label>
                  <vue-markdown>{{ place.notes }}</vue-markdown>
                </div>
              </vue-grid-item>
            </vue-grid-row>
            <vue-button slot="footer" color="secondary" as="router-link" :target="`/place/edit/${place.id}`">
              <vue-icon-pencil />
            </vue-button>
          </vue-card>
        </vue-grid-item>
      </vue-grid-row>
    </vue-grid>

    <vue-mobile-menu slot="sidebar">
      <vue-button
        @click="$router.push('/place/edit')"
        :aria-label="$t('common.add.place' /* Add a new Place */)"
        :title="$t('common.add.place' /* Add a new Place */)"
      >
        <vue-icon-add />
      </vue-button>
    </vue-mobile-menu>
  </vue-layout>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import VueGrid from '@/app/shared/components/VueGrid/VueGrid.vue';
import VueGridItem from '@/app/shared/components/VueGridItem/VueGridItem.vue';
import VueButton from '@/app/shared/components/VueButton/VueButton.vue';
import VueGridRow from '@/app/shared/components/VueGridRow/VueGridRow.vue';
import VueHeadline from '@/app/shared/components/VueHeadline/VueHeadline.vue';
import VueLayout from '@components/VueLayout/VueLayout.vue';
import VueMarkdown from '@components/VueMarkdown/VueMarkdown.vue';
import VueCard from '@components/VueCard/VueCard.vue';
import VueIconPencil from '@components/icons/VueIconPencil/VueIconPencil.vue';
import VueMobileMenu from '@components/VueMobileMenu/VueMobileMenu.vue';
import VueIconArrowLeft from '@components/icons/VueIconArrowLeft/VueIconArrowLeft.vue';
import VueIconAdd from '@components/icons/VueIconAdd/VueIconAdd.vue';
import VueBreadcrumb from '@components/VueBreadcrumb/VueBreadcrumb.vue';

export default {
  metaInfo: {
    title: 'Places',
  },
  components: {
    VueBreadcrumb,
    VueIconAdd,
    VueIconArrowLeft,
    VueMobileMenu,
    VueIconPencil,
    VueCard,
    VueMarkdown,
    VueLayout,
    VueGrid,
    VueGridItem,
    VueButton,
    VueGridRow,
    VueHeadline,
  },
  computed: {
    ...mapGetters('place', ['allPlaces']),
    ...mapGetters('story', ['currentStory']),
    ...mapGetters('app', ['menuPosition']),
    breadcrumbItems() {
      return [{ label: 'Stories', href: '/' }, { label: 'Places', href: '/places' }];
    },
  },
  methods: {
    ...mapActions('app', ['changeMenuPosition']),
  },
};
</script>

<style lang="scss" module>
@import '~@/app/shared/design-system';

.place {
  label {
    display: block;
    font-family: $font-family-headings;
    font-weight: $font-weight-bold;
    margin-top: $space-8;
  }

  .card {
    cursor: pointer;
    display: flex;
  }
}
</style>
