import { CommandPaletteMenuType } from "../../helper/constants";
import { settings } from "../../helper/gameSignals";
import { toast } from 'react-toastify';
import { commandList, openCommandPalette } from "./MainCommandPalette";


export const getSubCommands = () => {
    const settingsEnum = commandList.value;
    switch (settingsEnum._Type) {
        case CommandPaletteMenuType.Single:
            return getSingleSelection(settingsEnum);
        case CommandPaletteMenuType.Multi:
            return getMultiSelection(settingsEnum,);
        case CommandPaletteMenuType.Toggle:
            return getToggle(settingsEnum);
        default:
            return [];
    }
}

export const getSingleSelection = (settingsEnum) =>
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
          toast(`${settingsEnum._Name} set to ${key}`);
          openCommandPalette.value = false;
        }
      }
    )
)

export const getMultiSelection = (settingsEnum) =>
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
                toast(`Removed ${key} from ${settingsEnum._Name}`);
            } else {
                settings.value =  {
                    ...settings.value,
                    [settingsEnum._Key]: [...settings.value[settingsEnum._Key], value]
                }
                toast(`Added ${key} to ${settingsEnum._Name}`);
            }
        }
      }
    )
)

export const getToggle = (settingsEnum) => [
    {
        name: "On",
        active: settings.value[settingsEnum._Key],
        command: () => {
          settings.value = {
            ...settings.value,
            [settingsEnum._Key]: true,
          };
          toast(`${settingsEnum._Name} enabled`);
          openCommandPalette.value = false;
        }
      },
      {
        name: "Off",
        active: !settings.value[settingsEnum._Key],
        command: () => {
          settings.value = {
            ...settings.value,
            [settingsEnum._Key]: false,
          };
          toast(`${settingsEnum._Name} disabled`);
          openCommandPalette.value = false;
        }
      }
]