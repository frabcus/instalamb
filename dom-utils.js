function findSingleXPath(xpath) {
  const found = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE)
  return found.singleNodeValue 
}

function findAllXPath(xpath) {
  const spans = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE)
  const matchingSpans = [];
  for (let i = 0; i < spans.snapshotLength; i++) {
    matchingSpans.push(spans.snapshotItem(i));
  }
  return matchingSpans;
}

function findElement(element, text=null, attributes='true()') {
  let query = `//${element}[${attributes}`
  if (text !== null) {
    query += ` and normalize-space(.) = '${text}'`;
  }
  query += `]`;
  return findSingleXPath(query);
}

function shiftElementOutTheWay(el) {
    el.style.position = 'absolute';
    el.style.top = '-9999px';
    el.style.left = '-9999px';
}

function isElementOutTheWay(el) {
    return el.style.position == 'absolute' && el.style.top == '-9999px' && el.style.left == '-9999px';
}
