import useCustomContext from '../../hooks/useCustomContext';
import Me from './Me/Me';
import LoginForm from "./LoginForm/LoginForm.tsx";

const Login = () => {

  const {isAuth} = useCustomContext()

  return (<div className='login'>
              {isAuth
                ? <Me />
                : <LoginForm />
              }
          </div>);
}
export default Login;