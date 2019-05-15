import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, uniqueId } from 'lodash';
import { GitHubAppRequestAction } from './actions';

class GithubApp extends Component {
  componentDidMount() {
    this.props.GitHubAppRequestAction();
  }

  render() {
    const { 
      userDetailData: 
      { 
        name, 
        bio, 
        blog, 
        company, 
        avatar_url: avatarUrl, 
        html_url: profileUrl 
      }, userRepos 
    } = this.props;

    return (
      <div className="row user-detail">
        <div className="col s3">
          <div className="card grey lighten-2">
            <div className="card-content">
              <div className="row">
                {!isEmpty(avatarUrl) && <img src={avatarUrl} alt="Avatar" className="col s12" />}
                <ul className="collection col s12">
                  {!isEmpty(name) && (
                    <a target="_blank" rel="noopener noreferrer" href={profileUrl}>
                      <li className="collection-item">
                        <label htmlFor="first_name">Nome</label>
                        <br />
                        {name}
                      </li>
                    </a>
                  )}
                  {!isEmpty(bio) && (
                    <li className="collection-item">
                      <label htmlFor="first_name">Biografia</label>
                      <br />
                      {bio}
                    </li>
                  )}
                  {!isEmpty(blog) && (
                    <a target="_blank" rel="noopener noreferrer" href={blog}>
                      <li className="collection-item">
                        <label htmlFor="first_name">Blog</label>
                        <br />
                        {blog}
                      </li>
                    </a>
                  )}
                  {!isEmpty(company) && (
                    <li className="collection-item">
                      <label htmlFor="first_name">Empresa</label>
                      <br />
                      {company}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>  
        <div className="col s9">
          {!isEmpty(userRepos) &&
            <>
              <label>{`${name} Repositórios`}</label>
              <ul className="collection">
                {userRepos.map(repos => (
                  <li key={uniqueId('collection-item-')} className="collection-item">
                    <a target="_blank" rel="noopener noreferrer" href={repos.html_url}>
                      {repos.name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          }
        </div>
      </div>  
    )
  }
}

export default connect(
  state => ({
    userRepos: state.githubapp.userReposData,
    userDetailData: state.githubapp.userDetailData
  }),
  { GitHubAppRequestAction }
)(GithubApp);

GithubApp.propTypes = {
  GitHubAppRequestAction: PropTypes.func,
  userRepos: PropTypes.shape,
  userDetailData: PropTypes.shape
};

GitHubAppRequestAction.defaultProps = {
  GitHubAppRequestAction: () => {},
  userRepos: {},
  userDetailData: {}
};
