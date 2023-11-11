const initialCommandMap: { [key: string]: string } = {
  // Algorithm commands
  "\\algorithm": ">[!algorithm] ",

  // Math commands
  "\\definition": `>[!math|{"type":"definition","number":"auto","setAsNoteMathLink":false}] Definition. `,
  "\\theorem": `>[!math|{"type":"theorem","number":"auto","setAsNoteMathLink":false}] Theorem. `,
  "\\proposition": `>[!math|{"type":"proposition","number":"auto","setAsNoteMathLink":false}] Proposition. `,

  // other commands
  "\\example": `>[!example]`,
}

const commandMap: { [key: string]: string } = {
  ...initialCommandMap,
  // Algorithm commands
  "\\input": ">[!input] **Input:** ",
  "\\output": ">[!output] **Output:** ",
  "\\ensure": ">[!ensure] **Ensure:** ",
  "\\state": ">[!codeblock]",
  "\\for": ">[!loop] for ",
  "\\while": ">[!loop] while ",
  "\\if": ">[!if] if ",
  "\\else": ">[!else] else ",
  "\\elif": ">[!elif] elif ",
};

export { commandMap, initialCommandMap };
