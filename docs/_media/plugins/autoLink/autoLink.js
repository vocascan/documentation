function plugin(hook, vm) {
  hook.beforeEach(function (content) {
    return content.replace(/(\S+\/\S+)?#(\d+)/gm, (fullDescription, repo, number) => {
      if (!repo) {
        const match = vm.route.file.match(/https:\/\/.*?\/(\S+?\/\S+?)\//);

        if (match) {
          repo = match[1];
        } else {
          repo = "vocascan/" + vm.route.file.split("/")[0];
        }
      }

      return "[" + fullDescription + "](https://github.com/" + repo + "/pull/" + number + ")";
    });
  });
}

window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins);
