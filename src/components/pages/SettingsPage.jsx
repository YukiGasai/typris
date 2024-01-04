import React from 'react'
import styled from 'styled-components'
import * as SettingsObjects from '../../helper/settingsObjects';
import { CommandPaletteMenuType } from '../../helper/constants';
import { settings, user } from '../../helper/gameSignals';
import { logout, startLogin } from '../../helper/authHelper';

const SingleInputSetting = ({setting}) => {
    const checkSelected = (value) => settings.value[setting._Key] === value

    return (<>
    {Object.entries(setting).filter(([key]) => !key.startsWith("_")).length > 3 ?
        <StyledSingleInputSetting onChange={(e) => 
            settings.value = {
                ...settings.value,
                [setting._Key]: e.target.value
            }
        }>
            {Object.entries(setting)
                .filter(([key]) => !key.startsWith("_"))
                .map(([key, value]) => (<option key={value} value={value} selected={checkSelected(value)}>{key}</option>))
            }
        </StyledSingleInputSetting> :

        <StyledMultiInputSetting>
        {Object.entries(setting)
            .filter(([key]) => !key.startsWith("_"))
            .map(([key, value]) => (
                <StyledOption 
                    key={value} 
                    onClick={() => {
                        settings.value = {
                            ...settings.value,
                            [setting._Key]: value
                        }
                    }}
                    className={settings.value[setting._Key] === value ? "active" : ""}
                >{key}</StyledOption>
            ))
        }
        </StyledMultiInputSetting>
        }
        </>
    
    )
}

const MultiInputSetting = ({setting}) => {
    return (
        <StyledMultiInputSetting>
            {Object.entries(setting)
                .filter(([key]) => !key.startsWith("_"))
                .map(([key, value]) => (
                    <StyledOption 
                        key={value} 
                        onClick={() => {
                            if(settings.value[setting._Key].includes(value)) {
                                settings.value = {
                                    ...settings.value,
                                    [setting._Key]: settings.value[setting._Key].filter((val) => val !== value)
                                }
                            } else {
                                settings.value = {
                                    ...settings.value,
                                    [setting._Key]: [...settings.value[setting._Key], value]
                                }
                            }
                        }}
                        className={settings.value[setting._Key].includes(value) ? "active" : ""}
                    >{key}</StyledOption>
                ))
            }
        </StyledMultiInputSetting>
    )
}

const ToggleInputSetting = ({setting}) => {
    return (
        <StyledToggleInputSetting>
            <StyledOption 
                onClick={() => settings.value = {
                    ...settings.value,
                    [setting._Key]: true
                }} 
                className={settings.value[setting._Key] ? "active" : ""}
            >On</StyledOption>
            <StyledOption
                onClick={() => settings.value = {
                    ...settings.value,
                    [setting._Key]: false
                }} 
                className={!settings.value[setting._Key] ? "active" : ""}
            >Off</StyledOption>
        </StyledToggleInputSetting>
    )
}


const SettingsPage = () => {

    const generateSetting = (setting) => {
        return (
            <StyledSettingsItem key={setting._Key}>
                <h2>{setting._Name}</h2>
                <p>{setting._Description}</p>
                {setting._Type === CommandPaletteMenuType.Single && <SingleInputSetting setting={setting}/>}
                {setting._Type === CommandPaletteMenuType.Multi && <MultiInputSetting setting={setting}/>}
                {setting._Type === CommandPaletteMenuType.Toggle && <ToggleInputSetting setting={setting}/>}
            </StyledSettingsItem>
        )
    }
    
    const generateSettings = () => {
        return Object.keys(SettingsObjects)
            .map((key) => SettingsObjects[key])
            .map((setting) => generateSetting(setting))
    }


    return (
        <StyledSettingsPage>
        <h1>Settings</h1>
        {generateSettings()}
        {user.value ?
            <StyledSettingsItem>
                <h2>Account</h2>
                <p>Log in or out of your account</p>
                <StyledOption onClick={() => logout()}>Logout</StyledOption>
            </StyledSettingsItem>
            :
            <StyledSettingsItem>
                <h2>Account</h2>
                <p>Log in or out of your account</p>
                <StyledOption onClick={() => startLogin()}>Login</StyledOption>
            </StyledSettingsItem>
        }
        </StyledSettingsPage>

    )}

function getAlignMent() {
    switch (settings.value[SettingsObjects.AlignGame._Key]) {
        case SettingsObjects.AlignGame.Left:
            return `align-self: flex-start;`;
        case SettingsObjects.AlignGame.Center:
            return `align-self: center;`;
        case SettingsObjects.AlignGame.Right:
            return `align-self: flex-end;`;
        default:
            return `align-self: flex-start;`;
    }
}

export const StyledSettingsPage = styled.div`
    ${getAlignMent}
    margin: 0 10%;
    display: flex;
    flex-direction: column;
    font-size: 1.2em;
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.primary};

    @media (max-width: ${props => props.theme.screens.mobile}) {
        width: 90%;
        margin: 0 5%;
        p {
            grid-column: 1 / span 2;
        }
    }
`

export const StyledSettingsItem = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 10px;
    max-width: 800px;
    margin: 20px 0;
    h2 {
        grid-column: 1 / span 2;
    }
`

const StyledSingleInputSetting = styled.select`
    width: 300px;
    height: 30px;
    background-color: ${props => props.theme.colors.background};;
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 8px;
    height: 40px;
    font-size: 1em;
    place-self: center;

    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.primary};

    @media (max-width: ${props => props.theme.screens.mobile}) {
        grid-column: 1 / span 2;
    }
`

const StyledToggleInputSetting = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
gap: 20px;
place-self: center;

@media (max-width: ${props => props.theme.screens.mobile}) {
    grid-column: 1 / span 2;
}
`

const StyledMultiInputSetting = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    grid-column: 1 / span 2;

    @media (max-width: ${props => props.theme.screens.mobile}) {
        grid-column: 1 / span 2;
    }
`

export const StyledOption = styled.span`
    min-width: 150px;
    display: flex;
    vertical-align: middle;
    justify-content: center;
    align-items: center;
    flex: 1 1 0px;
    text-align: center;
    padding: 10px;
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 8px;
    cursor: pointer;
    
    &.active {
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.background};;
    }
`

export default SettingsPage