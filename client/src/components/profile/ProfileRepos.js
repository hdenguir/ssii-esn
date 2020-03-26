import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { getGithubRepos } from '../../actions/profile';

const ProfileRepos = ({
  profile: { githubusername },
  repos,
  getGithubRepos
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    getGithubRepos(githubusername);
  }, [getGithubRepos, githubusername]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github" /> Github Repos
      </h2>
      {repos.length ? (
        repos.map(repo => (
          <div className="repo bg-white p-1 my-1" key={repo.id}>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              {repo.description && <p>{repo.description}</p>}
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light">
                  Forks:
                  {repo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>{t('NoGithub')} !!! </p>
      )}
    </div>
  );
};

ProfileRepos.propTypes = {
  profile: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired
};
const mapStateTopProps = state => ({
  repos: state.profile.repos
});
export default connect(mapStateTopProps, { getGithubRepos })(
  ProfileRepos
);
