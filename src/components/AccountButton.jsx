import React, { useEffect } from "react";
import styled from "styled-components";
import { CircleUserRound, Phone } from 'lucide-react';
import { user } from "../helper/gameSignals";
import { logout, startLogin } from "../helper/authHelper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faDiscord, faGoogle } from '@fortawesome/free-brands-svg-icons';

const AccountButton = () => {
    const [openLogin, setOpenLogin] = React.useState(false);

    const ref = React.useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpenLogin(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return <StyledAccountButton ref={ref}>
        {user.value ?
            <img src={user.value.avatar} alt={user.value.name} onClick={() => logout()} />
            :
            <>
                {openLogin ?
                    <div className="loginList">
                        <FontAwesomeIcon className="loginButton" icon={faGithub} onClick={() => startLogin('github')} />
                        <FontAwesomeIcon className="loginButton" icon={faDiscord} onClick={() => startLogin('discord')} />
                        <FontAwesomeIcon className="loginButton" icon={faGoogle} onClick={() => startLogin('google')} />
                    </div>
                    :

                    <CircleUserRound
                        className="loginButton"
                        onClick={() => { setOpenLogin(true) }}
                    />
                }
            </>
        }
    </StyledAccountButton>
};

const StyledAccountButton = styled.div`
    width: fit-content;
    height: 24px;
   
    img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }
    align-self: flex-end;
    justify-self: flex-end;


    .loginList {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    .loginButton {
        color: ${props => props.theme.colors.primary};
        cursor: pointer;
        height: 24px;
        width: 24px;
    }
    .loginButton:hover {
        color: ${props => props.theme.colors.highlight};
    }
`

export default AccountButton;