import React, { useEffect } from 'react'
import styled from 'styled-components'
import * as SettingsObjects from '../../helper/settingsObjects';
import { CommandPaletteMenuType } from '../../helper/constants';
import { defaultSettings, settings, user } from '../../helper/gameSignals';
import { logout, startLogin } from '../../helper/authHelper';
import { useTranslation } from 'react-i18next';
import { backendUrl } from '../../helper/backendUrl';
import { ArrowUpFromLine, Home, Search  } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import WarningButton from '../WarningButton';
import { Link as LinkIcon} from 'lucide-react';
import InputSlider from '../InputSlider';
import InputText from '../InputText';

const SingleInputSetting = ({setting, t}) => {
    const checkSelected = (value) => settings.value[setting._Key] === value

    return (<>
    
    {Object.entries(setting).filter(([key]) => !key.startsWith("_")).length > 3 ? 

        (setting._Key === SettingsObjects.SoundVolume._Key ?
            <InputSlider 
            value={settings.value[setting._Key] * 100}
            type="range" step="10" min="0" max="100" onInput={(e) => {
                console.log(e.target.value);
                console.log(settings.value[setting._Key])
                settings.value = {
                    ...settings.value,
                    [setting._Key]: e.target.value / 100
                }}}/>
            :
        <StyledSingleInputSetting 
            value={settings.value[setting._Key]}
        onChange={(e) => 
            settings.value = {
                ...settings.value,
                [setting._Key]: e.target.value
            }
        }>
            {Object.entries(setting)
                .filter(([key]) => !key.startsWith("_"))
                .map(([key, value]) => (<option key={value} value={value}>{t(value)}</option>))
            }
        </StyledSingleInputSetting> )
        
        :

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
                >{t(value)}</StyledOption>
            ))
        }
        </StyledMultiInputSetting>
        }
        </>
    
    )
}

const MultiInputSetting = ({setting, t}) => {
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
                    >{t(value)}</StyledOption>
                ))
            }
        </StyledMultiInputSetting>
    )
}

const ToggleInputSetting = ({setting, t}) => {
    return (
        <StyledToggleInputSetting>
            <StyledOption 
                onClick={() => settings.value = {
                    ...settings.value,
                    [setting._Key]: true
                }} 
                className={settings.value[setting._Key] ? "active" : ""}
            >{t('on')}</StyledOption>
            <StyledOption
                onClick={() => settings.value = {
                    ...settings.value,
                    [setting._Key]: false
                }} 
                className={!settings.value[setting._Key] ? "active" : ""}
            >{t('off')}</StyledOption>
        </StyledToggleInputSetting>
    )
}

const copySettingUrl = (setting, t) => {
    let url = window.location.href;
    if(url.includes("#")) {
        url = url.substring(0, url.indexOf("#"));
    }
    url += `#/settings#${setting}`;
    navigator.clipboard.writeText(url);
    toast(t('Setting URL copied to clipboard'))
}

