import { Component, OnInit} from "@angular/core";
import { InternationalizationService } from "../internacionalization/internationalization.service";
import { Language } from "../internacionalization/language.enum";

@Component({
    selector: 'language',
    template: require('./language.component.html')
})
export class LanguageComponent implements OnInit {

    imgUrl = "images/ic_infos.png"
    isPortuguese = true
    keyLabel = 'settings.language.change.label'

    ngOnInit() {
        this.markSelectedLanguage()
    }

    constructor(private inter: InternationalizationService) {
    }

    switchLanguage() {
        this.inter.switchLanguage()
    }

    markSelectedLanguage() {
        if (this.inter.currentLanguage() == Language.PORTUGUESE) {
            this.isPortuguese = true
        } else {
            this.isPortuguese = false
        }
    }

}