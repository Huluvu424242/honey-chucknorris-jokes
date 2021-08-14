import {newE2EPage} from '@stencil/core/testing';
import {E2EElement, E2EPage} from "@stencil/core/testing/puppeteer/puppeteer-declarations";

describe('E2E: honey-chucknorris-jokes satisfy', () => {

  describe('simple check for present at page', () => {

    let page: E2EPage;
    let element: E2EElement;

    beforeEach(async () => {
      page = await newE2EPage({html: `<honey-chucknorris-jokes></honey-chucknorris-jokes>`});
      element = await page.find('honey-chucknorris-jokes');
    });

    it('Add Feed Button is present', async () => {
      const el = await page.find('honey-chucknorris-jokes');
      expect(el).not.toBeNull();
    });
  });
});

