import './polyfills';

//Angular
import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpModule }       from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { enableProdMode }   from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

//Router
import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './pages/app/app.component';
import { ConsumptionComponent }     from './pages/sensor_data/consumption/consumption.component';
import { RealFlameDetectionComponent }     from './pages/sensor_data/flame_detection/flame-detection-real.component';
import { VirtualFlameDetectionComponent }     from './pages/sensor_data/flame_detection/flame-detection-virtual.component';
import { RealHumidityComponent }     from './pages/sensor_data/humidity/humidity-real.component';
import { VirtualHumidityComponent }     from './pages/sensor_data/humidity/humidity-virtual.component';
import { RealTemperatureComponent }     from './pages/sensor_data/temperature/temperature-real.component';
import { VirtualTemperatureComponent }     from './pages/sensor_data/temperature/temperature-virtual.component';
import { WebCamComponent }     from './pages/sensor_data/webcam_totem/webcam.component';

//Internationalization
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

//Services
import { ListenerService } from './pages/sensor_data/listener.service';
import { LanguageComponent } from './pages/components/language/language.component';
import { InternationalizationService } from './pages/components/internacionalization/internationalization.service';

enableProdMode();

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, "i18n/", ".json");
}

@NgModule({
    imports: [
        BrowserModule,
    	AppRoutingModule,
    	HttpModule,
    	FormsModule,
    	ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NgxCarouselModule,
        MatSlideToggleModule
    ],

    declarations: [
        AppComponent,
        ConsumptionComponent,
        RealFlameDetectionComponent,
        VirtualFlameDetectionComponent,
        RealHumidityComponent,
        VirtualHumidityComponent,
        RealTemperatureComponent,
        VirtualTemperatureComponent,
        WebCamComponent,
        LanguageComponent
    ],

    providers: [
        ListenerService,
        InternationalizationService
    ],

    bootstrap: [AppComponent]
})

export class AppModule {}