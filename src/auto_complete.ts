import {
  Editor,
  EditorPosition,
  EditorSuggest,
  EditorSuggestContext,
  EditorSuggestTriggerInfo,
  TFile,
} from "obsidian";

import CalloutsAlgorithm from "main";
import { commandMap } from "./commands";

export class AlgorithmSuggestor extends EditorSuggest<string> {
  plugin: CalloutsAlgorithm;

  constructor(plugin: CalloutsAlgorithm) {
    super(plugin.app);
    this.plugin = plugin;
  }

  onTrigger(
    cursor: EditorPosition,
    editor: Editor,
    file: TFile
  ): EditorSuggestTriggerInfo | null {
    // perf: Use the "\" to tell whether to return.
    const currentLineToCursor = editor
      .getLine(cursor.line)
      .slice(0, cursor.ch);
    const currentLineLastWordStart = currentLineToCursor.lastIndexOf("\\");
    // if there is no word, return null
    if (currentLineLastWordStart === -1) return null;

    for (let i = 0; i < currentLineLastWordStart; i++) {
      if (currentLineToCursor[i] !== ">") return null;
    }

    // If is within a LaTeX $$ wrap, return null
    const currentLineLastMoneyMark = currentLineToCursor.lastIndexOf("$");
    if (currentLineLastMoneyMark != -1) return null;

    return {
      start: { line: cursor.line, ch: currentLineLastWordStart },
      end: cursor,
      query: currentLineToCursor.slice(currentLineLastWordStart),
    };
  }

  getSuggestions(
    context: EditorSuggestContext
  ): string[] | Promise<string[]> {
    const query = context.query;

    const suggestions = this.algorithmKeywords.filter((value) =>
      value.toLowerCase().startsWith(query.toLowerCase())
    );

    return suggestions;
  }

  renderSuggestion(value: string, el: HTMLElement): void {
    el.addClass("suggestion");
    const suggestContent = el.createDiv({ cls: "suggestion-content" });
    suggestContent.setText(value);
  }

  selectSuggestion(value: string, evt: MouseEvent | KeyboardEvent): void {
    if (this.context) {
      const editor = this.context.editor;
      const suggestion = value;
      const start = this.context.start;
      const end = editor.getCursor();

      editor.replaceRange(suggestion, start, end);
      const newCursor = end;
      newCursor.ch = start.ch + suggestion.length;

      editor.setCursor(newCursor);

      this.close();
    }
  }

  private algorithmKeywords: string[] = Object.keys(commandMap);
}
