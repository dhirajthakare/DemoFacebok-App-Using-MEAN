import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
declare const module: NodeModule & { hot?: { accept: () => void; dispose: (callback: () => void) => void } };
if (environment.production) {
  enableProdMode();
} else if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    const appRoot = document.querySelector('app-root');
    if (appRoot) {
      appRoot.innerHTML = '';
    }
  });
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
