import { App, Editor, MarkdownView, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { Prec, Extension } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { AlgorithmSuggestor } from 'src/auto_complete';
import { commandMap } from 'src/commands';

export default class CalloutsAlgorithm extends Plugin {
  lversion = this.manifest.version;

  private readonly makeExtension = (): Extension => Prec.high(keymap.of([
    {
      key: "Space",
      run: (): boolean => {
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!view) return false;

        const editor = view.editor;

        const cursorPlace = editor.getCursor();
        const line = editor.getLine(cursorPlace.line)
        const commandCutoff = this.getCommand(line.slice(0, cursorPlace.ch));

        if (commandCutoff === null) return false;

        const command = line.slice(commandCutoff, cursorPlace.ch).toLowerCase();
        let prefix = line.slice(0, commandCutoff);

        editor.replaceRange(commandMap[command], { line: cursorPlace.line, ch: commandCutoff }, { line: cursorPlace.line, ch: cursorPlace.ch });
        editor.setCursor({ line: cursorPlace.line, ch: commandMap[command].length + commandCutoff });
        return true;
      }
    },
    {
      key: "Shift-Tab",
      run: (): boolean => {
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!view) return false;

        const editor = view.editor;

        const currLine = editor.getLine(editor.getCursor().line);

        editor.setSelection({ line: editor.getCursor().line, ch: 0 });
        editor.replaceSelection(">");
        editor.setCursor({ line: editor.getCursor().line, ch: 0 });

        return true;
      }

    }
  ]));

  async onload() {
    console.log("Loading Callouts Algorithms");
    this.registerEditorExtension(this.makeExtension());

    this.registerEditorSuggest(new AlgorithmSuggestor(this));
  }

  onunload() {
    console.log("Closing Callouts Algorithms")
  }

  private getCommand = (str: string) => {
    for (let i = str.length - 1; i >= 0; i--) {
      if (str[i] === "\\") {
        for (let j = 0; j < i; j++) {
          if (str[j] !== '>') {
            return null;
          }
        }
        return i;
      }
    }
    return null;
  }
}

