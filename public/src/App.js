import React, {Component} from 'react';
import nodeFetch from 'node-fetch';
import config from './config';
import './App.css';

class App extends Component {
    state = {
        url: null,
        urls: [],
        issues: []
    };

    setIssues(value) {
        nodeFetch(config.API + '/project/issues?url=' + value)
            .then(async (res) => {
                const BODY = await res.json();

                this.setState({
                    issues: BODY.data.issues
                });
            }).catch((err) => {
            console.log(err);

            this.setState({
                issues: []
            });
        });
    }

    handleChange = (event) => {
        this.setIssues(event.target.value);
    };

    async componentDidMount() {
        try {
            const BODY = await nodeFetch(config.API + '/urls')
                .then(res => res.json());

            this.setState({
                urls: BODY.data || []
            });

            this.setIssues(BODY.data[0]);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className="App">
                <select value={this.state.url} onChange={this.handleChange}>
                    {
                        this.state.urls.map((e) => {
                            return <option value={e}>{e}</option>
                        })
                    }
                </select>

                <div>
                    {
                        this.state.issues.map((e) => {
                            return (
                                <article>
                                    <pre>{JSON.stringify(e, undefined, 4)}</pre>
                                </article>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default App;
