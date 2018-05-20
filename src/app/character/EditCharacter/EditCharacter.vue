<template>
  <form :class="$style.editCharacter" @submit.prevent="onSubmit">
    <vue-grid>
      <vue-grid-row>
        <vue-grid-item>
          <h1 v-if="character.id === null">{{ $t('common.add.character' /* Add a new Character */) }}</h1>
          <h1 v-if="character.id !== null">{{ $t('common.edit.character' /* Edit Character */) }}</h1>
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-input
            name="name"
            id="name"
            required
            :placeholder="$t('common.name' /* Name */)"
            validation="required"
            v-model="character.name" />
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-date-picker
            :min-date="new Date('1950-01-01')"
            :current-date="character.birthday ? new Date(character.birthday) : new Date()"
            :first-day-of-week="1"
            :placeholder="$t('common.birthday' /* Birthday */)"
            @change="character.birthday = $event.toUTCString()" />
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
            v-model="character.address" />
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-input
            name="eyeColor"
            id="eyeColor"
            required
            :placeholder="$t('common.eyeColor' /* Eye Color */)"
            v-model="character.eyeColor" />
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-input
            name="hairColor"
            id="hairColor"
            required
            :placeholder="$t('common.hairColor' /* Hair Color */)"
            v-model="character.hairColor" />
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-input
            name="skinColor"
            id="skinColor"
            required
            :placeholder="$t('common.skinColor' /* Skin Color */)"
            v-model="character.skinColor" />
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-input
            name="height"
            id="height"
            required
            :placeholder="$t('common.height' /* Height */)"
            v-model="character.height" />
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-input
            name="weight"
            id="weight"
            required
            :placeholder="$t('common.weight' /* Weight */)"
            v-model="character.weight" />
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-button accent>
            {{ $t('common.save' /* Save */) }}
          </vue-button>

          <vue-button @click="$router.push('/character')">
            {{ $t('common.cancel' /* Cancel */) }}
          </vue-button>
        </vue-grid-item>
      </vue-grid-row>
    </vue-grid>
  </form>
</template>

<script lang="ts">
  import { mapActions, mapGetters } from 'vuex';
  import VueGrid                    from '../../shared/components/VueGrid/VueGrid';
  import VueGridItem                from '../../shared/components/VueGridItem/VueGridItem';
  import VueButton                  from '../../shared/components/VueButton/VueButton';
  import VueGridRow                 from '../../shared/components/VueGridRow/VueGridRow';
  import { ICharacter }             from '../ICharacter';
  import VueInput                   from '../../shared/components/VueInput/VueInput';
  import VueSelect                  from '../../shared/components/VueSelect/VueSelect';
  import { createGUID }             from '../../shared/utils/misc';
  import { addNotification }        from '../../shared/components/VueNotificationStack/utils';
  import VueDatePicker              from '../../shared/components/VueDatePicker/VueDatePicker';

  export default {
    name:          'EditCharacter',
    $_veeValidate: {
      validator: 'new',
    },
    metaInfo:      {
      title: 'Chaptr | Edit Character',
    },
    components:    {
      VueDatePicker,
      VueSelect,
      VueInput,
      VueGrid,
      VueGridItem,
      VueButton,
      VueGridRow,
    },
    computed:      {
      ...mapGetters('character', ['getCharacterById']),
    },
    methods:       {
      ...mapActions('character', [
        'addCharacter',
        'updateCharacter',
      ]),
      onSubmit() {
        if (this.character.id === null) {
          this.character.id = createGUID();
          this.addCharacter(this.character);
          addNotification({
                            title: this.$t('notification.character.add.title' /* Character added! */),
                            text:  this.$t('notification.character.add.text' /* Your Character has been saved! */),
                          });
        } else {
          this.updateCharacter(this.character);
          addNotification({
                            title: this.$t('notification.character.update.title' /* Character updated! */),
                            text:  this.$t('notification.character.update.text' /* Your Character has been updated! */),
                          });
        }

        this.$router.push(`/character`);
      },
    },
    data(): { character: ICharacter } {
      return {
        character: {
          id:        null,
          name:      '',
          birthday:  '',
          address:   '',
          eyeColor:  '',
          hairColor: '',
          skinColor: '',
          height:    '',
          weight:    '',
          vitae:     [],
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
  @import "../../shared/styles";

  .editCharacter {
  }
</style>
