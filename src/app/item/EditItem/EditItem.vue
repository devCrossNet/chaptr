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
            <vue-breadcrumb :items="breadcrumbItems"></vue-breadcrumb>
          </vue-grid-item>
        </vue-grid-row>

        <vue-grid-row>
          <vue-grid-item>
            <vue-image-gallery
              :as-data-url="false"
              :image-urls="item.images"
              @add-image-url="onAddImageUrl"
              @remove-image-url="onRemoveImageUrl"
            ></vue-image-gallery>
          </vue-grid-item>

          <vue-grid-item>
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
                <vue-textarea
                  name="notes"
                  id="notes"
                  :placeholder="$t('common.notes' /* Notes */)"
                  v-model="item.notes"
                />
              </vue-grid-item>
            </vue-grid-row>
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
import { getGUID } from '@vuesion/utils/dist/randomGenerator';
import { IItem } from '@/app/item/IItem';
import VueImageGallery from '@components/VueImageGallery/VueImageGallery.vue';
import VueBreadcrumb from '@components/VueBreadcrumb/VueBreadcrumb.vue';
import { Route } from 'vue-router';

export default {
  name: 'EditItem',
  $_veeValidate: {
    validator: 'new',
  },
  metaInfo: {
    title: 'Chaptr | Edit Item',
  },
  components: {
    VueBreadcrumb,
    VueImageGallery,
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
    breadcrumbItems() {
      return [
        { label: 'Stories', href: '/' },
        { label: 'Items', href: '/item' },
        { label: this.item.id === null ? 'Add a new Item' : 'Edit Item', href: '/' },
      ];
    },
  },
  methods: {
    ...mapActions('item', ['addItem', 'updateItem']),
    ...mapActions('app', ['changeMenuPosition']),
    load() {
      if (this.$route.params.id) {
        this.item = Object.assign({}, this.item, this.getItemById(this.$route.params.id));
      }
    },
    async save() {
      if (this.item.id === null) {
        this.item.id = getGUID();
        await this.addItem(this.item);
      } else {
        await this.updateItem(this.item);
      }
    },
    onAddImageUrl(imageUrl: string) {
      this.item.images.push(imageUrl);
      this.save();
      this.load();
    },
    onRemoveImageUrl(imageUrl: string) {
      this.item.images = this.item.images.filter((i: string) => i !== imageUrl);
      this.save();
      this.load();
    },
    onSubmit() {
      this.save();
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  data(): { item: IItem } {
    return {
      item: {
        id: null,
        name: '',
        images: [],
        type: '',
        location: '',
        notes: '',
      },
    };
  },
  mounted() {
    this.load();
  },
  async beforeRouteLeave(to: Route, from: Route, next: any) {
    await this.save();

    next();
  },
};
</script>

<style lang="scss" module>
@import '~@/app/shared/design-system';

.editItem {
}
</style>
