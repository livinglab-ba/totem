import { Component, ViewChild } from "@angular/core";
import { VirtualTemperatureComponent } from '../sensor_data/temperature/temperature-virtual.component';
import { TranslateService } from '@ngx-translate/core';
import { Language } from "../components/internacionalization/language.enum";
import { InternationalizationService } from "../components/internacionalization/internationalization.service";

@Component({
    selector: 'my-app',
    template: require('./app.component.html')
})

export class AppComponent {

    /**
     * Name of the totem
     */
    appName: string = "TECNOCENTRO";

    /**
     * Object which will present the temperature icon with the right color (depending on its value)
     */
    @ViewChild(VirtualTemperatureComponent) virtualTemperature: VirtualTemperatureComponent;

    constructor(public internationalization: InternationalizationService) { }

}