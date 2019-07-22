import { create } from '@storybook/theming';
import theme from './_theme.scss';

export default create({
  ...theme,
  brandTitle: 'Chaptr Storybook',
  brandUrl: 'https://chaptr.herokuapp.com',
  brandImage: 'https://chaptr.herokuapp.com/logo.png',
});
