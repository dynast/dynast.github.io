const path = require('path');
const { JSDOM } = require('jsdom');

describe('service worker registration', () => {
  test('navigator.serviceWorker.register is called when page loads', async () => {
    const registerMock = jest.fn(() => Promise.resolve());

    const dom = await JSDOM.fromFile(path.join(__dirname, '../service-workers/index.html'), {
      runScripts: 'dangerously',
      resources: 'usable',
      beforeParse(window) {
        window.navigator.serviceWorker = { register: registerMock };
      }
    });

    await new Promise(resolve => {
      dom.window.addEventListener('load', () => resolve());
    });

    expect(registerMock).toHaveBeenCalled();
  });
});
