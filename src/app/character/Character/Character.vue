<template>
  <div :class="$style.character">
    <vue-layout @position="changeMenuPosition" :position="menuPosition">
      <vue-grid>
        <vue-grid-row>
          <vue-grid-item fill>
            <vue-headline level="1">{{ $t('common.characters' /* Characters */) }}</vue-headline>
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item v-for="character in allCharacters" :key="character.id" :class="$style.card">
            <vue-card :class="$style.characterPanel">
              <vue-card-header :title="character.name" />
              <vue-card-body>
                <div>
                  <label>{{ $t('common.birthday' /* Birthday */) }}</label>
                  {{ $d(character.birthday ? new Date(character.birthday) : new Date()) }}
                </div>
                <div>
                  <label>{{ $t('common.address' /* Address */) }}</label>
                  {{ character.address }}
                </div>
                <div>
                  <label>{{ $t('common.skinColor' /* Skin Color */) }}</label>
                  {{ character.skinColor }}
                </div>
                <div>
                  <label>{{ $t('common.height' /* Height */) }}</label>
                  {{ character.height }}
                </div>
              </vue-card-body>
              <vue-card-footer>
                <vue-button color="secondary" as="router-link" :target="`/character/edit/${character.id}`">
                  <vue-icon-pencil /> &nbsp; {{ $t('common.edit' /* Edit */) }}
                </vue-button>
              </vue-card-footer>
            </vue-card>
          </vue-grid-item>
        </vue-grid-row>
      </vue-grid>

      <vue-mobile-menu slot="sidebar">
        <vue-button :aria-label="$t('common.back' /* Back */)" @click="$router.push(`/story/${currentStory}`)">
          <vue-icon-arrow-left />
        </vue-button>

        <vue-button
          :aria-label="$t('common.add.character' /* Add a new Character */)"
          @click="$router.push('/character/edit')"
        >
          <vue-icon-add />
        </vue-button>
      </vue-mobile-menu>
    </vue-layout>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import VueGrid from '../../shared/components/VueGrid/VueGrid.vue';
import VueGridItem from '../../shared/components/VueGridItem/VueGridItem.vue';
import VueButton from '../../shared/components/VueButton/VueButton.vue';
import VueGridRow from '../../shared/components/VueGridRow/VueGridRow.vue';
import VueMobileMenu from '../../shared/components/VueMobileMenu/VueMobileMenu.vue';
import VueCard from '../../shared/components/VueCard/VueCard.vue';
import VueCardHeader from '../../shared/components/VueCard/VueCardHeader/VueCardHeader.vue';
import VueCardBody from '../../shared/components/VueCard/VueCardBody/VueCardBody.vue';
import VueCardFooter from '../../shared/components/VueCard/VueCardFooter/VueCardFooter.vue';
import VueLayout from '@components/VueLayout/VueLayout.vue';
import VueHeadline from '@components/VueHeadline/VueHeadline.vue';
import VueIconArrowLeft from '@components/icons/VueIconArrowLeft/VueIconArrowLeft.vue';
import VueIconPencil from '@components/icons/VueIconPencil/VueIconPencil.vue';
import VueIconAdd from '@components/icons/VueIconAdd/VueIconAdd.vue';

export default {
  metaInfo: {
    title: 'Character',
  },
  components: {
    VueIconAdd,
    VueIconPencil,
    VueIconArrowLeft,
    VueHeadline,
    VueLayout,
    VueCardFooter,
    VueCardBody,
    VueCardHeader,
    VueCard,
    VueMobileMenu,
    VueGrid,
    VueGridItem,
    VueButton,
    VueGridRow,
  },
  computed: {
    ...mapGetters('character', ['allCharacters']),
    ...mapGetters('story', ['currentStory']),
    ...mapGetters('app', ['menuPosition']),
  },
  methods: {
    ...mapActions('app', ['changeMenuPosition']),
  },
};
</script>

<style lang="scss" module>
@import '../../shared/design-system';

.character {
}

.characterPanel {
  label {
    display: block;
    font-family: $font-family-headings;
    font-weight: 400;
    margin-top: $space-unit;
  }
}

.card {
  flex: 0 1 50%;
}
</style>
