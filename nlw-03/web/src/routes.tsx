import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageShow from './pages/OrphanageShow';
import CreateOrphanage from './pages/CreateOrphanage';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" exact component={OrphanagesMap} />
        <Route path="/orphanage/create" exact component={CreateOrphanage} />
        <Route path="/orphanage/:id" exact component={OrphanageShow} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;