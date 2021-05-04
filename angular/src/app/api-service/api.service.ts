import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpRequest, HttpHeaders } from "@angular/common/http";
import { ResponseType } from "@angular/http";
import { AngularFireAuth } from "@angular/fire/auth";
import { from } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { AuthProxyService } from "./auth-proxy.service";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  BASE_URL: string = 'http://127.0.0.1:8080';
  API_URL = `${this.BASE_URL}/api`;
  LOGIN_URL = `${this.API_URL}/login`;
  ENV_URL = `${this.API_URL}/set-env`;
  CREATE_ENV = `${this.API_URL}/create-env`;
  SAMPLE_IMAGES_URL = `${this.API_URL}/sample`;
  INTEGRATION_URL = `${this.API_URL}/integration`;
  TEMPLATES_URL = `${this.API_URL}/templates`;
  TRMPLATE_URL = `${this.API_URL}/template`;
  TRMPLATE_IMAGE_URL = `${this.API_URL}/template-image`;
  TEST_TEMPLATE = `${this.TRMPLATE_URL}/test`;
  TEST_BLIND = `${this.TRMPLATE_URL}/test_image`;
  TEST_PLAN = `${this.TRMPLATE_URL}/testplan`;
  TEST_CASES = `${this.API_URL}/testcases`;
  TEST_SUITES = `${this.API_URL}/testsuites`;
  API_DOCUMENTATION = `${this.API_URL}/`;
  IMAGE_CONVERT = `${this.BASE_URL}/convert/`;
  IMPORT_URL = `${this.API_URL}/template/import`;
  PROCESSOE = `${this.API_URL}/processors`;
  TEMPLATE_TYPE_LIST = `${this.API_URL}/templates/types`;
  GET_SETTINGS = `${this.API_URL}/template/admin/test`;
  GENERIC_TEMP_LIST = `${this.API_URL}/templates/generic`;
  INTEGRATION_BASE_URL = `${this.API_URL}/integration`;
  TARGET_CONNECTIONS_LIST = `${this.INTEGRATION_BASE_URL}/targetconnection/list`;
  SOURCE_CONNECTIONS_LIST = `${this.INTEGRATION_BASE_URL}/sourceconnection/list`;
  TARGET_CONNECTION_ADD = `${this.INTEGRATION_BASE_URL}/targetconnection/add-update`;
  SOURCE_CONNECTION_ADD = `${this.INTEGRATION_BASE_URL}/sourceconnection/add-update`;
  TARGET_CONNECTION_DELETE = `${this.INTEGRATION_BASE_URL}/targetconnection/delete`;
  SOURCE_CONNECTION_DELETE = `${this.INTEGRATION_BASE_URL}/sourceconnection/delete`;
  TARGET_CONNECTION_GET = `${this.INTEGRATION_BASE_URL}/targetconnection/get`;
  SOURCE_CONNECTION_GET = `${this.INTEGRATION_BASE_URL}/sourceconnection/get`;
  FLOWS_LIST = `${this.INTEGRATION_BASE_URL}/list`;
  TESTSUITE_INTEGRATIONSLIST = `${this.INTEGRATION_BASE_URL}/testsuite-integrationslist`;
  FLOWS_ADD_UPDATE = `${this.INTEGRATION_BASE_URL}/add-update`;
  FLOW_GET = `${this.INTEGRATION_BASE_URL}/get`;
  FLOW_BASE = `${this.API_URL}/flows`;
  RUN_FLOW = `${this.FLOW_BASE}/execute/job`;
  DELETE_FLOW = `${this.API_URL}/integration/delete`;
  QUEUED_JOBS = `${this.FLOW_BASE}/queuedjobs`;
  COMPLETED_JOBS = `${this.FLOW_BASE}/completedjobs`;
  SEARCH_COMPLETED_JOBS = `${this.FLOW_BASE}/completedjobs-search`;
  JOB_RESULT = `${this.FLOW_BASE}/task/doc/output`;
  JOB_INPUT = `${this.FLOW_BASE}/task/doc/input`;
  JOB_OUTPUT_UPDATE = `${this.FLOW_BASE}/job-output/update`;
  JOB_SUBMIT_TARGET = `${this.FLOW_BASE}/job-output/submit-to-target`;
  ENDPOINT_TEMPLATES = `${this.INTEGRATION_BASE_URL}/endpoints`;

  LIST_SAMPLE_IMAGES = `${this.API_URL}/sample/get-images`;
  SAMPLE_IMAGE_URL = `${this.API_URL}/sample/load-image`;

  LEARN_TEMPLATE_URL = `${this.API_URL}/learn/learntTemplate`;

  AUTOCOMPLETE_METADATA = `${this.API_URL}/template/autofill-service`;
  ADD_USER = `${this.API_URL}/auth/add-user`;
  RESET_PASS = `${this.API_URL}/auth/reset-password`;
  DELETE_USER = `${this.API_URL}/auth/delete-user`;
  LIST_USERS = `${this.API_URL}/auth/users`;
  LIST_ENV = `${this.API_URL}/list-env`;
  USER_ADD_ENV = `${this.API_URL}/user/add/env`;
  ENV_ADD_USER = `${this.API_URL}/env/add/user`;
  GET_USER = `${this.API_URL}/auth/get-user`;


  // Converts the results to xml
  XML_PARSER_URL = `${this.API_URL}/results_parser/xml`
  
  // Converts the results to CSV
  CSV_PARSER_URL = `${this.API_URL}/results_parser/csv`

  username: string;
  headerDict: any;
  requestOptions: any;
  redirectUrl;

  constructor(private http: HttpClient, public afAuth: AngularFireAuth, private authProxyService:AuthProxyService) {}

  login(username, password): Observable<any> {
    this.headerDict = {
      username: username,
      password: password
    };
    this.requestOptions = {
      headers: new HttpHeaders(this.headerDict)
    };
    return this.http.post(
      `${this.LOGIN_URL}`,
      { sample: "hi" },
      this.requestOptions
    );
  }
  setEnv(username): Observable<any> {
    let authTokenCall = from(this.getFirebaseCurrentUser().getIdToken(true));
    return authTokenCall.pipe(
      switchMap(authToken => {
        this.headerDict = {
          username: username,
          Authorization: authToken
        };
        this.requestOptions = {
          headers: new HttpHeaders(this.headerDict)
        };
        return this.http.post(
          `${this.ENV_URL}`,
          { sample: "hi" },
          this.requestOptions
        );
      })
    );
  }
  createEnv(payload) {
    return this.authProxyService.post(this.CREATE_ENV,payload,this.requestOptions);
  }

  getXML(payload) {
    return this.http.post(this.XML_PARSER_URL, {results:payload});
  }

  getCSV(payload) {
    return this.http.post(this.CSV_PARSER_URL, {results:payload})
  }

  updateLearnTemplate(templateName, learnTemplateJson): Observable<any> {
    this.init();
    return this.http.post(
      `${this.LEARN_TEMPLATE_URL}/${templateName}`,
      learnTemplateJson,
      this.requestOptions
    );
  }

  getLearnTemplate(templateName): Observable<any> {
    this.init();
    return this.http.get(
      `${this.LEARN_TEMPLATE_URL}/${templateName}`,
      this.requestOptions
    );
  }

  getSampleImagesByType(templateType): Observable<any> {
    this.init();
    return this.http.post(
      `${this.LIST_SAMPLE_IMAGES}`,
      { templateType: templateType },
      this.requestOptions
    );
  }

  getSampleImage(templateType, imageName): Observable<any> {
    this.init();
    return this.http.post(
      `${this.SAMPLE_IMAGE_URL}`,
      { templateType: templateType, imageName: imageName },
      {
        responseType: "blob",
        headers: new HttpHeaders(this.headerDict)
      }
    );
  }
  getTemplates(): Observable<any> {
    this.init();
    return this.authProxyService
      .get(this.TEMPLATES_URL, this.requestOptions)
      .pipe(map((response: any) => response));
  }
  setTemplate(templateName, data): Observable<any> {
    this.init();
    return this.authProxyService.post(
      `${this.TRMPLATE_URL}/${templateName}`,
      data,
      this.requestOptions
    );
  }
  setTestCase(expectedJson): Observable<any>{
    this.init();
    console.log(expectedJson)
    return this.authProxyService.post(`${this.TEST_CASES}/add-update`,
    expectedJson,
    this.requestOptions);
  }

 
  getTestCase(payload): Observable<any>{
    this.init();
    console.log("Test Case");
    return this.authProxyService.post(`${this.TEST_CASES}/list`,payload,this.requestOptions);
  }

  getTestPlanResults(testCaseName): Observable<any>{
    this.init();
    console.log("Test Case");
    return this.authProxyService.post(`${this.TEST_CASES}/results-list`,testCaseName,this.requestOptions);
  }

  getTestSuiteResults(testSuite):Observable<any>{
    this.init();
    console.log("Test Suite Results");
    return this.authProxyService.post(`${this.TEST_SUITES}/results-list`,testSuite,this.requestOptions);
  }

  getTestRunData(testRunName): Observable<any>{
    this.init();
    console.log("Test Run");
    return this.authProxyService.post(`${this.TEST_CASES}/rundata-list`,testRunName,this.requestOptions);
  }

  getTestSuitesData(testSuiteData):Observable<any>{
    this.init();
    console.log("Test Run");
    return this.authProxyService.post(`${this.TEST_SUITES}/rundata-list`,testSuiteData,this.requestOptions);
  }

  runTestPlan(testCaseName): Observable<any>{
    this.init();
    console.log("Test Plan");
    return this.authProxyService.post(`${this.TEST_CASES}/execute/run`,testCaseName,this.requestOptions);
  }

  isTestCasesResults(testCaseName): Observable<any>{
    this.init();
    console.log("Test Plan");
    return this.authProxyService.post(`${this.TEST_CASES}/results-flag`,testCaseName,this.requestOptions);
  }

  runTestSuite(testSuite): Observable<any>{
    this.init();
    console.log("Test Plan");
    return this.authProxyService.post(`${this.TEST_SUITES}/execute/run`,testSuite,this.requestOptions);
  }

  isResults(testSuite): Observable<any>{
    this.init();
    console.log("Test Plan");
    return this.authProxyService.post(`${this.TEST_SUITES}/results-flag`,testSuite,this.requestOptions);
  }

  deleteTestPlan(testCaseName): Observable<any>{
    this.init();
    console.log("Test Plan");
    return this.authProxyService.post(`${this.TEST_CASES}/delete`,testCaseName,this.requestOptions);
  }
  editTestPlan(testCaseName): Observable<any>{
    this.init();
    console.log("Test Plan");
    return this.authProxyService.post(`${this.TEST_CASES}/get`,testCaseName,this.requestOptions);
  }
  editTestPlanFlow(testCaseName){
    this.init();
    console.log("Test Plan");
    return this.authProxyService.post(`${this.TEST_CASES}/get`,testCaseName,this.requestOptions);
  }

  setTestSuite(expectedJson): Observable<any>{
    this.init();
    console.log(expectedJson)
    return this.authProxyService.post(`${this.TEST_SUITES}/add-update`,
    expectedJson,
    this.requestOptions);
  }

  getTestSuite(payload): Observable<any>{
    this.init();
    console.log("Test Suite");
    return this.authProxyService.post(`${this.TEST_SUITES}/list`,payload,this.requestOptions);
  }

  deleteTestSuite(testSuiteName): Observable<any>{
    this.init();
    console.log("Test Suite");
    return this.authProxyService.post(`${this.TEST_SUITES}/delete`,testSuiteName,this.requestOptions);
  }

  editTestSuite(testSuiteName): Observable<any>{
    this.init();
    console.log("Test Suite");
    return this.authProxyService.post(`${this.TEST_SUITES}/get`,testSuiteName,this.requestOptions);
  }

  getTemplateData(templateName): Observable<any> {
    this.init();
    return this.authProxyService.get(
      `${this.TRMPLATE_URL}/${templateName}`,
      this.requestOptions
    );
  }
  deleteTemplate(templateName): Observable<any> {
    this.init();
    return this.authProxyService.delete(
      `${this.TRMPLATE_URL}/${templateName}`,
      this.requestOptions
    );
  }
  test(templateName, formData): Observable<any> {
    this.init();
    return this.authProxyService.post(
      `${this.TEST_TEMPLATE}/${templateName}`,
      formData,
      this.requestOptions
    );
  }

  testBlind(formData): Observable<any> {
    this.init();
    return this.authProxyService.post(
      `${this.TEST_BLIND}`,
      formData,
      this.requestOptions
    );
  }
  setTemplateImage(formData): Observable<any> {
    this.init();
    return this.authProxyService.post(
      `${this.TRMPLATE_IMAGE_URL}`,
      formData,
      this.requestOptions
    );
  }
  getTemplateImage(location): Observable<any> {
    this.init();
    return this.authProxyService.get(
      `${this.TRMPLATE_IMAGE_URL}?template_image_location=${location}`,
      {
        responseType: "blob",
        headers: new HttpHeaders(this.headerDict)
      }
    );
  }
  testplan(templateName, formData,testCaseName): Observable<any> {
    this.init();
    return this.authProxyService.post(
      `${this.TEST_PLAN}/${templateName}/${testCaseName}`,
      formData,
      this.requestOptions
    );
  }

  convertImage(formData): Observable<any> {
    this.init();
    return this.http.post(this.IMAGE_CONVERT, formData, {
      responseType: "blob"
    });
  }
  integration(data): Observable<any> {
    this.init();
    return this.authProxyService.post(this.INTEGRATION_URL, data, this.requestOptions);
  }
  importTemplate(templateName): Observable<any> {
    this.init();
    return this.authProxyService.get(
      `${this.IMPORT_URL}/${templateName}`,
      this.requestOptions
    );
  }
  getProcessor(): Observable<any> {
    return this.authProxyService.get(this.PROCESSOE);
  }
  getGenericTemplates(): Observable<any> {
    return this.authProxyService.get(this.GENERIC_TEMP_LIST);
  }
  xlsToImage(formData): Observable<any> {
    this.init();
    return this.http.post("http://35.239.45.134:8080", formData, {
      responseType: "blob"
    });
  }
  getTargetConnections(payload): Observable<any> {
    return this.authProxyService.post(this.TARGET_CONNECTIONS_LIST, payload);
  }
  getSourceConnections(payload): Observable<any> {
    return this.authProxyService.post(this.SOURCE_CONNECTIONS_LIST, payload);
  }
  addSourceConnection(payload): Observable<any> {
    return this.authProxyService.post(this.SOURCE_CONNECTION_ADD, payload);
  }
  getSourceConnection(payload): Observable<any> {
    return this.authProxyService.post(this.SOURCE_CONNECTION_GET, payload);
  }
  deleteSourceConfig(payload): Observable<any> {
    return this.authProxyService.post(this.SOURCE_CONNECTION_DELETE, payload);
  }
  addTargetConnection(payload): Observable<any> {
    return this.authProxyService.post(this.TARGET_CONNECTION_ADD, payload);
  }
  getTargetConnection(payload): Observable<any> {
    return this.authProxyService.post(this.TARGET_CONNECTION_GET, payload);
  }
  deleteTargetConfig(payload): Observable<any> {
    return this.authProxyService.post(this.TARGET_CONNECTION_DELETE, payload);
  }
  getFlows(payload): Observable<any> {
    return this.authProxyService.post(this.FLOWS_LIST, payload);
  }
  getTestsuiteIntegrationsList(payload):Observable<any> {
    return this.authProxyService.post(this.TESTSUITE_INTEGRATIONSLIST, payload);
  }
  flowAddUpdate(payload): Observable<any> {
    return this.authProxyService.post(this.FLOWS_ADD_UPDATE, payload);
  }
  getFlow(payload): Observable<any> {
    return this.authProxyService.post(this.FLOW_GET, payload);
  }
  runFlow(payload): Observable<any> {
    console.log(payload)
    return this.authProxyService.post(this.RUN_FLOW, payload);
  }
  deleteFlow(payload): Observable<any> {
    return this.authProxyService.post(this.DELETE_FLOW, payload);
  }
  queuedjobs(payload): Observable<any> {
    return this.authProxyService.post(this.QUEUED_JOBS, payload);
  }
  completedJobs(payload): Observable<any> {
    return this.authProxyService.post(this.COMPLETED_JOBS, payload);
  }
  searchCompletedJobs(payload): Observable<any> {
    return this.authProxyService.post(this.SEARCH_COMPLETED_JOBS, payload);
  }
  getJobResult(payload): Observable<any> {
    return this.authProxyService.post(this.JOB_RESULT, payload);
  }
  getJobInput(payload): Observable<any> {
    return this.authProxyService.post(this.JOB_INPUT, payload, {
      responseType: "blob"
    });
  }
  updateJobOutput(payload): Observable<any> {
    return this.authProxyService.post(this.JOB_OUTPUT_UPDATE, payload);
  }
  submitToTarget(payload): Observable<any> {
    return this.authProxyService.post(this.JOB_SUBMIT_TARGET, payload);
  }
  getEnpointTemplates(payload): Observable<any> {
    return this.authProxyService.post(this.ENDPOINT_TEMPLATES, payload);
  }
  getTemplateTypes(): Observable<any> {
    this.init();
    return this.authProxyService.get(this.TEMPLATE_TYPE_LIST, this.requestOptions);
  }
  getSettings(): Observable<any> {
    this.init();
    return this.authProxyService.get(this.GET_SETTINGS, this.requestOptions);
  }
  getAutofillMetadata(templateType): Observable<any> {
    this.init();
    return this.authProxyService.post(this.AUTOCOMPLETE_METADATA, {
      userID: localStorage.getItem("username"),
      templateName: templateType
    });
  }
  addUser(payload) {
    this.init();
    return this.authProxyService.post(this.ADD_USER, payload, this.requestOptions);
  }
  resetPassword(payload) {
    this.init();
    return this.authProxyService.post(this.RESET_PASS, payload, this.requestOptions);
  }
  deleteUser(payload) {
    this.init();
    return this.authProxyService.post(this.DELETE_USER, payload, this.requestOptions);
  }
  getUser(payload) {
    this.init();
    return this.authProxyService.post(this.GET_USER, payload, this.requestOptions);
  }
  listFirebaseUsets() {
    this.init();
    return this.authProxyService.get(this.LIST_USERS, this.requestOptions);
  }
  listEnvs() {
    this.init();
    return this.authProxyService.get(this.LIST_ENV, this.requestOptions);
  }
  addUserToEnv(payload) {
    this.init();
    return this.authProxyService.post(this.USER_ADD_ENV, payload, this.requestOptions);
  }
  addEnvsToUser(payload) {
    this.init();
    return this.authProxyService.post(this.ENV_ADD_USER, payload, this.requestOptions);
  }
  firebaseSignIn(email, password) {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }
  firebaseSignOut() {
    console.log(this.afAuth);
    if(this.afAuth){
      return from(this.afAuth.auth.signOut());
    } else {
      return of(null)
    }
  }
  getFirebaseCurrentUser() {
    console.log(this.afAuth);
    return this.afAuth.auth.currentUser;
  }
  init() {
    this.username = localStorage.getItem("username");
    if (!this.username) {
      this.username = "user";
    }
    this.headerDict = {
      username: this.username,
    };
    this.requestOptions = {
      headers: new HttpHeaders(this.headerDict)
    };
  }
}
