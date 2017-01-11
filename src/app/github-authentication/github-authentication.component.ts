import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GithubService } from "../github.service";

@Component({
  selector: 'app-github-authentication',
  templateUrl: './github-authentication.component.html',
  styleUrls: ['./github-authentication.component.css']
})
export class GithubAuthenticationComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private githubService: GithubService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (param: any) => {
        let code = param['code'];
        console.log(code);
        this.githubService.getAccessToken(code).subscribe();
      });

  }

}
