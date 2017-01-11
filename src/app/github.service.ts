import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class GithubService {
  private githubUrl = "https://github.com/login/oauth/access_token";
  private client_id = "edaccf9541b11542089d";
  private client_secret = "7ba6b534de98ad0eee03f7124712b00d526936f0";
  private accessTokenObserver: Observable<any>;
  private accessToken: any;

  constructor(private http: Http) { }

  getAccessToken(code: string) {
    if (!this.accessTokenObserver && code) {
      let body = {
        code: code,
        client_id: this.client_id,
        client_secret: this.client_secret
      };
      let bodyString = JSON.stringify(body); // Stringify payload
      let headers = new Headers({ 
          'Content-Type': 'application/json', 
          "Accept": "application/json"}); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option

      this.accessToken = this.http.post(this.githubUrl, bodyString, options) // ...using post request
                        .map((res:Response) => {
                          let json = res.json();
                          console.log("JSON: ", json);
                          if (json && json.access_token) {
                            console.log("GOOD");
                            this.accessToken = json;
                            return {"authenticated":true};
                          } else {
                            console.log("BAD");
                            return {"authenticated":false};
                          }
                        }) // ...and calling .json() on the response to return data
                        .catch(this.handleError  ); //...errors if any
    }
    return this.accessToken;
  }

  getUser() {
    let headers = new Headers({'Authorization': 'token ' + this.accessToken.access_token}); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    
    return this.http.get("https://api.github.com/user", options)
                    .map((res:Response) => res.json())
                    .catch(this.handleError  ); //...errors if any
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}