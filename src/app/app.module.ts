import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { MenuIconComponent } from './components/icons/menu-icon/menu-icon.component';
import { OriginIconComponent } from './components/icons/origin-icon/origin-icon.component';
import { SearchIconComponent } from './components/icons/search-icon/search-icon.component';
import { DestinyIconComponent } from './components/icons/destiny-icon/destiny-icon.component';
import { SwapIconComponent } from './components/icons/swap-icon/swap-icon.component';
import { LeftIconComponent } from './components/icons/left-icon/left-icon.component';
import { LomadaIconComponent } from './components/icons/lomada-icon/lomada-icon.component';
import { SignalIconComponent } from './components/icons/signal-icon/signal-icon.component';
import { BookIconComponent } from './components/icons/book-icon/book-icon.component';
import { EditIconComponent } from './components/icons/edit-icon/edit-icon.component';
import { GearIconComponent } from './components/icons/gear-icon/gear-icon.component';

@NgModule({
  declarations: [AppComponent, MenuIconComponent, OriginIconComponent, SearchIconComponent, DestinyIconComponent, SwapIconComponent, LeftIconComponent, LomadaIconComponent, SignalIconComponent, BookIconComponent, EditIconComponent, GearIconComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
