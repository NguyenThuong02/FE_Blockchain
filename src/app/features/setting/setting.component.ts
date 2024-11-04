import { ChangeDetectorRef, Component } from '@angular/core';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { settingsIcon } from '../../shared/components/iconAntd/iconAddOnAntd.component';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { timeZoneList } from '../../core/enums/timeZone.enum';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [
    NzIconModule,
    CommonModule,
    TranslateModule,
    NzSelectModule,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent {
  public language: string = 'vi';
  constructor(
    private iconService: NzIconService,
    private translate: TranslateService, 
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.iconService.addIconLiteral('settingsIcon:antd', settingsIcon);
    this.lang = localStorage.getItem('lang') || this.translate.getDefaultLang();

    const time = new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/);
    if (time) {
      this.timeZone = time[0].split(' ')[0];
    }
  }

  timeZoneList = timeZoneList;
  lang: string = '';
  timeZone: string = '';

  changeLanguage(e: any) {
    this.language = e;
    this.translate.use(this.language);
    this.translate.setDefaultLang(e);
    localStorage.setItem('lang', e);
    this.cdr.detectChanges();
  }

  changeTimeZone(e: any) {
    console.log(e);
  }
}
