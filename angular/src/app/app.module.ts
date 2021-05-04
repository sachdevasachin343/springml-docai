import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { APP_BASE_HREF } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";

import { SidebarModule } from "./sidebar/sidebar.module";
import { FixedPluginModule } from "./shared/fixedplugin/fixedplugin.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { AdminLayoutComponent } from "./layouts/admin/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth/auth-layout.component";
import { AppRoutes } from "./app.routing";
import { HttpClientModule } from "@angular/common/http";
import { Ng4LoadingSpinnerModule } from "ng4-loading-spinner";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { AuthGuard } from "./gaurds/auth.guard";
import { MonacoEditorModule } from "ngx-monaco-editor";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth";
import { ApiService } from "./api-service/api.service";
// import { ToastrModule } from 'ng6-toastr-notifications';
// import { TestplansAddUpdateFlowComponent } from './testplans-add-update-flow/testplans-add-update-flow.component';
// import { TestplansIntegrationComponent } from './testplans-integration/testplans-integration.component';
// import { ViewTestsuiteResultsComponent } from './view-testsuite-results/view-testsuite-results.component';
// import { EditTestplanComponent } from './edit-testplan/edit-testplan.component';
// import { ViewTestplanResultsComponent } from './view-testplan-results/view-testplan-results.component';
// import { AddTestplansTemplateComponent } from './add-testplans-template/add-testplans-template.component';
// import { TestPlansComponent } from './test-plans/test-plans.component';


const config = {
  apiKey: "abc",
  authDomain: "xyz.firebaseapp.com",
  projectId: "xyz",
  storageBucket: "xyz.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:hhakw279817236jsb91",
  measurementId: "G-P77aj919"
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    NgbModule.forRoot(),
    // ToastrModule.forRoot(),
    HttpModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot(),
    MonacoEditorModule.forRoot(),
    AutocompleteLibModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config),
  ],
  providers: [AuthGuard, AngularFireAuth, ApiService],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
