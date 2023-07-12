function findElementByText(element, text) {
    var found;
    for (const s of document.querySelectorAll(element, text)) {
      if (s.textContent.includes(text)) {
        found = s;
      }
    }
    return found;
}

function findSpanByText(text) {
    return findElementByText("span", text);
}

function findDivByText(text) {
    return findElementByText("div", text);
}

function shiftElemenOutTheWay(el) {
    el.style.position = "absolute";
    el.style.top = "-9999px";
    el.style.left = "-9999px";
}


