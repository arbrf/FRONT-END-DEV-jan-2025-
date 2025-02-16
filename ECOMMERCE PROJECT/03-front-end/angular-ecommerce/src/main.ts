
import { AppComponent } from './app/app.component';


  import { bootstrapApplication } from '@angular/platform-browser';
  import { provideHttpClient } from '@angular/common/http';  // ✅ Import this

  bootstrapApplication(AppComponent, {
    providers: [provideHttpClient()]  // ✅ Add this
  }).catch(err => console.error(err));
  
