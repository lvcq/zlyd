import React, { Component } from "react";
import loadable from "@loadable/component";
import { Switch, Route } from "react-router";

class ZlyRouter extends Component<{}, {}> {
  render() {
    const AddStoragePage = loadable(() => import("../addStorage/add-storage"));
    const FileUploadPage = loadable(() => import("../fileUpload/file-upload"));
    return (
      <Switch>
        <Route exact path="/zly">
          <h3>Please select a topic.</h3>
        </Route>
        <Route path="/zly/add-storage" component={AddStoragePage}></Route>
        <Route path="/zly/file-upload" component={FileUploadPage}></Route>
      </Switch>
    );
  }
}

export default ZlyRouter;
