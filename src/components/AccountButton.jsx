import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Loader, CircleUserRound  } from 'lucide-react';

const AccountButton = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  return <StyledAccountButton>
    {isLoading ? <Loader /> : (
        isAuthenticated ?
        <img src={user.picture} alt={user.name} onClick={() => logout()}/>
        : <CircleUserRound  
        className="loginButton"
        onClick={() => loginWithRedirect()}
        />
        )}
    </StyledAccountButton>
};

const StyledAccountButton = styled.div`
    width: 24px;
    height: 24px;
    overflow: hidden;
    border-radius: 50%;

    img {
        width: 24px;
        height: 24px;
    }
    align-self: flex-end;
    justify-self: flex-end;


    .loginButton {
        color: ${props => props.theme.colors.primary};
        cursor: pointer;
    }
    .loginButton:hover {
        color: ${props => props.theme.colors.highlight};
    }
`

export default AccountButton;