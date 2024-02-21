function _findSingleXPath(xpath) {
  var found = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE)
  return found.singleNodeValue 
}

function find(element, text, attributes='true()') {
  query = `//${element}[${attributes} and normalize-space(.) = '${text}']`;
  return _findSingleXPath(query);
}

function shiftElemenOutTheWay(el) {
    el.style.position = 'absolute';
    el.style.top = '-9999px';
    el.style.left = '-9999px';
}
