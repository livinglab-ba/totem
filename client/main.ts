import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';

// Loading the CSS file
import './styles.css';

platformBrowserDynamic().bootstrapModule(AppModule);