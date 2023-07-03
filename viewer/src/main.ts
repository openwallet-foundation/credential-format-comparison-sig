import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// load the structure in a global variable. Maybe not the best way to do it.
fetch('structure.json')
  .then((res) => res.json())
  .catch((err) =>
    alert(
      'Error loading structure.json. Please generate it before running the viewer.'
    )
  )
  .then((res) => ((window as any)['structure'] = res))
  .then(() =>
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err))
  );