const SettingsPage = () => {

    const { t } = useTranslation();

    const generateSetting = (setting) => {
        return (
            <StyledSettingsItem key={setting._Key} id={setting._Key}>
                <div className='title'>
                    <h2>{setting._Name[settings.value[SettingsObjects.DisplayLanguage._Key]]}</h2>
                    <LinkIcon onClick={() => copySettingUrl(setting._Key, t)}/>
                </div>
                <p>{setting._Description[settings.value[SettingsObjects.DisplayLanguage._Key]]}</p>
                {setting._Type === CommandPaletteMenuType.Single && <SingleInputSetting setting={setting} t={t}/>}
                {setting._Type === CommandPaletteMenuType.Multi && <MultiInputSetting setting={setting}   t={t}/>}
                {setting._Type === CommandPaletteMenuType.Toggle && <ToggleInputSetting setting={setting} t={t}/>}
            </StyledSettingsItem>
        )
    }
    
    const generateSettings = (search) => {
        return Object.keys(SettingsObjects)
            .map((key) => SettingsObjects[key])
            .filter((setting) =>  {
                if(search === '') {
                    return true;
                }
                return setting._Name[settings.value[SettingsObjects.DisplayLanguage._Key]].toLowerCase().includes(search.toLowerCase()) 
                || setting._Description[settings.value[SettingsObjects.DisplayLanguage._Key]].toLowerCase().includes(search.toLowerCase()) 
                || setting._Key.toLowerCase().includes(search.toLowerCase())
                || Object.keys(setting).filter((key) => !key.startsWith("_")).some((key) => key.toLowerCase().includes(search.toLowerCase()))
            })
            .map((setting) => generateSetting(setting))
    }

    const [search, setSearch] = React.useState('');

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const resetSettings = () => {
        settings.value = defaultSettings;
        if(user.value) {
            fetch(`${backendUrl()}/api/setting/reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => {
                if(res.ok) {
                    toast(t("Setting reset was successful"))
                }
            }).catch((err) => {
                console.log(err);
                toast.error(t("Setting reset was not successful"))
            })
        }
    }

    useEffect(() => {
        let elementId = window.location.hash.substring(1); // Get the hash from the URL and remove the '#'
        if(elementId.includes("#")) {
            elementId = elementId.substring(elementId.indexOf("#") + 1);
        }
        const element = document.getElementById(elementId);
        if (element) element.scrollIntoView();
    }, []);

    return (
        <StyledSettingsPage>
            <ArrowUpFromLine className='floatButton right' onClick={() => window.scrollTo(0, 0)}/>
            <Link  to="/">
                <Home className='floatButton left'/>
            </Link>
            <div className='header'>
                <h1>{t('Settings')}</h1>
                <InputText icon={<Search />} type="text" placeholder={t('Search') + ' ...'} value={search} onChange={handleSearch} />
            </div>
        {generateSettings(search)}
        {user.value ?
            <StyledSettingsItem id="logout">
                <div className='title'>
                    <h2>{t('Account')}</h2>
                    <LinkIcon onClick={() => copySettingUrl("logout", t)}/>
                </div>
                <p>{t('logoutMessage')}</p>
                <StyledOption onClick={() => logout()}>{t('Logout')}</StyledOption>
            </StyledSettingsItem>
            :
            <StyledSettingsItem id="login">
                <div className='title'>
                    <h2>{t('Account')}</h2>
                    <LinkIcon onClick={() => copySettingUrl("login", t)}/>
                </div>
                <p>{t('loginMessage')}</p>
                <StyledMultiInputSetting>
                    <StyledOption onClick={() => startLogin('github')}>{t('Login Github')}</StyledOption>
                    <StyledOption onClick={() => startLogin('discord')}>{t('Login Discord')}</StyledOption>
                    <StyledOption onClick={() => startLogin('twitch')}>{t('Login Twitch')}</StyledOption>
                    <StyledOption onClick={() => startLogin('google')}>{t('Login Google')}</StyledOption>
                </StyledMultiInputSetting>
            </StyledSettingsItem>
        }
        <StyledSettingsItem id="resetSettings">
            <div className='title'>
                <h2>{t('Reset Settings')}</h2>
                <LinkIcon onClick={() => copySettingUrl("resetSettings", t)}/>
            </div>
            <p>{t('resetSettingsMessage')}</p>
        
                <WarningButton callback={() => resetSettings()} text={t('Reset')} color="#ff0000"/>
        </StyledSettingsItem>
        </StyledSettingsPage>

    )}

export function getAlignment() {
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
    ${getAlignment}
    margin: 0 10%;
    display: flex;
    flex-direction: column;
    max-width: 700px;

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

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .floatButton {
        position: fixed;
        bottom: 20px;
        width: 32px;
        height: 32px;
        overflow: visible;
        cursor: pointer;
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.background};
        transition: transform 0.2s ease-in-out;
        border-radius: 50%;
        padding: 10px;
        &:hover {
            color: ${props => props.theme.colors.highlight};
            background-color: ${props => props.theme.colors.secondary};
            transform: scale(1.1);
        }
    
    }
    .right {
        right: 20px;
    }
    .left {
        left: 20px;
    }
`

export const StyledSettingsItem = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 10px;
    max-width: 800px;
    margin: 20px 0;

    .wide {
        grid-column: 1 / span 2;
    }

    .title {
        grid-column: 1 / span 2;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;

        svg {
            opacity: 0.4;
            width: 16px;
        }
        svg:hover {
            opacity: 1;
        }
    }
`

const StyledSingleInputSetting = styled.select`
    width: 300px;
    height: 30px;
    background-color: ${props => props.theme.colors.background};
    border: 1px solid ${props => props.theme.colors.primary};
    border-radius: 8px;
    height: 40px;
    font-size: 1em;
    place-self: center;
    cursor: pointer;

    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.primary};

    @media (max-width: ${props => props.theme.screens.mobile}) {
        grid-column: 1 / span 2;
    }

    & > option::hover {
        background-color: yellow !important;
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
    transition: transform 0.2s ease-in-out;
    &.active {
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.background};
    }
    cursor: pointer;

    &.warning {
        color: red;
        border: 3px solid red;
        transition: background-color 5s ease-in-out;
    }

    &.warning:hover {
        background-color: red;
        // color: ${props => props.theme.colors.background};
    }
`

export default SettingsPage