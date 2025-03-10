/* eslint-disable @typescript-eslint/no-require-imports */
require("@testing-library/jest-dom");

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);
