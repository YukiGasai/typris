import styled from 'styled-components';

const ControlInfo = () => {
    return (
        <StyledControlInfo>
            <h2>Controls</h2>
            <table>
                <tr>
                    <th>Key</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <td>h</td>
                    <td>Move Left</td>
                </tr>
                <tr>
                    <td>l</td>
                    <td>Move Right</td>
                </tr>
                <tr>
                    <td>j</td>
                    <td>Drop</td>
                </tr>
                <tr>
                    <td>k</td>
                    <td>Rotate</td>
                </tr>
                <tr>
                    <td>Tab</td>
                    <td>Toggle control</td>
                </tr>
                <tr>
                    <td>r</td>
                    <td>Reset game</td>
                </tr>
                <tr>
                    <td>Esc</td>
                    <td>Command pallet</td>
                </tr>
            </table>
        </StyledControlInfo>
    );
    }


const StyledControlInfo = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
`;

export default ControlInfo;