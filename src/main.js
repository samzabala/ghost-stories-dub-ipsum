import { createApp } from 'vue';

import App from './App.vue';
import AppInfo from './components/AppInfo.vue';
import FormControl from './components/FormControl.vue';
import OutputText from './components/OutputText.vue';

const app = createApp(App);

app.component('app-info', AppInfo);
app.component('form-control', FormControl);
app.component('output-text', OutputText);

app.mount('#app');
