import { Component, OnInit } from '@angular/core';
import { GithubService } from "../github.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private name: string;

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    this.githubService.getUser().subscribe(user => this.name = user.name);
  }

}
