import { CommandPaletteMenuType } from "../../helper/constants";
import { settings } from "../../helper/gameSignals";
import { toast } from 'react-toastify';
import { commandList, openCommandPalette } from "./MainCommandPalette";
import { DisplayLanguage } from "../../helper/settingsObjects";


export const getSubCommands = (t) => {
    const settingsEnum = commandList.value;
    switch (settingsEnum._Type) {
        case CommandPaletteMenuType.Single:
            return getSingleSelection(settingsEnum, t);
        case CommandPaletteMenuType.Multi:
            return getMultiSelection(settingsEnum, t);
        case CommandPaletteMenuType.Toggle:
            return getToggle(settingsEnum, t);
        default:
            return [];
    }
}

export const getSingleSelection = (settingsEnum, t) =>
  Object.entries(settingsEnum)
    .filter(([key]) => !key.startsWith("_"))
    .map(([key, value]) => (
      {
        name: key,
        active: settings.value[settingsEnum._Key] === value,
        command: () => {
          settings.value = {
            ...settings.value,
            [settingsEnum._Key]: value,
          };
          toast(`${settingsEnum._Name[settings.value[DisplayLanguage._Key]]} ${t('set to')} ${key}`);
          openCommandPalette.value = false;
        }
      }
    )
)

export const getMultiSelection = (settingsEnum, t) =>
  Object.entries(settingsEnum)
    .filter(([key]) => !key.startsWith("_"))
    .map(([key, value]) => (
      {
        name: key,
        active: settings.value[settingsEnum._Key]?.includes(value),
        command: () => {
            if(settings.value[settingsEnum._Key]?.includes(value)) {
                settings.value = {
                    ...settings.value,
                    [settingsEnum._Key] : settings.value[settingsEnum._Key].filter(item => item !== value)
                }
                toast(`${t('Removed')} ${key} ${t('from')} ${settingsEnum._Name[settings.value[DisplayLanguage._Key]]}`);
            } else {
                settings.value =  {
                    ...settings.value,
                    [settingsEnum._Key]: [...settings.value[settingsEnum._Key], value]
                }
                toast(`${t('Added')} ${key} ${t('to')} ${settingsEnum._Name[settings.value[DisplayLanguage._Key]]}`);
            }
        }
      }
    )
)

export const getToggle = (settingsEnum, t) => [
    {
        name: t('on'),
        active: settings.value[settingsEnum._Key],
        command: () => {
          settings.value = {
            ...settings.value,
            [settingsEnum._Key]: true,
          };
          toast(`${settingsEnum._Name[settings.value[DisplayLanguage._Key]]} ${t('enabled')}`);
          openCommandPalette.value = false;
        }
      },
      {
        name: t('off'),
        active: !settings.value[settingsEnum._Key],
        command: () => {
          settings.value = {
            ...settings.value,
            [settingsEnum._Key]: false,
          };
          toast(`${settingsEnum._Name[settings.value[DisplayLanguage._Key]]} ${t('disabled')}`);
          openCommandPalette.value = false;
        }
      }
]