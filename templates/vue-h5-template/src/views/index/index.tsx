import { defineComponent } from 'vue';
import logo from 'assets/images/logo.png';
import './index.less';

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
      <div class="index-wrap">
        <h1>{title}</h1>
        <p>welcome to index page.</p>
        <p>欢迎来到首页.</p>
        <img src={logo} alt="logo" />
      </div>
    );
  },
});
