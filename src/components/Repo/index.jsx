import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import { RepoRequestAction } from './actions';
import { Link } from 'react-router-dom';

class Repo extends Component {
  componentDidMount() {
    const { params } = this.props.location;
    this.props.RepoRequestAction(params);
  }

  render() {
    const { repoDetails, status } = this.props;
    const { params: repoName } = this.props.location;
    return (
      <>
        {status.loading && (
          <div className="row">
            <div className="progress blue lighten-3">
              <div className="indeterminate blue" />
            </div>
          </div>
        )}
        {!status.loading && (
        <div className="row">
          <div className="col s3">
            <div className="card grey lighten-2">
              <div className="card-content center">
                <Link className="waves-effect waves-light btn-large" to={"/"}>
                  VOLTAR
                </Link>
              </div>
            </div>
          </div>
          <div className="col s9">
            <h5>Últimos commits do repositório: {repoName}</h5>
            <ul className="collection">
                {repoDetails.map(commits => (
                  <>
                    <li key={uniqueId('collection-commits-items-')} className="collection-item">
                      <h6>{commits.commitMessage}</h6>
                      <b>Author:</b> {commits.authorName}
                      <br />
                      <b>Email:</b> {commits.authorEmail}
                    </li>
                  </>
                ))}
            </ul>
          </div>
        </div>
        )}
      </>
    )
  }
}

export default connect(
  state => ({
    repoDetails: state.repo.data,
    status: state.repo.status
  }),
  { RepoRequestAction }
)(Repo);
