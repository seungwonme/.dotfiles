"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.outputChannel = void 0;
const vscode = require("vscode");
const cp = require("child_process");
const os = require("node:os");
exports.outputChannel = vscode.window.createOutputChannel('42-c-format');
class DocumntFormattingEditProvider {
    provideDocumentFormattingEdits(document, options, token) {
        return this.formatDocument(document, options, token);
    }
    provideDocumentRangeFormattingEdits(document, _, options, token) {
        return this.formatDocument(document, options, token);
    }
    getEdits(document, formatedContent) {
        return new Promise((resolve, _) => {
            let currentEdit;
            let firstLine = document.lineAt(0);
            let lastLine = document.lineAt(document.lineCount - 1);
            // currentEdit = new vscode.TextEdit(new vscode.Range(firstLine.range.start, lastLine.range.end), formatedContent);
            currentEdit = vscode.TextEdit.replace(new vscode.Range(firstLine.range.start, lastLine.range.end), formatedContent);
            resolve([currentEdit]);
        });
    }
    formatDocument(document, _, token) {
        return new Promise((resolve, reject) => {
            let textContent = document.getText();
            let stdout = '';
            let stderr = '';
            let child = cp.spawn((os.platform() === 'win32') ? 'python' : 'python3', ['-m', 'c_formatter_42'], { cwd: vscode.workspace.rootPath });
            child.stdin.end(textContent);
            child.stdout.on('data', chunk => stdout += chunk);
            child.stderr.on('data', chunk => stderr += chunk);
            child.on('error', err => {
                if (err && err.code === 'ENOENT') {
                    vscode.window.showInformationMessage('c_formatter_42 is not executable. Please install c_formatter_42. Please read README and check requirements.');
                    return resolve([]);
                }
                return reject(err);
            });
            child.on('close', code => {
                try {
                    if (stderr.length !== 0) {
                        exports.outputChannel.show();
                        exports.outputChannel.clear();
                        exports.outputChannel.appendLine(stderr);
                        exports.outputChannel.appendLine('42-c-format: Please read README and check requirements.');
                        return reject('c_formatter_42 error');
                    }
                    if (code !== 0) {
                        return reject();
                    }
                    return resolve(this.getEdits(document, stdout));
                }
                catch (e) {
                    reject(e);
                }
            });
            if (token) {
                token.onCancellationRequested(() => {
                    child.kill();
                    reject('Canceled.');
                });
            }
        });
    }
}
function activate(context) {
    let formatter = new DocumntFormattingEditProvider();
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider({ language: 'c', scheme: 'file' }, formatter));
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider({ language: 'cpp', scheme: 'file' }, formatter));
    context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider({ language: 'c', scheme: 'file' }, formatter));
    context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider({ language: 'cpp', scheme: 'file' }, formatter));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map