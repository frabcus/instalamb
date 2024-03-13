function _findSingleXPath(xpath) {
  const found = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE)
  return found.singleNodeValue 
}

function findElement(element, text=null, attributes='true()') {
  let query = `//${element}[${attributes}`
  if (text !== null) {
    query += ` and normalize-space(.) = '${text}'`;
  }
  query += `]`;
  return _findSingleXPath(query);
}

function shiftElementOutTheWay(el) {
    el.style.position = 'absolute';
    el.style.top = '-9999px';
    el.style.left = '-9999px';
}