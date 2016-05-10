/* jshint node: true */
'use strict';
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var UnwatchedDir  = require('broccoli-source').UnwatchedDir;

module.exports = {
  name: 'import-from-npm',
  included: function (app) {
    // nodeModulesPath has thef ull path not only the dir name
    app.nodeModulesDirectory = 'node_modules';  // NOTE: hardcoded for now.
    // do not watch vendor/ or bower's or npm'nodeModules directory by default
    app.trees.nodeModules = app.project._watchmanInfo.enabled ? app.nodeModulesDirectory : new UnwatchedDir(app.nodeModulesDirectory);
    app._processedExternalTree = function () {
      if (this._cachedExternalTree) {
        return this._cachedExternalTree;
      }

      var vendor = this._processedVendorTree();
      var bower = this._processedBowerTree();
      var nodeModules = this._processedNodeModulesTree();
      var trees = [vendor];
      if (bower) {
        trees.unshift(bower);
      }
      if (nodeModules) {
        trees.unshift(nodeModules);
      }

      return this._cachedExternalTree = mergeTrees(trees, {
        annotation: 'TreeMerger (ExternalTree)'
      });
    };
    app._processedNodeModulesTree = function() {
      if (this.cachedNodeModulesTree) {
        return this.cachedNodeModulesTree;
      }

      // do not attempt to merge bower and vendor together
      // if they are the same tree
      if (this.nodeModulesDirectory === 'vendor') {
        return;
      }

      this.cachedNodeModulesTree = new Funnel(this.trees.nodeModules, {
        srcDir: '/',
        destDir: this.nodeModulesDirectory + '/',
        annotation: 'Funnel (node modules)'
      });

      return this.cachedNodeModulesTree;
    };
  }
};
