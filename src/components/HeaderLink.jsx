import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderLink = ({ to, icon }) => (
    <StyledHeaderLink>
        <Link to={to}>
            {icon}
        </Link>
    </StyledHeaderLink>
);

const StyledHeaderLink = styled.li`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    font-size: 1rem;
    font-family: Virgil;
    cursor: pointer;
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;

    a {
        width: 24px;
        height: 24px;
    }
`;


export default HeaderLink;
