function plugin(hook, vm) {
  hook.doneEach(function (html, next) {
    const sidebarNav = document.querySelector(".sidebar-nav ul");
    modifyMenu(sidebarNav.children, vm.config.sidebarDisplayLevel);

    next(html);
  });
}

function modifyMenu(childs, openLayers, recursionLayer = 1) {
  for (let i = 0; i < childs.length; i++) {
    const child = childs[i];

    // check if li element has another ul inside
    if (child.children.length > 1) {
      // create collapse div
      const collapse = document.createElement("div");
      collapse.classList.add("collapse");

      // collapse if current layer is bigger than the openLayers
      if (recursionLayer > openLayers) {
        child.classList.add("collapsed");
      }

      // handle click to collapse/uncollapse the sidebar
      [child.children[0], collapse].forEach(function (el) {
        el.addEventListener("click", function () {
          child.classList.toggle("collapsed");
        });
      });

      // insert collapse div
      child.insertBefore(collapse, child.children[0]);

      // call recursively also for childs
      modifyMenu(child.children[2].children, openLayers, recursionLayer + 1);
    }

    // open all parents recursively if li has active class
    if (child.classList.contains("active")) {
      openAllParents(child);
    }
  }
}

function openAllParents(child) {
  child.classList.remove("collapsed");

  if (child.parentElement && child.parentElement.parentElement) {
    openAllParents(child.parentElement.parentElement);
  }
}

window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins);
