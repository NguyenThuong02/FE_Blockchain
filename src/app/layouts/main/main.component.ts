import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren,
  importProvidersFrom,
  inject,
} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TabComponent } from '../../shared/components/tab/tab.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import 'zone.js';
import { Store } from '@ngrx/store';
import {
  arrowsDownIcon,
  arrowsUpIcon,
  ascSortIcon,
  circle,
  descSortIcon,
  detailTaskIcon,
  ghostIcon,
  groupUser,
  logoutIcon,
  organizationIcon,
  pinIcon,
  resizeColIcon,
  schoolDocumentIcon,
  tabTaskIcon,
  taskIcon,
  threeDots,
  userInforIcon,
  ghost,
  manager,
  edit
} from '../../shared/components/iconAntd/iconAddOnAntd.component';
import { AuthService } from '../../core/api/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import { GetListUnitBodyService } from '../../core/services/get-list-unit-body.service';
import { loadUnits, loadUnitsByTenant } from '../../store/Unit.action';
import { GetListTodoBodyService } from '../../core/services/get-list-todo-body.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { TenantService } from '../../core/api/tenant.service';
import { unitService } from '../../core/api/unit.service';
import { ValueUnitService } from '../../core/shared/value-unit.service';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzIconModule,
    NzSkeletonModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    RouterModule,
    MatSelectModule,
    FormsModule,
    TabComponent,
    TranslateModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnChanges {
  isCollapsed = false;
  isReverseArrow = false;
  viewDetailUnit = false;
  width = 280;
  language: string = 'vi';
  userName: string;
  role: string;
  _store = inject(Store);
  languageList = [
    {
      label: 'Tiếng Việt',
      value: 'vi',
    },
    {
      label: 'Tiếng anh',
      value: 'en',
    },
  ];

  changeLanguage(e: any) {
    this.language = e;
    this.translate.use(this.language);
    this.cdr.detectChanges();
  }
  tabActive: number = 0;
  lengthTab: number = 5;
  deviceType: string;
  public idTenant: string = '';
  public idParentUnit: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private iconService: NzIconService,
    private authService: AuthService,
    private OauthService: OAuthService,
    private nzContextMenuService: NzContextMenuService,
    private GetListUnitBodyService: GetListUnitBodyService,
    private GetListTodoBodyService: GetListTodoBodyService,
    private router: Router,
    private authService2: SocialAuthService,
    private tenantService: TenantService,
    private unitService: unitService,
    private valueUnitService: ValueUnitService,
  ) {
    if (navigator.language.includes('vi')) {
      this.translate.use('vi');
      this.language = 'vi';
    } else if (navigator.language.includes('en')) {
      this.translate.use('en');
      this.language = 'en';
    }
    let keysPressed: any = {};

    document.addEventListener('keydown', (event: any) => {
      keysPressed[event.keyCode] = true;
      if (keysPressed[16] && keysPressed[90]) {
        this.handleOpenAddTask();
      }
    });

    document.addEventListener('keyup', (event: any) => {
      delete keysPressed[event.keyCode];
    });
    this.iconService.addIconLiteral('groupUserIcon:antd', groupUser);
    this.iconService.addIconLiteral('ghostIcon:antd', ghostIcon);
    this.iconService.addIconLiteral('ghost:antd', ghost);
    this.iconService.addIconLiteral('taskIcon:antd', taskIcon);
    this.iconService.addIconLiteral('circleIcon:antd', circle);
    this.iconService.addIconLiteral('tabTaskIcon:antd', tabTaskIcon);
    this.iconService.addIconLiteral('resizeColIcon:antd', resizeColIcon);
    this.iconService.addIconLiteral('ascSortIcon:antd', ascSortIcon);
    this.iconService.addIconLiteral('descSortIcon:antd', descSortIcon);
    this.iconService.addIconLiteral('detailTaskIcon:antd', detailTaskIcon);
    this.iconService.addIconLiteral(
      'schoolDocumentIcon:antd',
      schoolDocumentIcon,
    );
    this.iconService.addIconLiteral('arrowsUpIcon:antd', arrowsUpIcon);
    this.iconService.addIconLiteral('arrowsDownIcon:antd', arrowsDownIcon);
    this.iconService.addIconLiteral('logoutIcon:antd', logoutIcon);
    this.iconService.addIconLiteral('organizationIcon:antd', organizationIcon);
    this.iconService.addIconLiteral('userInforIcon:antd', userInforIcon);
    this.iconService.addIconLiteral('threeDots:antd', threeDots);
    this.iconService.addIconLiteral('pinIcon:antd', pinIcon);
    this.iconService.addIconLiteral('manager:antd', manager);
    this.iconService.addIconLiteral('edit:antd', edit);

    const body = {
      pageNumber: 1,
      pageSize: 30,
    };
    GetListUnitBodyService.body = { ...body };
  }
  count: number;
  userInfor: any = JSON.parse(
    localStorage.getItem('id_token_claims_obj') || '{}',
  );
  ngOnChanges(changes: SimpleChanges): void {
    this.loadTenants();
  }
  ngOnInit(): void {
    console.log(this.OauthService.hasValidAccessToken());
    this.loadTenants();
    
    setInterval(() => {
      this.OauthService.refreshToken()
    }, 1800000000)

    if (this.getDeviceType() === 'mobile') {
      this.isCollapsed = true;
      this.cdr.detectChanges();
    }
    this._store.select('renderDataMenu').subscribe((data) => {
      this.cdr.detectChanges();
    });
    const idInterval = setInterval(() => {
      if (localStorage.getItem('id_token_claims_obj')) {
        this.userName = JSON.parse(
          localStorage.getItem('id_token_claims_obj') || '{}',
        )?.name;
        clearInterval(idInterval);
      }
    }, 300);

    MainComponent.getData();
    if (this.OauthService.hasValidIdToken()) {
      this.OauthService.refreshToken().then(() => {
        this._store.dispatch(loadUnits());
      });
    } else {
      this._store.dispatch(loadUnits());
    }

    this.getData();
  }
  changeTab(index: number) {
    this.tabActive = index;
    this.cdr.detectChanges();
  }

  loadTenants() {
    this.tenantService.getListTenant().subscribe((res: any) => {
      this.tenants = res.data;
      this.originalTenantsOrder = [...this.tenants];

      const pinnedTenantId = localStorage.getItem('pinnedTenantId');
      if (pinnedTenantId) {
        const pinnedTenant = this.tenants.find((tenant: any) => tenant.id === +pinnedTenantId);
        if (pinnedTenant) {
          this.tenants = this.tenants.filter((tenant: any) => tenant.id !== +pinnedTenantId);
          this.tenants.unshift(pinnedTenant);
        }
      }
    });
    // this.loadUnitbytenant()
  }

  getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua,
      )
    ) {
      return 'mobile';
    }
    return 'desktop';
  };
  handelAddTask() {
    console.log('add');
  }
  idUnit: string | undefined;
  visibleList: boolean = false;
  handleVisibleList(e: boolean) {
    this.visibleList = e;
  }

  visibleListObject: boolean = false;
  handleVisibleListObject(e: boolean) {
    this.visibleListObject = e;
  }

  handleOpenObject(unitID: any, event: Event){
    event.stopPropagation();
    event.preventDefault();
    this.idUnit = unitID;
    this.visibleListObject = true;
  }

  handleOpenAddTask(unitId?: string, event?: Event) {
    event?.stopPropagation();
    event?.preventDefault();
    this.idUnit = '';
    this.visibleList = true;
    this.idUnit = unitId;
  }

  handleOpenEditUnit(e: any, x: any, event: Event) {
    event.preventDefault();  
    event.stopPropagation();
    this.idUnit = e;
    // this.idTenant = x;
    console.log("IDDIDID: ", this.idTenant);
    this.visibleAddUnit = true;
    this.viewDetailUnit = true
    this.cdr.detectChanges();
    
  }  
  handleOpenEditTenant(e: any) {
    console.log(e);
  }

  visibleAddUnit: boolean = false;
  handleVisibleAddUnit(e: boolean) {
    this.visibleAddUnit = e;
  }
  handleOpenAddUnit(e: any, event: Event) {
    event.preventDefault();  
    event.stopPropagation();
    this.viewDetailUnit = false;
    this.visibleAddUnit = true;
    this.idTenant = e;
    this.idUnit = '';
    this.idParentUnit = '';
  }

  handleOpenAddUnit2() {
    this.visibleAddUnit = true;
    this.viewDetailUnit = false;
    this.idUnit = '';
  }

  handleOpenAddUnit3(a: any, b: any, event: Event) {
    this.idUnit = '';
    event.stopPropagation();
    event.preventDefault();
    this.visibleAddUnit = true;
    this.viewDetailUnit = false;
    this.idTenant = a;
    this.idParentUnit = b;
  }
  public static data: any = [];
  public static getData: any = () => {
    // console.log('á');
    MainComponent.data.push('a');
  };
  get staticData() {
    return MainComponent.data;
  }
  visiblePopUpChangeGroup: boolean = false;
  handleVisiblePopUpGroup(e: boolean) {
    this.visiblePopUpChangeGroup = e;
  }

  isVisiblePopUpChangeOrgnization: boolean = false;
  handelVisiblePopUpChangeOrgnization(e: boolean) {
    this.isVisiblePopUpChangeOrgnization = e;
  }
  handelOpenPopUpChangeOrgnization() {
    this.isVisiblePopUpChangeOrgnization = true;
  }

  tenants: any = [];
  public originalTenantsOrder: any[] = [];
  public hiddenTenantIds: Set<number> = new Set();
  unitOfTenant: any = [];
  isVisiblePopUpCreateOrgnization: boolean = false;
  handelVisiblePopUpCreateOrgnization(e: boolean) {
    this.isVisiblePopUpCreateOrgnization = e;
  }
  handelOpenPopUpCreateOrgnization(idTenant?:any, event?: Event) { 
    event?.preventDefault();  
    event?.stopPropagation();
    this.idTenant = idTenant;
    this.isVisiblePopUpCreateOrgnization = true;
  }

  handleTenantCreated(a: any): void {
    const tenantIndex = this.tenants.findIndex((tenant: any) => tenant.id === a.id);
    if (tenantIndex !== -1) {
      this.tenants[tenantIndex] = a;
    } else {
      this.tenants.push(a);
    }
  }
  
  handleUnitCreated(updatedUnit: any): void {
    const unitIndex = this.units.findIndex((unit: any) => unit.id === updatedUnit.id);
    if (unitIndex !== -1) {
      this.units[unitIndex] = updatedUnit;
    } else {
      this.units.push(updatedUnit);
    }
    this.cdr.detectChanges();
  }
  
  handleUnitChilCreated(updatedUnit: any): void {
    const unitIndex = this.childrenUnits.findIndex((unitChil: any) => unitChil.id === updatedUnit.id);
    if (unitIndex !== -1) {
      this.childrenUnits[unitIndex] = updatedUnit;
    } else {
      this.childrenUnits.push(updatedUnit);
    }
    this.cdr.detectChanges();
  }

  handleUnitDeleted(unitId: any): void {
    this.units = this.units.filter((unit: any) => unit.id !== unitId); 
    this.cdr.detectChanges(); 
  }

  listID = [
    {
      id: 1235435,
    },
    {
      id: 558,
    },
  ];
  dropdownMenus: { [key: number]: NzDropdownMenuComponent } = {};

  dropdownTenantMenus: { [key: number]: NzDropdownMenuComponent } = {};
  @ViewChildren('menuTenant')
  dropdownMenuTenantComponents!: QueryList<NzDropdownMenuComponent>;

  contextTenantMenu($event: MouseEvent, itemId: any): void {
    $event.preventDefault();  
    $event.stopPropagation();
    const menu = this.dropdownTenantMenus[itemId];
    console.log("Menu: ", menu)
    this.nzContextMenuService.create($event, menu);
  }

  dropdownUnitMenus: { [key: number]: NzDropdownMenuComponent } = {};
  @ViewChildren('menuUnit')
  dropdownMenuUnitComponents!: QueryList<NzDropdownMenuComponent>;

  contextUnitMenu($event: MouseEvent, itemId: any): void {
    $event.preventDefault();  
    $event.stopPropagation();
    const menu = this.dropdownUnitMenus[itemId];
    console.log("Menu2: ", menu)
    this.nzContextMenuService.create($event, menu);
  }

  dropdownUnitChilMenus: { [key: number]: NzDropdownMenuComponent } = {};
  @ViewChildren('menuUnitChil')
  dropdownMenuUnitChilComponents!: QueryList<NzDropdownMenuComponent>;
  contextUnitChilMenu($event: MouseEvent, itemId: any): void {
    $event.preventDefault();  
    $event.stopPropagation();
    const menu = this.dropdownUnitChilMenus[itemId];
    console.log("Menu3: ", menu)
    this.nzContextMenuService.create($event, menu);
  }

  @ViewChildren('menu')
  dropdownMenuComponents!: QueryList<NzDropdownMenuComponent>;

  dropdownIndividualMenus: { [key: number]: NzDropdownMenuComponent } = {};

  @ViewChildren('menuIndividual')
  dropdownMenuIndividualComponents!: QueryList<NzDropdownMenuComponent>;

  ngAfterViewChecked() {
    this.dropdownMenuTenantComponents.forEach((menu, index) => {
      const tenant = this.tenants[index];
      if (tenant && tenant.id) {
        this.dropdownTenantMenus[tenant.id] = menu;
      }
    });
    this.dropdownMenuUnitComponents.forEach((menu, index) => {
      const unit = this.units[index];
      if (unit && unit.id) {
        this.dropdownUnitMenus[unit.id] = menu;
      }
    });
    this.dropdownMenuUnitChilComponents.forEach((menu, index) => {
      const childUnit = this.childrenUnits[index];
      if (childUnit && childUnit.id) {
        this.dropdownUnitChilMenus[childUnit.id] = menu;
      }
    });
    this.dropdownMenuIndividualComponents.forEach((menu, index) => {
      const listItem = this.listID[index];
      if (listItem && listItem.id) {
        this.dropdownIndividualMenus[listItem.id] = menu;
      }
    });
  }

  contextMenuIndividual($event: MouseEvent, itemId: number): void {
    const menu = this.dropdownIndividualMenus[itemId];
    this.nzContextMenuService.create($event, menu);
    $event.stopPropagation();
  }

  closeMenuIndividual(): void {
    this.nzContextMenuService.close();
  }

  contextMenu($event: any, itemId: any): void {
    if (!$event.target.offsetParent.attributes.hasOwnProperty('nz-menu-item')) {
      const menu = this.dropdownMenus[itemId];
      this.nzContextMenuService.create($event, menu);
      $event.stopPropagation();
    }
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }

  handleLogout() {
    // localStorage.clear();
    // window.location.reload();
    this.GetListTodoBodyService.body.unitId = null;
    this.authService.logout();
    this.authService2.signOut();
    // this.OauthService.refreshToken();
  }
  listmenu: any;
  listmenuIndividual: any = [];
  getData() {
    this._store.select('unitReduce').subscribe((data: any) => {
      this.listmenu = data?.data;
    });
  }

  units: any = [];
  currentTenantId: string | null = null;
  loadUnitbytenant(e: any, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.idTenant = e;
    console.log("AA: ", e)
    this.valueUnitService.setTenantId(e);
    this.unitService.getListUnitsByTenant(e).subscribe((units: any) => {
      this.units = units.data;
      this.currentTenantId = e;
      this.cdr.detectChanges();
    });
  }

  childrenUnits: any = [];
  loadUnitChildren(id: any, event: Event){
    event.stopPropagation();
    event.preventDefault();
    this.router.navigate(['/unit/othertask', id]);
    this.unitService.getListUnitByParentUnit(id).subscribe(res => {
      this.childrenUnits = res.data;
      this.valueUnitService.setChildrenUnits(res.data);
      this.cdr.detectChanges();
      console.log("ChildrenUnits: ", this.childrenUnits)
    })
  }

  listObjectByUnit(unitId: string, event: Event) {
    event.stopPropagation();
    this.valueUnitService.setUnitId(unitId);
  }

  UnitChildren(id: any, event: Event){
    event.stopPropagation();
    event.preventDefault();
  }

  contextMenuOrgnization(
    $event: MouseEvent,
    menu: NzDropdownMenuComponent,
  ): void {
    const element = $event.target as HTMLElement;
    console.log($event);

    $event.stopPropagation();
    if (element.innerHTML === 'Organization' || element.innerHTML === 'Tổ chức')
      this.nzContextMenuService.create($event, menu);
  }

  stopPrevenDefault($event: any) {
    $event.preventDefault();
  }

  openMap: { [key: number]: boolean } = {};
  openSubMap: { [key: number]: boolean } = {};

  openHandler(index: number, state: boolean): void {
    for (const i in this.openSubMap) {
      if (Number(i) !== index) {
        this.openSubMap[i] = false;
      }
    }
    this.openSubMap[index] = state;
    // Đóng tất cả các unit cha và unit con
    for (const i in this.openSubMap2) {
      this.openSubMap2[i] = false;
    }
    for (const i in this.openSubMap3) {
      this.openSubMap3[i] = false;
    }
  }

  openMap2: { [key: number]: boolean } = {};
  openSubMap2: { [key: number]: boolean } = {};

  openHandler2(index: number, isSubMenu: boolean = false): void {
    if (isSubMenu) {
      for (const key in this.openSubMap2) {
        if (key !== index.toString()) {
          this.openSubMap2[key] = false;
        }
      }
    } 
  }

  openMap3: { [key: number]: boolean } = {};
  openSubMap3: { [key: number]: boolean } = {};

  openHandler3(index: number, isSubMenu: boolean = false): void {
    if (isSubMenu) {
      for (const key in this.openSubMap3) {
        if (key !== index.toString()) {
          this.openSubMap3[key] = false;
        }
      }
    } 
  }

  handlePinOrganization(tenantId: number | null): void {
    if (tenantId === null) {
      this.tenants = [...this.originalTenantsOrder];
      localStorage.removeItem('pinnedTenantId');
      return;
    }
    localStorage.setItem('pinnedTenantId', tenantId.toString());
    const pinnedTenant = this.tenants.find((tenant: any) => tenant.id === tenantId);
    if (pinnedTenant) {
      this.tenants = this.tenants.filter((tenant: any) => tenant.id !== tenantId);
      this.tenants.unshift(pinnedTenant);
    }
  }

  handleToggleVisibilityTenant(tenantId: number): void {
    if (this.hiddenTenantIds.has(tenantId)) {
        this.hiddenTenantIds.delete(tenantId); 
    } else {
        this.hiddenTenantIds.add(tenantId); 
    }
  }

  isTenantHidden(tenantId: number): boolean {
    return this.hiddenTenantIds.has(tenantId);
  }

}
