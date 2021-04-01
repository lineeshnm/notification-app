import { Route, Switch } from 'react-router-dom';
import { NotificationList } from './NotificationList'
import { EditNotification } from './EditNotification'
import { CreateNotification } from './CreateNotification'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Layout from './components/Layout'


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
        <Route path="/signout" component={CreateNotification} />
      </Switch>
      </Layout>
    </div>
  );
}

export default App;
