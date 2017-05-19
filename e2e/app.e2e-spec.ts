import { CijferUitrekenenPage } from './app.po';

describe('cijfer-uitrekenen App', () => {
  let page: CijferUitrekenenPage;

  beforeEach(() => {
    page = new CijferUitrekenenPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
