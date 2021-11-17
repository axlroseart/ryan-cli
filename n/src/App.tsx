import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import 'assets/styles/reset.css';

export default defineComponent({
  setup() {
    return () => <RouterView />;
  },
});
