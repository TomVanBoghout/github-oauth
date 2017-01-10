import { GithubOauthPage } from './app.po';

describe('github-oauth App', function() {
  let page: GithubOauthPage;

  beforeEach(() => {
    page = new GithubOauthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
