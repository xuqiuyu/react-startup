// Real root part for a react app
// the page layout will be defined in this file

import React, { Component } from 'react';
import { node, func, bool, string, object } from 'prop-types';
// import { connect } from 'react-redux';
import { pieConnect } from 'za-piehelper';

import * as style from './layout.scss';
// import { Aside, Footer, Header, Loading, Message, SubHeader } from '../../components';
import Aside from '../../components/aside';
import Footer from '../../components/footer';
import Header from '../../components/header';

import './reset.scss';

class Layout extends Component {
  constructor() {
    super();
    this.errorClose = this.errorClose.bind(this);
    this.menuClick = this.menuClick.bind(this);
    this.messageClose = this.messageClose.bind(this);
    this.navToIndex = this.navToIndex.bind(this);
    this.navToMessageList = this.navToMessageList.bind(this);
  }

  componentDidMount() {
  }

  componentWillUpdate() {
    // if (!this.checkAuth()) checkSSO(this.props.loginSuccess);
  }

  checkAuth() {
    return (this.props.userName !== '');
  }

  errorClose() {
    this.props.resetError();
  }

  messageClose() {
    this.props.resetMessage();
  }

  menuClick(item) {
    const { keyPath } = item;
    let path = '/';
    if (Array.isArray(keyPath)) {
      path += keyPath.reverse().join('/');
    }
    this.props.navTo(path);
  }

  navToIndex() {
    this.props.navTo('/');
  }

  navToMessageList() {
    this.props.navTo('/userMessage');
  }
  render() {
    const {
      isFold = '',
      userCName = '',
      authInfo = '',
      env = '',
      toggleMenu = ''
    } = this.props;

    return (
      <div className={style.layout}>
        <section className={style.layoutMain}>
          <aside className={isFold ? style.collapseAside : style.layoutSider}>
            <nav>
              <Aside authInfo={authInfo} isFold={isFold} menuClick={this.menuClick} />
            </nav>
          </aside>
          <article className={isFold ? style.collapseContent : style.layoutContent}>
            {/* <header className={style.layoutHeader} > */}
            <Header
              userName={userCName}
              env={env}
              isFold={isFold}
              toggleMenu={toggleMenu}
              navToIndex={this.navToIndex}
              navToMessageList={this.navToMessageList}
            />
            {/* </header> */}
            <div className={style.scrollbar}>
              <article className={style.innerPage}>
                {this.props.children}
              </article>
              <footer>
                <Footer />
              </footer>
            </div>
          </article>
        </section>
      </div>
    );
  }
}

Layout.defaultProps = {
  loginSuccess: () => {},
  resetError: () => {},
  isFetching: false,
  errorMessage: '',
  successMessage: '',
  userName: '',
  userCName: '',
  authInfo: {},
  env: '',
  isFold: false,
  navTo: () => {},
  pathName: '',
  resetMessage: () => {},
  toggleMenu: () => {}
};

Layout.propTypes = {
  children: node.isRequired,
  loginSuccess: func,
  resetError: func,
  isFetching: bool,
  errorMessage: string,
  successMessage: string,
  userName: string,
  userCName: string,
  authInfo: object,
  env: string,
  isFold: bool,
  navTo: func,
  pathName: string,
  resetMessage: func,
  toggleMenu: func,
  loadUserMessageCount: func
};

export default pieConnect(
  (state) => {
    let errorMessage = state.errorMessage;

    if (errorMessage && errorMessage.message) errorMessage = errorMessage.message;

    const pathName = '';
    // state.routing.locationBeforeTransitions === null ? '' : state.routing.locationBeforeTransitions.pathname;
    return {
    //   isFetching: state.pagination.isFetching,
    //   errorMessage,
    //   successMessage: state.successMessage,
    //   userName: state.auth.userName,
    //   userCName: state.auth.userCName,
    //   authInfo: state.auth.authInfo,
    //   env: state.auth.env,
    //   isFold: state.pagination.isFold,
    //   pathName,
    //   userMessageCount: state.userMessageCount
    };
  }, {
  }
)(Layout);
