import { MyChartPage } from './app.po';

describe('my-chart App', function() {
  let page: MyChartPage;

  beforeEach(() => {
    page = new MyChartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
