import React from 'react'
import styled from 'styled-components'
import * as SettingsObjects from '../../helper/settingsObjects';
import { CommandPaletteMenuType } from '../../helper/constants';
import { settings } from '../../helper/gameSignals';

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
                <span 
                    key={value} 
                    onClick={() => {
                        settings.value = {
                            ...settings.value,
                            [setting._Key]: value
                        }
                    }}
                    className={settings.value[setting._Key] === value ? "active" : ""}
                >{key}</span>
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
                    <span 
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
                    >{key}</span>
                ))
            }
        </StyledMultiInputSetting>
    )
}

const ToggleInputSetting = ({setting}) => {
    return (
        <StyledToggleInputSetting>
            <span 
                onClick={() => settings.value = {
                    ...settings.value,
                    [setting._Key]: true
                }} 
                className={settings.value[setting._Key] ? "active" : ""}
            >On</span>
            <span
                onClick={() => settings.value = {
                    ...settings.value,
                    [setting._Key]: false
                }} 
                className={!settings.value[setting._Key] ? "active" : ""}
            >Off</span>
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

const StyledSettingsPage = styled.div`
    margin: 0 10%;
    display: flex;
    flex-direction: column;
    ${getAlignMent}

    font-size: 1.2em;
    color: #555;
    font-family: 'Consolas', 'Courier New', monospace;

    @media (max-width: 700px) {
        width: 90%;
        margin: 0 5%;
        p {
            grid-column: 1 / span 2;
        }
    }
`

const StyledSettingsItem = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 10px;
    max-width: 800px;

    h2 {
        margin-top: 20px;
        grid-column: 1 / span 2;
    }
`

const StyledSingleInputSetting = styled.select`
    width: 300px;
    height: 30px;
    background-color: #fff;
    border: 1px solid #555;
    border-radius: 8px;
    height: 40px;
    font-size: 0.8em;
    place-self: center;

    @media (max-width: 700px) {
        grid-column: 1 / span 2;
    }
`

const StyledToggleInputSetting = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
gap: 20px;
place-self: center;

span {
    width: 50%;
    text-align: center;
    place-self: center;
    display: flex;

    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 8px;
    padding: 10px;
    border: 1px solid #555;
}

@media (max-width: 700px) {
    grid-column: 1 / span 2;
}


span.active {
    background-color: #555;
    color: #fff;
}
`

const StyledMultiInputSetting = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    grid-column: 1 / span 2;
    margin-bottom: 20px;
    span {
        min-width: 150px;
        display: flex;
        vertical-align: middle;
        justify-content: center;
        align-items: center;
        flex: 1 1 0px;
        text-align: center;
        padding: 10px;
        border: 1px solid #555;
        border-radius: 8px;
        cursor: pointer;
    }

    @media (max-width: 700px) {
        grid-column: 1 / span 2;
    }

    span.active {
        background-color: #555;
        color: #fff;
    }
`

export default SettingsPage