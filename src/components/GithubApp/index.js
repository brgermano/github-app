import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GitHubAppRequestAction } from './actions';

class GithubApp extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('this.props', this.props)
    this.props.GitHubAppRequestAction();
  }

  render() {
    return (
      <div className="App">
          <p>
            to aqui
          </p>
      </div>
    );
  }
}

export default connect(
  state => ({
    userInformation: state.githubapp.data
  }),
  { GitHubAppRequestAction }
)(GithubApp);
