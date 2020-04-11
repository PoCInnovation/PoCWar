import React, { Component } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

const languages = [
    "javascript",
    "java",
    "python",
    "xml",
    "ruby",
    "sass",
    "markdown",
    "mysql",
    "json",
    "html",
    "handlebars",
    "golang",
    "csharp",
    "elixir",
    "typescript",
    "css"
];

const themes = [
    "monokai",
    "github",
    "tomorrow",
    "kuroir",
    "twilight",
    "xcode",
    "textmate",
    "solarized_dark",
    "solarized_light",
    "terminal"
];

languages.forEach(lang => {
    require(`ace-builds/src-noconflict/mode-${lang}`);
    require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

const defaultValue = `function onLoad(editor) {
  console.log("i've loaded");
}`;
class App extends Component {
    onLoad() {
    }
    onChange(newValue) {
        this.setState({
            value: newValue
        });
    }

    onSelectionChange(selection) {
    }

    onCursorChange(newValue, event) {
    }

    onValidate(annotations) {
        console.log("fesfessfefsesef");
    }

    setPlaceholder(e) {
        this.setState({
            placeholder: e.target.value
        });
    }
    setTheme(e) {
        this.setState({
            theme: e.target.value
        });
    }
    setMode(e) {
        this.setState({
            mode: e.target.value
        });
    }
    setBoolean(name, value) {
        this.setState({
            [name]: value
        });
    }
    setFontSize(e) {
        this.setState({
            fontSize: parseInt(e.target.value, 10)
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            value: defaultValue,
            placeholder: "ecrire ici... gang gang",
            theme: "monokai",
            mode: "javascript",
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            fontSize: 14,
            showGutter: true,
            showPrintMargin: true,
            highlightActiveLine: true,
            enableSnippets: false,
            showLineNumbers: true
        };
        this.setPlaceholder = this.setPlaceholder.bind(this);
        this.setTheme = this.setTheme.bind(this);
        this.setMode = this.setMode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setFontSize = this.setFontSize.bind(this);
        this.setBoolean = this.setBoolean.bind(this);
    }
    render() {
        return (
            <div className="examples column">
                <h1>PoCWar</h1>
                <AceEditor
                    placeholder={this.state.placeholder}
                    mode={this.state.mode}
                    theme={this.state.theme}
                    name="blah2"
                    onLoad={this.onLoad}
                    onChange={this.onChange}
                    onSelectionChange={this.onSelectionChange}
                    onCursorChange={this.onCursorChange}
                    onValidate={this.onValidate}
                    value={this.state.value}
                    fontSize={this.state.fontSize}
                    showPrintMargin={this.state.showPrintMargin}
                    showGutter={this.state.showGutter}
                    highlightActiveLine={this.state.highlightActiveLine}
                    setOptions={{
                        useWorker: false,
                        enableBasicAutocompletion: this.state.enableBasicAutocompletion,
                        enableLiveAutocompletion: this.state.enableLiveAutocompletion,
                        enableSnippets: this.state.enableSnippets,
                        showLineNumbers: this.state.showLineNumbers,
                        tabSize: 2
                    }}
                />
            </div>
        );
    }
}
render(<App />, document.getElementById("root"));
export default App;
