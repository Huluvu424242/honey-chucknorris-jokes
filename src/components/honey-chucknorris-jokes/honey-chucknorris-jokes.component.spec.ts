import {newSpecPage} from '@stencil/core/testing';
import {HoneyChucknorrisJokes} from "./honey-chucknorris-jokes.component";

declare var fetch: Function;


describe('Component Test', () => {
  // beforeAll(() => {
  //   fetch = jest.fn(() =>
  //     Promise.resolve({
  //       ok: true,
  //       json: jest.fn(() => Promise.resolve({id: "test", website: "http", imgurl: "imgurl", text: "joke"}))
  //     })
  //   );
  // });

  it('should render my component', async () => {
    const page = await newSpecPage({
      components: [HoneyChucknorrisJokes],
      html: `<honey-chucknorris-jokes id="2"></honey-chucknorris-jokes>`,
    });
    expect(page.root).toEqualHtml(`
     <honey-chucknorris-jokes id="2">
     <mock:shadow-root>
       <a class="container" target="blank">
         <img alt="Chuck" class="item logo" title="Funny icon of Chuck Norris">
         <p class="item text"></p>
       </a>
     </mock:shadow-root>
     </honey-chucknorris-jokes>
  `);
    page.rootInstance.fetcherSubscription.unsubscribe();

  });

  // afterAll(() => {
  //   fetch['mockClear']();
  // });

});
