<template>
  <form :class="$style.editStory" @submit.prevent="onSubmit">
    <vue-grid>
      <vue-grid-row>
        <vue-grid-item>
          <h1 v-if="story.id === null">{{ $t('common.add.story' /* Add a new Story */) }}</h1>
          <h1 v-if="story.id !== null">{{ $t('common.edit.story' /* Edit Story */) }}</h1>


        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-input
            name="title"
            id="title"
            required
            :placeholder="$t('common.title' /* Title */)"
            validation="required"
            v-model="story.title" />
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <label>{{ $t('common.color' /* Color */) }}</label>
          <vue-select
            name="color"
            id="color"
            v-model="story.color"
            :options="colorOptions"
            validation="required"
            required />
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-textarea
            name="abstract"
            id="abstract"
            required
            :placeholder="$t('common.abstract' /* Abstract */)"
            validation="required"
            v-model="story.abstract" />
        </vue-grid-item>
      </vue-grid-row>

      <vue-grid-row>
        <vue-grid-item>
          <vue-button accent>
            {{ $t('common.save' /* Save */) }}
          </vue-button>

          <vue-button @click="$router.push('/')">
            {{ $t('common.cancel' /* Cancel */) }}
          </vue-button>
        </vue-grid-item>
      </vue-grid-row>
    </vue-grid>
  </form>
</template>

<script lang="ts">
  import { mapActions, mapGetters }      from 'vuex';
  import VueGrid                         from '../../shared/components/VueGrid/VueGrid';
  import VueGridItem                     from '../../shared/components/VueGridItem/VueGridItem';
  import VueButton                       from '../../shared/components/VueButton/VueButton';
  import VueGridRow                      from '../../shared/components/VueGridRow/VueGridRow';
  import { IStory }                      from '../IStory';
  import VueInput                        from '../../shared/components/VueInput/VueInput';
  import VueSelect, { IVueSelectOption } from '../../shared/components/VueSelect/VueSelect';
  import { createGUID }                  from '../../shared/utils/misc';
  import { addNotification }             from '../../shared/components/VueNotificationStack/utils';
  import VueTextarea                     from '../../shared/components/VueTextarea/VueTextarea';

  export default {
    name:          'EditStory',
    $_veeValidate: {
      validator: 'new',
    },
    metaInfo:      {
      title: 'Chaptr | Edit Story',
    },
    components:    {
      VueTextarea,
      VueSelect,
      VueInput,
      VueGrid,
      VueGridItem,
      VueButton,
      VueGridRow,
    },
    computed:      {
      ...mapGetters('story', ['getStoryById']),
    },
    methods:       {
      ...mapActions('story', [
        'addStory',
        'updateStory',
      ]),
      onSubmit() {
        if (this.story.id === null) {
          this.story.id = createGUID();
          this.addStory(this.story);
          addNotification({
                            title: this.$t('notification.story.add.title' /* Story added! */),
                            text:  this.$t('notification.story.add.text' /* Your Story has been saved! */),
                          });
        } else {
          this.updateStory(this.story);
          addNotification({
                            title: this.$t('notification.story.update.title' /* Story updated! */),
                            text:  this.$t('notification.story.update.text' /* Your Story has been updated! */),
                          });
        }

        this.$router.push(`/story/${this.story.id}`);
      },
    },
    data(): { story: IStory, colorOptions: IVueSelectOption[] } {
      return {
        story:        {
          id:       null,
          title:    '',
          color:    '',
          abstract: '',
        },
        colorOptions: [
          {
            label: this.$t('common.choose.color' /* Choose a Color */),
            value: '',
          },
          {
            label: this.$t('common.colors.red' /* Red */),
            value: '#D23927',
          },
          {
            label: this.$t('common.colors.green' /* Green */),
            value: '#BBD454',
          },
          {
            label: this.$t('common.colors.blue' /* Blue */),
            value: '#0089BA',
          },
        ],
      };
    },
    mounted() {
      if (this.$route.params.id) {
        this.story = this.getStoryById(this.$route.params.id);
      }
    },
  };
</script>


<style lang="scss" module>
  @import "../../shared/styles";

  .editStory {
  }
</style>
