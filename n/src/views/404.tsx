import { defineComponent } from 'vue';
import logo from 'assets/images/logo.png';

export const PageNotFound = defineComponent({
  setup() {
    return () => (
      <>
        <h1>404</h1>
        <p>page not found.</p>
        <img src={logo}></img>
      </>
    );
  },
});
