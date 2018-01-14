import {Injectable} from '@angular/core';
import {Http, ConnectionBackend, RequestOptions, RequestMethod, RequestOptionsArgs, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from 'environments/environment';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
declare var $: any;

@Injectable()
export class ApiHandlerService extends Http {
  private bearer = 'Bearer';
  public pendingRequests = 0;
  public showLoading = false;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  /**
   *
   * @param service_url this is our api method url
   * @param method this can either be RequestMethod.POST, RequestMethod.GET etc...
   * @param params this is the data we are sending across to our api backend for processing
   * @param options incase we want to pass our custom options like headers and all
   */
  callService(service_url, method: RequestMethod, params: any = {}, options?: RequestOptionsArgs): Observable<any> {
    console.log(this.getFullUrl(service_url, method))
    return this.intercept(super.request(this.getFullUrl(service_url, method), this.requestOptions(method, params, options))
      .catch(this.onCatch));
  }

  intercept(observable: Observable<any>): Observable<any> {
    console.log('In the intercept routine..');
    this.turnOnModal();
    this.pendingRequests++;
    return observable
      .do((res: Response) => {
        console.log('Response: ' + res);
        this.turnOffModal();
      }, (err: any) => {
        console.log('Caught error: ' + err);
        this.turnOffModal();
      })
    }

    private turnOnModal() {
      if (!this.showLoading) {
          this.showLoading = true;
         $('ngl-spinner').show();
          console.log('Turned on modal');
      }

      this.showLoading = true;
    }
    private turnOffModal() {
      this.pendingRequests--;
      if (this.pendingRequests <= 0) {
        if (this.showLoading) {
          $('ngl-spinner').hide();
        }
        this.showLoading = false;
      }
      console.log('Turned off modal');
    }

  /**
   * Build API url.
   * and we remove any leading / from the service calls since
   * we are not needing then in making request calls
   * e.g localhost:1337//base... to localhost:1337/base..
   *
   * which our backend host is coming from the environment
   *
   * @param url
   * @returns {string}
   */
  private getFullUrl(url: string, method: RequestMethod): string {
    if (url.charAt(0) === '/') {
      url = url.substring(1);
    }
    if ( method === RequestMethod.Get && !(url.indexOf('find') > -1)) {
      if (url.indexOf('?') > -1) {
        return environment.endpoint + url + '&limit=1000';
      } else {
        return environment.endpoint + url + '?&limit=1000';
      }
    } else {
      return environment.endpoint + url;
    }
  }


  /**
   * Request options is used to manipulate and handle needed information before
   * it is sent to server and it also adds our token authorization header if it is
   * present in our storage
   * @param method
   * @param params
   * @param options
   * @returns {RequestOptionsArgs}
   */
  private requestOptions(method: RequestMethod, params: any, options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    options.method = method;

    if (options.method === RequestMethod.Post || options.method === RequestMethod.Put) {
      options.body = params;
    } else {
      options.params = params;
    }

    if (options.headers == null && localStorage.getItem('token') != null) {
      options.headers = new Headers({
        'Authorization': `${this.bearer} ${localStorage.getItem('token')}`
      });
    }
    return options;
  }


  /**
   * Error handler.
   * do any middle ware checking before sending it to observable caller
   *
   * convert the error to normal text
   *
   * @param error
   * @param caught
   * @returns {ErrorObservable}
   */
  private onCatch(error: any, caught: Observable<any>): Observable<any> {

    return Observable.throw(error);
  }
}
