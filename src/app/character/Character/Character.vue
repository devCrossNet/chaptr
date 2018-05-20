<template>
  <div :class="$style.character">
    <vue-grid>
      <vue-grid-row>
        <vue-grid-item fill>
          <h1>{{ $t('common.characters' /* Characters */) }}</h1>
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row v-for="character in allCharacters" :key="character.id">
        <vue-grid-item fill>
          <vue-panel
            :class="$style.characterPanel">
            <vue-panel-header :title="character.name" />
            <vue-panel-body>
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
            </vue-panel-body>
            <vue-panel-footer>
              <vue-button
                accent
                @click="$router.push(`/character/edit/${character.id}`)" icon="edit">
                {{ $t('common.edit' /* Edit */) }}
              </vue-button>
            </vue-panel-footer>
          </vue-panel>
        </vue-grid-item>
      </vue-grid-row>
    </vue-grid>

    <vue-mobile-menu>
      <vue-button
        warn
        icon="arrow-left"
        :aria-label="$t('common.back' /* Back */)"
        @click="$router.push(`/story/${currentStory}`)" />

      <vue-button
        primary
        icon="user"
        :aria-label="$t('common.add.character' /* Add a new Character */)"
        @click="$router.push('/character/edit')" />
    </vue-mobile-menu>
  </div>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex';
  import VueGrid        from '../../shared/components/VueGrid/VueGrid';
  import VueGridItem    from '../../shared/components/VueGridItem/VueGridItem';
  import VueButton      from '../../shared/components/VueButton/VueButton';
  import VueGridRow     from '../../shared/components/VueGridRow/VueGridRow';
  import VueMobileMenu  from '../../shared/components/VueMobileMenu/VueMobileMenu';
  import VuePanel       from '../../shared/components/VuePanel/VuePanel';
  import VuePanelHeader from '../../shared/components/VuePanel/VuePanelHeader/VuePanelHeader';
  import VuePanelBody   from '../../shared/components/VuePanel/VuePanelBody/VuePanelBody';
  import VuePanelFooter from '../../shared/components/VuePanel/VuePanelFooter/VuePanelFooter';

  export default {
    metaInfo:   {
      title: 'Character',
    },
    components: {
      VuePanelFooter,
      VuePanelBody,
      VuePanelHeader,
      VuePanel,
      VueMobileMenu,
      VueGrid,
      VueGridItem,
      VueButton,
      VueGridRow,
    },
    computed:   {
      ...mapGetters('character', ['allCharacters']),
      ...mapGetters('story', ['currentStory']),
    },
  };
</script>


<style lang="scss" module>
  @import "../../shared/styles";

  .character {
  }

  .characterPanel {
    cursor:        pointer;
    margin-bottom: $space-unit * 2;

    label {
      display:     block;
      font-family: $font-family-headings;
      font-weight: 400;
      margin-top:  $space-unit;
    }
  }
</style>
