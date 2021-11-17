import { defineComponent } from 'vue';

import logo from 'assets/images/logo.png';

export const Index = defineComponent({
  props: {
    title: String,
  },
  setup(props) {
    console.log(props);
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
