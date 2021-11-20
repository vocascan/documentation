/**
 * Plugin from
 * https://github.com/mrpotatoes/docsify-toc
 *
 * MIT License
 *
 * Copyright (c) 2019 Andric LibreSinn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var defaultOptions = {
  headings: "h1, h2",
  scope: ".markdown-section",

  // To make work
  title: "Contents",
  listType: "ul",
};

// Element builders
var tocHeading = function (Title) {
  return document.createElement("h2").appendChild(document.createTextNode(Title));
};

var aTag = function (src) {
  var a = document.createElement("a");

  // Use this to clip text w/ HTML in it.
  // https://github.com/arendjr/text-clipper
  // the next line is changed in this copy to render correct even if it starts with a link
  a.innerHTML = "<span>" + src.innerText + "</span>";
  a.href = src.firstChild.href;
  a.onclick = tocClick;

  // In order to remove this gotta fix the styles.
  a.setAttribute("class", "anchor");

  return a;
};

var tocClick = function (e) {
  var divs = document.querySelectorAll(".page_toc .active");

  // Remove the previous classes
  [].forEach.call(divs, function (div) {
    div.setAttribute("class", "anchor");
  });

  // Make sure this is attached to the parent not itself
  e.target.parentNode.setAttribute("class", "active");
};

var createList = function (wrapper, count) {
  while (count--) {
    wrapper = wrapper.appendChild(document.createElement("ul"));

    if (count) {
      wrapper = wrapper.appendChild(document.createElement("li"));
    }
  }

  return wrapper;
};

//------------------------------------------------------------------------

var getHeaders = function (selector) {
  var headings2 = document.querySelectorAll(selector);
  var ret = [];

  [].forEach.call(headings2, function (heading) {
    ret = ret.concat(heading);
  });

  return ret;
};

var getLevel = function (header) {
  var decs = header.match(/\d/g);

  return decs ? Math.min.apply(null, decs) : 1;
};

var jumpBack = function (currentWrapper, offset) {
  while (offset--) {
    currentWrapper = currentWrapper.parentElement;
  }

  return currentWrapper;
};

var buildTOC = function (options) {
  var ret = document.createElement("ul");
  var wrapper = ret;
  var lastLi = null;
  var selector = options.scope + " " + options.headings;
  var headers = getHeaders(selector).filter((h) => h.id);

  headers.reduce(function (prev, curr, index) {
    var currentLevel = getLevel(curr.tagName);
    var offset = currentLevel - prev;

    if (lastLi) {
      wrapper = offset > 0 ? createList(lastLi, offset) : jumpBack(wrapper, -offset * 2);
    }

    wrapper = wrapper || ret;

    var li = document.createElement("li");

    wrapper.appendChild(li).appendChild(aTag(curr));

    lastLi = li;

    return currentLevel;
  }, getLevel(options.headings));

  return ret;
};

// Docsify plugin functions
function plugin(hook, vm) {
  var userOptions = vm.config.toc;

  hook.mounted(function () {
    var content = window.Docsify.dom.find(".content");
    if (content) {
      var nav = window.Docsify.dom.create("aside", "");
      window.Docsify.dom.toggleClass(nav, "add", "nav");
      window.Docsify.dom.before(content, nav);
    }
  });

  hook.doneEach(function () {
    var nav = document.querySelectorAll(".nav")[0];
    var t = Array.from(document.querySelectorAll(".nav"));

    if (!nav) {
      return;
    }

    const toc = buildTOC(userOptions);

    // Just unset it for now.
    if (!toc.innerHTML) {
      nav.innerHTML = null;
      return;
    }

    // Fix me in the future
    var title = document.createElement("p");
    title.innerHTML = userOptions.title;
    title.setAttribute("class", "title");

    var container = document.createElement("div");
    container.setAttribute("class", "page_toc");

    container.appendChild(title);
    container.appendChild(toc);

    // Existing TOC
    var tocChild = document.querySelectorAll(".nav .page_toc");

    if (tocChild.length > 0) {
      tocChild[0].parentNode.removeChild(tocChild[0]);
    }

    nav.appendChild(container);
  });
}

// Docsify plugin options
window.$docsify["toc"] = Object.assign(defaultOptions, window.$docsify["toc"]);
window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins);
