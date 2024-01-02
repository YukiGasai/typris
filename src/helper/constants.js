export const GameState = {
	Menu: Symbol("menu"),
	Over: Symbol("over"),
	Playing: Symbol("playing"),
	Paused: Symbol("paused"),
}

export const CommandPaletteMenuType = Object.freeze({
	Single: "single",
	Multi: "multi",
	Toggle: "toggle",
})