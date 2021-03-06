import { useState, useEffect } from 'react';
import { getUser } from './services/fetch-utils';
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
  Redirect
} from 'react-router-dom';
import AuthPage from './AuthPage';
import DetailPage from './DetailPage';
import ListPage from './ListPage';
import CreatePage from './CreatePage';

import './App.css';
import { logout } from './services/fetch-utils';

export default function App() {
  // You'll need to track the user in state
  const [currentUser, setCurrentUser] = useState(null);
  // add a useEffect to get the user and inject the user object into state on load
  useEffect(() => {
    async function fetch() {
      const data = getUser();

      setCurrentUser(data);
    }

    fetch();
  }, []);

  async function handleLogout() {
    // call the logout function
    await logout();
    // clear the user in state
    currentUser('');
  }

  return (
    <Router>
      <div className='App'>
        <header>
          {/* if there is a user in state, render out a link to the board games list, the create page, and add a button to let the user logout */}
          {
            currentUser &&
              <>
                <NavLink to="/board-games">
                Board Games
                </NavLink>
                <NavLink to="/create">
                Create Game
                </NavLink>
                <button 
                  onClick={handleLogout}>Logout</button>
              </>
          }
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              {/* if there is a user, redirect to the board games list. Otherwise, render the auth page. Note that the AuthPage will need a function called setUser that can set the user state in App.js */}
              {
                currentUser
                  ? <Redirect to="/board-games" />
                  : <AuthPage setCurrentUser={setCurrentUser} />
              }.

            </Route>
            <Route exact path="/board-games">
              {/* if there is a user, render the board games list. Otherwise, redirect to the home route/auth page */}
              {
                currentUser
                  ? <ListPage />
                  : <Redirect to="/" />
              }
            </Route>
            <Route exact path="/board-games/:id">
              {/* if there is a user, render the detail page. Otherwise, redirect to the home route/auth page */}
              {
                currentUser
                  ? <DetailPage />
                  : <Redirect to="/" />
              }
            </Route>
            <Route exact path="/create">
              {/* if there is a user, render the create page. Otherwise, redirect to the home route/auth page */}
              {
                currentUser
                  ? <CreatePage />
                  : <Redirect to="/" />
              }
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}