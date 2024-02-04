const initialCommandMap: { [key: string]: string } = {
  // Algorithm commands
  "\\algorithm": ">[!algorithm] ",

  // Math commands
  "\\definition": `>[!definition] `,
  "\\theorem": `>[!theorem] `,
  "\\proposition": `>[!proposition] `,
  "\\lemma": `>[!lemma] `,
  "\\claim": `>[!claim] `,

  // other commands
  "\\example": `>[!example]`,
}

const commandMap: { [key: string]: string } = {
  ...initialCommandMap,
  // Algorithm commands
  "\\initialization": ">[!init] **Initialization:** ",
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
