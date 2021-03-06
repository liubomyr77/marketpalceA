import React from 'react';
import { useHistory } from 'react-router-dom'; 
import t from 'prop-types';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import Icon from '../Icons/Icon/Icon';
import s from './Header.module.scss';
import { routes } from '../../scenes/routes';
import { useStore } from '../../stores/createStore';
 

const UserInfo = observer(() => {
  const store = useStore();
  return (
    <div>
   {   console.log(store.viewer.user)}
      {store.viewer.user.fullName} 
      {' '}
      {' '}
      <button type="button" onClick={store.auth.logout}>
        Logout
      </button>
    </div>
  );
});

const Header = observer(({ color, name }) => {
  const  history  = useHistory();
  const store = useStore();
  function navigateToLogin () {
    history.push(routes.login);
    
  }
  console.log(color);
    return (
      <header className={s.container} style={{ backgroundColor: color }}>
        <NavLink to={routes.home}>
          <Icon name={name} />
        </NavLink>  
        
        <div className={s.right}>
          <div className={s.sellButton}>
            <button type="button">SELL</button>
          </div>   
          {!store.auth.isLogin ? (
            <div className={s.loginButton}>
              <span onClick={navigateToLogin}>login</span>
            </div>
           ) : <UserInfo />}
                   
        </div>
        
 
      </header>
    );
});

export default Header;

Header.propTypes = {
 color: t.string,
};

