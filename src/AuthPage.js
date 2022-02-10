import { useState } from 'react';
import { signIn, signUp } from './services/fetch-utils.js';

export default function AuthPage(props) {
  // you'll need to track the form state of the email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function handleSignIn(e) {
    e.preventDefault();
      
    // sign the user in using the form state
    const user = await signIn(email, password);
    // set the user in App.js state using the correct prop callback. If you did the ternary right in App.js, this should automatically redirect the user to the board game list
    props.setCurrentUser(user);
  }
    
  async function handleSignUp(e) {
    e.preventDefault();
    // sign the user up using the form state
    const user = await signUp(email, password);
    // set the user in App.js state using the correct prop callback. If you did the ternary right in App.js, this should automatically redirect the user to the board game list
    props.setCurrentUser(user);
  }

  return (
    <div className='auth'>
      <h1><em>Boardzo</em></h1>
      {/* on submit, sign the user in using the function defined above */}
      <form>
        <label>
            Email
          {/* on change, update the form state for email */}
          <input required type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
            Password
          {/* on change, update the form state for password */}
          <input required type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        <button onClick={handleSignIn} type='button'>Sign In</button>
        {/* on clicking sign up, sign the user up using the function defined above */}
        <button onClick={handleSignUp} type="button" >Sign Up</button>
      </form>
    </div>
  );
}
