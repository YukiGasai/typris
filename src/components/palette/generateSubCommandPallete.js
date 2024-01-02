import { CommandPaletteMenuType } from "../../helper/constants";
import { settings } from "../../helper/gameSignals";
import { toast } from 'react-toastify';


export const getSubCommands = (settingsEnum, setOpen) => {
    switch (settingsEnum._Type) {
        case CommandPaletteMenuType.Single:
            return getSingleSelection(settingsEnum, setOpen);
        case CommandPaletteMenuType.Multi:
            return getMultiSelection(settingsEnum, setOpen);
        case CommandPaletteMenuType.Toggle:
            return getToggle(settingsEnum, setOpen);
        default:
            return [];
    }
}

export const getSingleSelection = (settingsEnum, setOpen) =>
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
          setOpen(false);
        }
      }
    )
)

export const getMultiSelection = (settingsEnum, setOpen) =>
  Object.entries(settingsEnum)
    .filter(([key]) => !key.startsWith("_"))
    .map(([key, value]) => (
      {
        name: key,
        active: settings.value[settingsEnum._Key].includes(value),
        command: () => {
            if(settings.value[settingsEnum._Key].includes(value)) {
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

export const getToggle = (settingsEnum, setOpen) => [
    {
        name: "On",
        active: settings.value[settingsEnum._Key],
        command: () => {
          settings.value = {
            ...settings.value,
            [settingsEnum._Key]: true,
          };
          toast(`${settingsEnum._Name} enabled`);
          setOpen(false);
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
          setOpen(false);
        }
      }
]