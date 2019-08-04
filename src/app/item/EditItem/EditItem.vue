<template>
  <vue-layout @position="changeMenuPosition" :position="menuPosition">
    <form :class="$style.editItem" @submit.prevent="onSubmit">
      <vue-grid>
        <vue-grid-row>
          <vue-grid-item>
            <vue-headline level="1" v-if="item.id === null">{{
              $t('common.add.item' /* Add a new Item */)
            }}</vue-headline>
            <vue-headline level="1" v-if="item.id !== null">{{ $t('common.edit.item' /* Edit Item */) }}</vue-headline>
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
              v-model="item.name"
            />
          </vue-grid-item>
        </vue-grid-row>
        <vue-grid-row>
          <vue-grid-item>
            <vue-input
              name="type"
              id="type"
              :placeholder="$t('common.type' /* Type */)"
              validation="required"
              v-model="item.type"
            />
          </vue-grid-item>
        </vue-grid-row>
        <vue-grid-row>
          <vue-grid-item>
            <vue-input
              name="location"
              id="location"
              :placeholder="$t('common.location' /* Location */)"
              v-model="item.location"
            />
          </vue-grid-item>
        </vue-grid-row>
        <vue-grid-row>
          <vue-grid-item>
            <vue-textarea name="notes" id="notes" :placeholder="$t('common.notes' /* Notes */)" v-model="item.notes" />
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
import VueGrid from '@/app/shared/components/VueGrid/VueGrid.vue';
import VueGridItem from '@/app/shared/components/VueGridItem/VueGridItem.vue';
import VueButton from '@/app/shared/components/VueButton/VueButton.vue';
import VueGridRow from '@/app/shared/components/VueGridRow/VueGridRow.vue';
import VueHeadline from '@/app/shared/components/VueHeadline/VueHeadline.vue';
import VueLayout from '@components/VueLayout/VueLayout.vue';
import VueMobileMenu from '@components/VueMobileMenu/VueMobileMenu.vue';
import VueIconArrowLeft from '@components/icons/VueIconArrowLeft/VueIconArrowLeft.vue';
import VueInput from '@components/VueInput/VueInput.vue';
import VueTextarea from '@components/VueTextarea/VueTextarea.vue';
import { createGUID } from '@shared/utils/misc';
import { IItem } from '@/app/item/IItem';

export default {
  name: 'EditItem',
  $_veeValidate: {
    validator: 'new',
  },
  metaInfo: {
    title: 'Chaptr | Edit Item',
  },
  components: {
    VueTextarea,
    VueInput,
    VueIconArrowLeft,
    VueMobileMenu,
    VueLayout,
    VueGrid,
    VueGridItem,
    VueButton,
    VueGridRow,
    VueHeadline,
  },
  computed: {
    ...mapGetters('item', ['getItemById']),
    ...mapGetters('app', ['menuPosition']),
  },
  methods: {
    ...mapActions('item', ['addItem', 'updateItem']),
    ...mapActions('app', ['changeMenuPosition']),
    onSubmit() {
      if (this.item.id === null) {
        this.item.id = createGUID();
        this.addItem(this.item);
      } else {
        this.updateItem(this.item);
      }

      this.$router.push(`/item`);
    },
    goBack() {
      this.$router.push('/item');
    },
  },
  data(): { item: IItem } {
    return {
      item: {
        id: null,
        name: '',
        type: '',
        location: '',
        notes: '',
      },
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.item = this.getItemById(this.$route.params.id);
    }
  },
};
</script>

<style lang="scss" module>
@import '~@/app/shared/design-system';

.editItem {
  margin-top: $nav-bar-height;
  min-height: 500px;
}
</style>
