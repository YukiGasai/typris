import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderLink = ({ to, img, alt }) => (
    <StyledHeaderLink>
        <Link to={to}>
            <img src={img} alt={alt} />
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
    overflow: hidden;
    align-items: center;
    justify-content: center;

    img {

        width: 24px;
        height: 24px;
    }
`;


export default HeaderLink;
