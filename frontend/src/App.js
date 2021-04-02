import { Route, Switch } from 'react-router-dom';
import { NotificationList } from './components/NotificationList'
import { EditNotification } from './components/EditNotification'
import { CreateNotification } from './components/CreateNotification'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Layout from './components/Layout'
import PreviewNotification from './components/PreviewNotification'
import Carousels from './components/NotificationCarousels'


function App() {
  return (
    <div>
      <Layout>
      <Switch>
        <Route exact path="/" component={NotificationList} />
        <Route path="/edit/:id" component={EditNotification} />
        <Route path="/create" component={CreateNotification} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/preview" component={PreviewNotification} />
        <Route path="/carousels" component={Carousels} />
      </Switch>
      </Layout>
    </div>
  );
}

export default App;
