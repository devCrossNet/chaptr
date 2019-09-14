<template>
  <div :class="$style.vueImageGallery">
    <vue-carousel :images="images" @remove="$emit('remove-image-url', $event)" :min-height="1024"></vue-carousel>
    <form @submit.prevent="onSubmit">
      <vue-grid-row>
        <vue-grid-item>
          <vue-input
            id="url"
            name="url"
            placeholder="Image url"
            validation="url"
            v-model="url"
            error-message="Please paste a valid Url"
          ></vue-input>
        </vue-grid-item>
        <vue-grid-item :class="$style.button">
          <vue-button color="secondary" :disabled="url === ''" :loading="loading">
            <vue-icon-save></vue-icon-save> Add Image
          </vue-button>
        </vue-grid-item>
      </vue-grid-row>
    </form>
  </div>
</template>

<script lang="ts">
import VueCarousel from '@components/VueCarousel/VueCarousel.vue';
import VueInput from '@components/VueInput/VueInput.vue';
import VueGridRow from '@components/VueGridRow/VueGridRow.vue';
import VueGridItem from '@components/VueGridItem/VueGridItem.vue';
import VueButton from '@components/VueButton/VueButton.vue';
import VueIconSave from '@components/icons/VueIconSave/VueIconSave.vue';
import { ImageToDataUrl } from '@components/VueImageGallery/ImageToDataUrl';
export default {
  name: 'VueImageGallery',
  components: { VueIconSave, VueButton, VueGridItem, VueGridRow, VueInput, VueCarousel },
  props: {
    imageUrls: {
      type: Array,
      required: true,
    },
    asDataUrl: { type: Boolean, default: true },
  },
  data(): any {
    return {
      url: '',
      loading: false,
    };
  },
  computed: {
    images() {
      return this.imageUrls.map((url: string) => ({
        alt: '',
        copyright: '',
        url,
      }));
    },
  },
  methods: {
    async onSubmit() {
      if (this.asDataUrl) {
        this.loading = true;
        try {
          const dataUri = await ImageToDataUrl(this.url);
          this.$emit('add-image-url', dataUri);
          this.loading = false;
        } catch (e) {
          console.log(e);
        }
      } else {
        this.$emit('add-image-url', this.url);
      }

      this.url = '';
    },
  },
};
</script>

<style lang="scss" module>
@import '~@/app/shared/design-system';

.vueImageGallery {
  form {
    margin-top: $space-24;
  }

  .button {
    flex: 0 1 auto;

    button {
      margin: 0;
    }
  }
}
</style>
