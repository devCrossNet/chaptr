import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueImageGallery from './VueImageGallery.vue';

const story = storiesOf('Organisms|ImageGallery', module) as any;

story.add(
  'Default',
  withInfo({})(() => ({
    components: { VueImageGallery },
    data(): any {
      return {
        imageUrls: [
          'https://i.pinimg.com/736x/d1/cc/fa/d1ccfafb30b5667087c9192befdc0b5a.jpg',
          'https://66.media.tumblr.com/8c5f95b7d1d6c6eab80aa00da2ce4009/tumblr_odgpbnPHtQ1qkbpm3o1_1280.jpg',
          'https://i.pinimg.com/564x/4d/17/1a/4d171a57f7260da7822140def9865dca.jpg',
        ],
      };
    },
    template: `<vue-image-gallery :as-data-url="false" :image-urls="imageUrls" @add-image-url="onAddImageUrl" @remove-image-url="onRemoveImageUrl"></vue-image-gallery>`,
    methods: {
      onAddImageUrl(imageUrl: string) {
        this.imageUrls.push(imageUrl);
      },
      onRemoveImageUrl(imageUrl: string) {
        this.imageUrls = this.imageUrls.filter((i: string) => i !== imageUrl);
      },
    },
  })),
);
