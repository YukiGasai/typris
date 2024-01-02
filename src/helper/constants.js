export const GameState = {
	Menu: Symbol("menu"),
	Over: Symbol("over"),
	Playing: Symbol("playing"),
	Paused: Symbol("paused"),
}

export const CommandPaletteMenuKeys = {
	Main: Symbol("main"),
	Language: Symbol("language"),
	Difficulty: Symbol("difficulty"),
	Audio: Symbol("audio"),
	KeyInputDisplay: Symbol("keyInputDisplay"),
	DisplayList: Symbol("displayList"),
	TypingDisplayStyle: Symbol("typingDisplayStyle"),
	AlignGame: Symbol("alignGame"),
	TextCasing: Symbol("textCasing"),
	TetrisInputConfig: Symbol("tetrisInputConfig"),	
}

export const TypingDisplayStyleOptions =  Object.freeze({
	_Key: "typingDisplayStyle",
	Fancy: "fancy",
	Simple:"simple",
});