import styled from 'styled-components'
import ProviderIcon from './ProviderIcon'

const UserDisplay = ({ user, click }) => {
    return (
        <StyledUserDisplay onClick={click}>
            <img src={user.avatar} alt="" />
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

`

export default UserDisplay;