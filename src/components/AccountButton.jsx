import React from "react";
import styled from "styled-components";
import { CircleUserRound  } from 'lucide-react';
import { user } from "../helper/gameSignals";
import { logout, startLogin } from "../helper/authHelper";

const AccountButton = () => {
  return <StyledAccountButton>
    {user.value ?

        <img src={user.value.avatar} alt={user.value.name} onClick={() => logout()}/>
        : 
        <CircleUserRound  
            className="loginButton"
            onClick={() => startLogin()}
        />
    }
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