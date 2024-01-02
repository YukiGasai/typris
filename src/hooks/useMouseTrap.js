import mousetrap from "mousetrap";
import { useEffect } from "react";

/**
 * Use mousetrap hook from https://github.com/olup/react-hook-mousetrap updated to allow for multiple hotkeys
 */
export const useMouseTrap = (hotkeys) => {
  useEffect(() => {
    const refs = hotkeys.map(({ handlerKey, handlerCallback, evtType }) => {
      let actionRef = { current: handlerCallback };
      mousetrap.bind(handlerKey, (evt, combo) => {
        typeof actionRef.current === "function" && actionRef.current(evt, combo);
      }, evtType);
      return { handlerKey, actionRef };
    });

    return () => {
      refs.forEach(({ handlerKey }) => {
        mousetrap.unbind(handlerKey);
      });
    };
  }, [hotkeys]);
};