import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector.js";

import { ReactComponent as AppLogo } from "../../assets/crown.svg";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
} from "./navigation.style.jsx";

import CartIcon from "../../components/cart-icon/cart-icon";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);

  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <AppLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">Shop</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="/auth">Sign In</NavLink>
          )}
          <CartIcon />
        </NavLinks>

        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
