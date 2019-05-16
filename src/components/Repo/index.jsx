import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { RepoRequestAction } from './actions';
import { Link } from 'react-router-dom';

class Repo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTermValue: ''
    }
    this.searchTerm = this.searchTerm.bind(this);
    this.searchExecute = this.searchExecute.bind(this);
  }
  componentDidMount() {
    const { params } = this.props.location;
    const requestType = 'get';
    this.props.RepoRequestAction(params, requestType);
  }

  searchTerm(event) {
    this.setState({ searchTermValue: event.target.value });
  }

  searchExecute() {
    const { params } = this.props.location;
    const requestType = 'search';
    const finalSearchTerm = this.state.searchTermValue.replace(/\s/g, '+');
    this.props.RepoRequestAction(params, requestType, finalSearchTerm);
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
                <Link className="waves-effect waves-light btn-large blue" to={"/"}>
                  VOLTAR
                </Link>
              </div>
            </div>
          </div>
          <div className="col s9">
            <label className="col s12">Pesquise pela descrição do commit</label>
            <div className="col s6">
              <input type="text" placeholder="Digite o termo de busca" onChange={this.searchTerm} />
            </div>
            <div className="col s3">
              <button
                type="submit"
                className="btn orange"
                onClick={this.searchExecute}
              >
                Buscar
              </button>
            </div>
            <div className="col s12">
              <h5>Últimos commits do repositório: {repoName}</h5>
              <ul className="collection">
                  {!isEmpty(repoDetails) ?
                    repoDetails.map(commits => (
                      <li className="collection-item">
                        <h6>{commits.commitMessage.length > 200 ?
                              `${commits.commitMessage.substring(0, 200)}[...]`
                              : commits.commitMessage}
                        </h6>
                        <b>Author:</b> {commits.authorName}
                        <br />
                        <b>Email:</b> {commits.authorEmail}
                      </li>
                    ))
                  : ''}
              </ul>
            </div>
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