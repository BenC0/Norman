function registerTest(testID, variant, extraDetails) {
  window.norman = window.norman || {
    isPDP: isPDP(),
    isPLP: isPLP(),
    isHome: isHome(),
    pageType: pageType()
  };
  window.norman[testID] = {
    logs: [],
    variant,
    testID
  };

  for (const property in extraDetails) {
    window.norman[testID][property] = extraDetails[property];
  }
}

module.exports = registerTest;