import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faDiscord, faGoogle, faTwitch } from '@fortawesome/free-brands-svg-icons';

const ProviderIcon = ({ provider }) => {
    return (
        <StyledProviderIcon>
            {provider === "github" && <FontAwesomeIcon className='icon' icon={faGithub} />}
            {provider === "discord" && <FontAwesomeIcon className='icon' icon={faDiscord} />}
            {provider === "google" && <FontAwesomeIcon className='icon' icon={faGoogle} />}
            {provider === "twitch" && <FontAwesomeIcon className='icon' icon={faTwitch} />}
        </StyledProviderIcon>
    )
}

const StyledProviderIcon = styled.div`
    align-self: flex-start;
    opacity: 0.5;
    width: 12px;
    height: 12px;
    .icon {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
`

export default ProviderIcon;