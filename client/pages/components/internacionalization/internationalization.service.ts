import { TranslateService } from '@ngx-translate/core';
import { Injectable }		from '@angular/core';
import { Language } from './language.enum';

@Injectable()
export class InternationalizationService {

    /**
     * Totem language
     */
    readonly defaultLanguage: Language.PORTUGUESE;

    constructor(private translate: TranslateService) {
        this.setUp();
    }

    /**
     * Sets up the languages used by System, default is English
     */
    setUp() {
        this.translate.addLangs([Language.PORTUGUESE, Language.ENGLISH]);
        this.translate.setDefaultLang(this.defaultLanguage);

         // the lang to use, if the lang isn't available, it will use the current loader to get them
         if (this.currentLanguage() == null) {
            let browserLang = this.translate.getBrowserLang();
            if (browserLang.match(Language.ENGLISH) || browserLang.match(Language.PORTUGUESE))
                this.translate.use(browserLang)
            else
                this.translate.use(Language.ENGLISH)
         }
    }

    /**
     * Switches languages between portuguese and english 
     */
    switchLanguage(): void {
        if (this.currentLanguage() == Language.PORTUGUESE){
            this.translate.use(Language.ENGLISH);
        } else {
            this.translate.use(Language.PORTUGUESE);
        }
    }

    currentLanguage() {
        return this.translate.currentLang
    }

}