import React, { Component } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import "./App.css"
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

const defaultValue = "function onLoad(editor) {\n" +
    "  console.log(\"i've loaded\");\n" +
    "}";

class App extends Component {
    onLoad() {
    }
    onChange(newValue) {
        this.state.code = newValue;
        console.log(this.state.code);
        this.setState({
            value: newValue
        });
    }

    send_to_back_end = () => {
        alert(this.state.code);
    }

    onSelectionChange(selection) {
    }

    onCursorChange(newValue, event) {
    }

    onValidate(annotations) {
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
            <div className="editor">
                <h1 className="title">PoCWar</h1>
                <div className="option-tools">
                <div className="column">
                    <div className="field">
                        <label>Language:</label>
                        <p className="control">
                          <span className="select">
                            <select
                                name="language"
                                onChange={this.setMode}
                                value={this.state.mode}
                            >
                              {languages.map(lang => (
                                  <option key={lang} value={lang}>
                                      {lang}
                                  </option>
                              ))}
                            </select>
                          </span>
                        </p>
                    </div>
                </div>
                <div className="field">
                    <label>Theme:</label>
                    <p className="control">
                 <span className="select">
                     <select
                         name="Theme"
                         onChange={this.setTheme}
                         value={this.state.theme}
                     >
                  {themes.map(lang => (
                      <option key={lang} value={lang}>
                          {lang}
                      </option>
                  ))}
                     </select>
                 </span>
                    </p>
                </div>
                    <div className="field">
                        <p className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={this.state.enableBasicAutocompletion}
                                    onChange={e =>
                                        this.setBoolean(
                                            "enableBasicAutocompletion",
                                            e.target.checked
                                        )
                                    }
                                />
                                Enable Basic Autocomplete
                            </label>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={this.state.enableLiveAutocompletion}
                                    onChange={e =>
                                        this.setBoolean(
                                            "enableLiveAutocompletion",
                                            e.target.checked
                                        )
                                    }
                                />
                                Enable Live Autocomplete
                            </label>
                        </p>
                    </div>
                </div>
                <div className="text-editor">
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
                <div className="sub">
                    <button onClick={this.send_to_back_end}>submit</button>
                </div>
            </div>
        );
    }
}
render(<App />, document.getElementById("root"));
export default App;
