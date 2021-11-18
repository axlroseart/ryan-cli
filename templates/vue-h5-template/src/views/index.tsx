import { defineComponent } from 'vue';

import logo from 'assets/images/logo.png';

export const Index = defineComponent({
  setup() {
    console.log('==> setup');
  },
  data() {
    return {
      title: 'A Title Here.',
    };
  },
  render() {
    const { title } = this;
    return (
      <>
        <h1>{title}</h1>
        <p>welcome to index page.</p>
        <img src={logo} alt="logo" />
      </>
    );
  },
});
