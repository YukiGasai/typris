import styled from 'styled-components'
import ProviderIcon from './ProviderIcon'
import { useRef } from 'react'

const UserDisplay = ({ user, click }) => {

    const imageRef = useRef(null);

    const onError = () => {
        imageRef.current.src = 'https://cdn.discordapp.com/embed/avatars/4.png';
    }

    return (
        <StyledUserDisplay onClick={click} title={user.name}>
            <img ref={imageRef} src={user.avatar} alt="" onError={onError}/>
            <span>{user.name}</span>
            <ProviderIcon provider={user.provider} />
        </StyledUserDisplay>
    )
}

const StyledUserDisplay = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    gap: 5px;
    width: 100%;
    height: 24px;
    img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }
    align-self: flex-end;
    justify-self: flex-end;

    span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

`

export default UserDisplay;