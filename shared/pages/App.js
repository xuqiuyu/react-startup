import React from 'react';
import { object } from 'prop-types';
import { renderRoutes } from 'react-router-config';
// import { connect } from 'react-redux';
import Layout from '../components/layout';

// import * as action from '../shared/pages/test/action';
// import rootSaga from './rootSaga';

const App = ({ route }) => (
  <div>
    <Layout>
      {/* child routes won't render without this */}
      {renderRoutes(route.routes)}
    </Layout>
  </div>
);

// class App extends React.Component {
//   // static loadInitialData(store) {
//   //   const promise = store.runSaga(rootSaga).done;
//   //   store.dispatch(action.testAction());
//   //   // store.close()
//   //   return promise;
//   // }

//   // componentDidMount() {
//   //   this.props.testAction();
//   // }

//   render() {
//     return (
//       <div>
//         <h1>Root</h1>
//         {/* child routes won't render without this */}
//         {renderRoutes(this.props.route.routes)}
//       </div>
//     );
//   }
// }

App.propTypes = {
  route: object.isRequired
};

// export default connect(state=>({test: state.reducer.test.text}),{
//   testAction: action.testAction
// })(App);
export default App;
