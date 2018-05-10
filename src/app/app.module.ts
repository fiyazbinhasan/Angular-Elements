import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { AppComponent } from './app.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { createCustomElement } from '@angular/elements';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, SubscriberComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  entryComponents: [SubscriberComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const subscriber = createCustomElement(SubscriberComponent, {
      injector
    });
    customElements.define('app-subscriber', subscriber);
  }

  ngDoBootstrap() {}
}
