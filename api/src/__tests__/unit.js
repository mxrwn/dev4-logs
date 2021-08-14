const Helpers = require('./../utils/helpers')

describe('Testing of Helpers', () => {
  test('Check if the function generates a random UUID', () => {
    return expect(Helpers.generateUUID()).toBeDefined();
  });
  test('Check if the function checks if a category already exists in the Category table', () => {
    return expect(Helpers.checkCategoryId(1)).resolves.toBeTruthy();
  })
  test('Check if giving a string in a category returns false', () => {
    return expect(Helpers.checkCategoryId('caca')).resolves.toBeFalsy();
  });
  test('Check if given nothing returns false', () => {
    return expect(Helpers.checkCategoryId()).resolves.toBeFalsy();
  });
  
});