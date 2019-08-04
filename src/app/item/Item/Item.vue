<template>
  <div :class="$style.item">
    <vue-layout @position="changeMenuPosition" :position="menuPosition">
      <vue-grid>
        <vue-grid-row>
          <vue-grid-item fill>
            <vue-headline level="1">
              {{ $t('common.items' /* Items */) }}
            </vue-headline>
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item fill v-for="item in allItems" :key="item.id" :class="$style.card">
            <vue-card>
              <template slot="header">
                {{ item.name }}
              </template>

              <vue-grid-row>
                <vue-grid-item>
                  <div>
                    <label>{{ $t('common.type' /* Type */) }}</label>
                    <div>{{ item.type }}</div>
                  </div>
                  <div>
                    <label>{{ $t('common.location' /* Location */) }}</label>
                    <div>{{ item.location }}</div>
                  </div>
                </vue-grid-item>

                <vue-grid-item>
                  <div>
                    <label>{{ $t('common.notes' /* Notes */) }}</label>
                    <vue-markdown>{{ item.notes }}</vue-markdown>
                  </div>
                </vue-grid-item>
              </vue-grid-row>
              <vue-button slot="footer" color="secondary" as="router-link" :target="`/item/edit/${item.id}`">
                <vue-icon-pencil />
              </vue-button>
            </vue-card>
          </vue-grid-item>
        </vue-grid-row>
      </vue-grid>

      <vue-mobile-menu slot="sidebar">
        <vue-button :aria-label="$t('common.back' /* Back */)" @click="$router.push(`/story/${currentStory}`)">
          <vue-icon-arrow-left />
        </vue-button>

        <vue-button :aria-label="$t('common.add.item' /* Add a new Item */)" @click="$router.push('/item/edit')">
          <vue-icon-add />
        </vue-button>
      </vue-mobile-menu>
    </vue-layout>
  </div>
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

export default {
  metaInfo: {
    title: 'Items',
  },
  components: {
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
    ...mapGetters('item', ['allItems']),
    ...mapGetters('story', ['currentStory']),
    ...mapGetters('app', ['menuPosition']),
  },
  methods: {
    ...mapActions('app', ['changeMenuPosition']),
  },
};
</script>

<style lang="scss" module>
@import '~@/app/shared/design-system';

.item {
  label {
    display: block;
    font-family: $font-family-headings;
    font-weight: $font-weight-bold;
    margin-top: $space-8;
  }

  .card {
    display: flex;
  }
}
</style>
