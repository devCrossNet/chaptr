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
            <vue-card>
              <template slot="header">
                {{ character.name + ` (${getAge(character)})` }}</template
              >

              <div>
                <label>{{ $t('common.characteristics' /* Characteristics */) }}</label>
                <vue-markdown>{{ character.characteristics }}</vue-markdown>
              </div>
              <div>
                <label>{{ $t('common.socialProfile' /* Social Profile */) }}</label>
                <vue-markdown>{{ character.socialProfile }}</vue-markdown>
              </div>
              <div>
                <label>{{ $t('common.psychologicalProfile' /* Psychological Profile */) }}</label>
                <vue-markdown>{{ character.psychologicalProfile }}</vue-markdown>
              </div>

              <vue-button slot="footer" color="secondary" as="router-link" :target="`/character/edit/${character.id}`">
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
import VueLayout from '@components/VueLayout/VueLayout.vue';
import VueHeadline from '@components/VueHeadline/VueHeadline.vue';
import VueIconArrowLeft from '@components/icons/VueIconArrowLeft/VueIconArrowLeft.vue';
import VueIconPencil from '@components/icons/VueIconPencil/VueIconPencil.vue';
import VueIconAdd from '@components/icons/VueIconAdd/VueIconAdd.vue';
import { ICharacter } from '@/app/character/ICharacter';
import VueMarkdown from '@components/VueMarkdown/VueMarkdown.vue';

export default {
  metaInfo: {
    title: 'Character',
  },
  components: {
    VueMarkdown,
    VueIconAdd,
    VueIconPencil,
    VueIconArrowLeft,
    VueHeadline,
    VueLayout,
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
    getAge /* istanbul ignore next */(character: ICharacter) {
      const birthday = character.birthday ? new Date(character.birthday) : new Date();
      return new Date(Date.now() - birthday.getTime()).getUTCFullYear() - 1970;
    },
  },
};
</script>

<style lang="scss" module>
@import '../../shared/design-system';

.character {
  label {
    display: block;
    font-family: $font-family-headings;
    font-weight: $font-weight-bold;
    margin-top: $space-8;
  }

  .card {
    flex: 1 1 50%;
    display: flex;
  }
}
</style>
