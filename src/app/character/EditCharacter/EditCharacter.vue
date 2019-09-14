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
            <vue-breadcrumb :items="breadcrumbItems"></vue-breadcrumb>
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-image-gallery
              :as-data-url="false"
              :image-urls="character.images"
              @add-image-url="onAddImageUrl"
              @remove-image-url="onRemoveImageUrl"
            ></vue-image-gallery>
          </vue-grid-item>

          <vue-grid-item>
            <vue-tab-group>
              <vue-tab-item :title="$t('common.appearance' /* Appearance */)">
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
                      :placeholder="$t('common.address' /* Address */)"
                      v-model="character.address"
                    />
                  </vue-grid-item>
                </vue-grid-row>
                <vue-grid-row>
                  <vue-grid-item>
                    <vue-input
                      name="eyeColor"
                      id="eyeColor"
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
                      :placeholder="$t('common.weight' /* Weight */)"
                      v-model="character.weight"
                    />
                  </vue-grid-item>
                </vue-grid-row>
                <vue-grid-row>
                  <vue-grid-item>
                    <vue-textarea
                      name="characteristics"
                      id="characteristics"
                      :placeholder="$t('common.characteristics' /* Characteristics */)"
                      v-model="character.characteristics"
                    />
                  </vue-grid-item>
                </vue-grid-row>
              </vue-tab-item>

              <vue-tab-item :title="$t('common.socialProfile' /* Social Profile */)">
                <vue-grid-row>
                  <vue-grid-item>
                    <vue-textarea
                      autofocus=""
                      name="socialProfile"
                      id="socialProfile"
                      :placeholder="$t('common.socialProfile' /* Social Profile */)"
                      v-model="character.socialProfile"
                    />
                  </vue-grid-item>
                </vue-grid-row>
              </vue-tab-item>

              <vue-tab-item :title="$t('common.psychologicalProfile' /* Psychological Profile */)">
                <vue-grid-row>
                  <vue-grid-item>
                    <vue-textarea
                      autofocus=""
                      name="psychologicalProfile"
                      id="psychologicalProfile"
                      :placeholder="$t('common.psychologicalProfile' /* Psychological Profile */)"
                      v-model="character.psychologicalProfile"
                    />
                  </vue-grid-item>
                </vue-grid-row>
              </vue-tab-item>
            </vue-tab-group>
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

    <vue-mobile-menu slot="sidebar"> </vue-mobile-menu>
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
import { getGUID } from '@vuesion/utils/dist/randomGenerator';
import VueDatePicker from '../../shared/components/VueDatePicker/VueDatePicker.vue';
import VueHeadline from '@components/VueHeadline/VueHeadline.vue';
import VueLayout from '@components/VueLayout/VueLayout.vue';
import VueMobileMenu from '@components/VueMobileMenu/VueMobileMenu.vue';
import VueIconArrowLeft from '@components/icons/VueIconArrowLeft/VueIconArrowLeft.vue';
import VueTabGroup from '@components/VueTabGroup/VueTabGroup.vue';
import VueTabItem from '@components/VueTabGroup/VueTabItem/VueTabItem.vue';
import VueTextarea from '@components/VueTextarea/VueTextarea.vue';
import VueImageGallery from '@components/VueImageGallery/VueImageGallery.vue';
import VueBreadcrumb from '@components/VueBreadcrumb/VueBreadcrumb.vue';

export default {
  name: 'EditCharacter',
  $_veeValidate: {
    validator: 'new',
  },
  metaInfo: {
    title: 'Chaptr | Edit Character',
  },
  components: {
    VueBreadcrumb,
    VueImageGallery,
    VueTextarea,
    VueTabItem,
    VueTabGroup,
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
    breadcrumbItems() {
      return [
        { label: 'Stories', href: '/' },
        { label: 'Characters', href: '/character' },
        { label: this.character.id === null ? 'Add a new Character' : 'Edit Character', href: '/' },
      ];
    },
  },
  methods: {
    ...mapActions('character', ['addCharacter', 'updateCharacter']),
    ...mapActions('app', ['changeMenuPosition']),
    load() {
      if (this.$route.params.id) {
        this.character = Object.assign({}, this.character, this.getCharacterById(this.$route.params.id));
      }
    },
    save() {
      if (this.character.id === null) {
        this.character.id = getGUID();
        this.addCharacter(this.character);
      } else {
        this.updateCharacter(this.character);
      }
    },
    onAddImageUrl(imageUrl: string) {
      this.character.images.push(imageUrl);
      this.save();
      this.load();
    },
    onRemoveImageUrl(imageUrl: string) {
      this.character.images = this.character.images.filter((i: string) => i !== imageUrl);
      this.save();
      this.load();
    },
    onSubmit() {
      this.save();
      this.goBack();
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
        images: [],
        birthday: '',
        address: '',
        eyeColor: '',
        hairColor: '',
        skinColor: '',
        height: '',
        weight: '',
        characteristics: '',
        socialProfile: '',
        psychologicalProfile: '',
      },
    };
  },
  mounted() {
    this.load();
  },
};
</script>

<style lang="scss" module>
@import '../../shared/design-system';

.editCharacter {
  textarea {
    min-height: 500px;
  }
}
</style>
