import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { settingsIcon } from '../../shared/components/iconAntd/iconAddOnAntd.component';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { timeZoneList } from '../../core/enums/timeZone.enum';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccountService } from '../../core/api/account.service';

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
    ChangePasswordComponent
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent implements OnInit {
  public language: string = 'vi';
  public infoAccount: any = {};
  constructor(
    private iconService: NzIconService,
    private translate: TranslateService, 
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private accountService: AccountService
  ) {
    this.iconService.addIconLiteral('settingsIcon:antd', settingsIcon);
    this.lang = localStorage.getItem('lang') || this.translate.getDefaultLang();

    const time = new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/);
    if (time) {
      this.timeZone = time[0].split(' ')[0];
    }
  }
  ngOnInit(): void {
    this.viewInfo();
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

  viewInfo(): void {
    this.accountService.getViewInfo().subscribe({
      next: (res) => {
        this.infoAccount = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  isVisiblePopUpChangePassword: boolean = false;
  handelVisiblePopUpChangePassword(e: boolean) {
    this.isVisiblePopUpChangePassword = e;
  }
  handelOpenPopUpChangePassword() {
    this.isVisiblePopUpChangePassword = true;
  }
}
