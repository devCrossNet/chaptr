<template>
  <div :class="$style.storylineView">
    <div>
      <vue-grid-row
        v-for="(row, i) in storylines"
        :key="i"
        :class="$style.row"
        :style="{width: zoom > 1 ? `${zoom * 125}%` : null}">

        <label>Storyline: {{ i + 1 }}</label>

        <vue-grid-item
          v-for="(col, j) in row"
          :key="j"
          :class="$style.col"
          :style="{
          minHeight: `${340 / storylines.length}px`,
          background: getStorylineColor(i, col)
        }" />
      </vue-grid-row>
    </div>

    <div :class="$style.zoom">
      <vue-button accent icon="plus" @click="zoom = zoom * 1.2" />
      <vue-button primary icon="minus" @click="zoom = zoom * 0.8" />
    </div>
  </div>
</template>

<script lang="ts">
  import { IEvent }                from '../../event/IEvent';
  import VueGrid                   from '../../shared/components/VueGrid/VueGrid';
  import VueGridRow                from '../../shared/components/VueGridRow/VueGridRow';
  import VueGridItem               from '../../shared/components/VueGridItem/VueGridItem';
  import VueButton                 from '../../shared/components/VueButton/VueButton';
  import { StorylineColorMapping } from '../StorylineColorMapping';

  export default {
    name:       'StorylineView',
    components: { VueButton, VueGridItem, VueGridRow, VueGrid },
    props:      {
      events: {
        required: true,
        type:     Array,
      },
    },
    computed:   {
      storylineCount() {
        const storylines: any = [];

        this.events.forEach((event: IEvent) => {
          if (storylines.indexOf(event.storyline) === -1) {
            storylines.push(event.storyline);
          }
        });

        return storylines.length;
      },
      storylines/* istanbul ignore next */() {
        let storylines: any = [];

        this.events.forEach((event: IEvent) => {
          const storyline: number[] = [];

          for (let i = 1; i <= this.storylineCount; i++) {
            if (event.storyline === i) {
              storyline[i - 1] = 1;
            } else {
              storyline[i - 1] = 0;
            }
          }

          storylines.push(storyline);
        });

        if (storylines.length === 0) {
          return [];
        }

        storylines = storylines[0].map((x: any, i: number): any => storylines.map((x: any) => x[i]));

        storylines = storylines.map((storyline: number[]) => {
          const max: number = storyline.length;
          let firstOne: number = -1;
          let lastOne: number = -1;

          for (let i = 0; i < max; i++) {
            if (firstOne === -1 && storyline[i] === 1) {
              firstOne = i;
            } else if (storyline[i] === 1) {
              lastOne = i;
            }
          }

          for (let i = 0; i < max; i++) {
            if (i > firstOne && i < lastOne) {
              storyline[i] = 1;
            }
          }

          return storyline;
        });

        return storylines;
      },
    },
    data() {
      return {
        zoom: 1,
      };
    },
    methods:    {
      getStorylineColor/* istanbul ignore next */(storylineIndex: number, hasColor: number) {
        if (hasColor === 0) {
          return 'transparent';
        }
        return StorylineColorMapping[storylineIndex];
      },
    },
  };
</script>

<style lang="scss" module>
  @import "../../shared/styles";

  .storylineView {
    display:    block;
    margin:     0 ($space-unit * -2) ($space-unit * 6) ($space-unit * -2);
    overflow:   scroll;
    overflow-y: hidden;
    padding:    0 $screen-phone-gutter $space-unit * 8 $screen-phone-gutter;
  }

  .row {
    border-top: 1px solid $divider-color;
    position:   relative;

    &:last-child {
      border-bottom: 1px solid $divider-color;
    }

    label {
      position: absolute;
      top:      $space-unit;
      left:     $space-unit;
    }
  }

  .col {
    min-width: auto;
    flex:      1;
  }

  .zoom {
    position: fixed;
    bottom:   $space-unit;
    left:     $space-unit;

    button {
      height:        $space-unit * 6;
      width:         $space-unit * 6;
      min-width:     auto;
      padding:       0;
      border-radius: 50%;
      margin-right:  $space-unit;
    }
  }
</style>
