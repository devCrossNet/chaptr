<template>
  <vue-layout @position="changeMenuPosition" :position="menuPosition">
    <form :class="$style.editCharacter" @submit.prevent="onSubmit">
      <vue-grid>
        <vue-grid-row>
          <vue-grid-item>
            <vue-headline level="1" v-if="character.id === null">{{
              $t('common.add.character' /* Add a new Character */)
            }}</vue-headline>
            <vue-headline level="1" v-if="character.id !== null">{{
              $t('common.edit.character' /* Edit Character */)
            }}</vue-headline>
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-input
              autofocus=""
              name="name"
              id="name"
              required
              :placeholder="$t('common.name' /* Name */)"
              validation="required"
              v-model="character.name"
            />
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-date-picker
              name="birthday"
              id="birthday"
              :min-date="new Date('1950-01-01')"
              :current-date="character.birthday ? new Date(character.birthday) : new Date()"
              :first-day-of-week="1"
              :placeholder="$t('common.birthday' /* Birthday */)"
              @change="character.birthday = $event.toUTCString()"
            />
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-input
              name="address"
              id="address"
              required
              :placeholder="$t('common.address' /* Address */)"
              validation="required"
              v-model="character.address"
            />
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-input
              name="eyeColor"
              id="eyeColor"
              required
              :placeholder="$t('common.eyeColor' /* Eye Color */)"
              v-model="character.eyeColor"
            />
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-input
              name="hairColor"
              id="hairColor"
              required
              :placeholder="$t('common.hairColor' /* Hair Color */)"
              v-model="character.hairColor"
            />
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-input
              name="skinColor"
              id="skinColor"
              required
              :placeholder="$t('common.skinColor' /* Skin Color */)"
              v-model="character.skinColor"
            />
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-input
              name="height"
              id="height"
              required
              :placeholder="$t('common.height' /* Height */)"
              v-model="character.height"
            />
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-input
              name="weight"
              id="weight"
              required
              :placeholder="$t('common.weight' /* Weight */)"
              v-model="character.weight"
            />
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-button color="primary">
              {{ $t('common.save' /* Save */) }}
            </vue-button>

            <vue-button ghost @click="goBack">
              {{ $t('common.cancel' /* Cancel */) }}
            </vue-button>
          </vue-grid-item>
        </vue-grid-row>
      </vue-grid>
    </form>

    <vue-mobile-menu slot="sidebar">
      <vue-button @click="goBack">
        <vue-icon-arrow-left />
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
import { ICharacter } from '../ICharacter';
import VueInput from '../../shared/components/VueInput/VueInput.vue';
import VueSelect from '../../shared/components/VueSelect/VueSelect.vue';
import { createGUID } from '@shared/utils/misc';
import VueDatePicker from '../../shared/components/VueDatePicker/VueDatePicker.vue';
import VueHeadline from '@components/VueHeadline/VueHeadline.vue';
import VueLayout from '@components/VueLayout/VueLayout.vue';
import VueMobileMenu from '@components/VueMobileMenu/VueMobileMenu.vue';
import VueIconArrowLeft from '@components/icons/VueIconArrowLeft/VueIconArrowLeft.vue';

export default {
  name: 'EditCharacter',
  $_veeValidate: {
    validator: 'new',
  },
  metaInfo: {
    title: 'Chaptr | Edit Character',
  },
  components: {
    VueIconArrowLeft,
    VueMobileMenu,
    VueLayout,
    VueHeadline,
    VueDatePicker,
    VueSelect,
    VueInput,
    VueGrid,
    VueGridItem,
    VueButton,
    VueGridRow,
  },
  computed: {
    ...mapGetters('character', ['getCharacterById']),
    ...mapGetters('app', ['menuPosition']),
  },
  methods: {
    ...mapActions('character', ['addCharacter', 'updateCharacter']),
    ...mapActions('app', ['changeMenuPosition']),
    onSubmit() {
      if (this.character.id === null) {
        this.character.id = createGUID();
        this.addCharacter(this.character);
      } else {
        this.updateCharacter(this.character);
      }

      this.$router.push(`/character`);
    },
    goBack() {
      this.$router.push('/character');
    },
  },
  data(): { character: ICharacter } {
    return {
      character: {
        id: null,
        name: '',
        birthday: '',
        address: '',
        eyeColor: '',
        hairColor: '',
        skinColor: '',
        height: '',
        weight: '',
        vitae: [],
      },
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.character = this.getCharacterById(this.$route.params.id);
    }
  },
};
</script>

<style lang="scss" module>
@import '../../shared/design-system';

.editCharacter {
}
</style>
