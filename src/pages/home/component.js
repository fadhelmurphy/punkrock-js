import React from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props, "INI PROPS COMP")
    return (
      <div className="home">
        <p className="home__title">
          Home LIVE SSR
          <br />
          {JSON.stringify(this.props.data)}
          <br /> {this.props.testData}
        </p>
      </div>
    );
  }
}

// const mapStateToProps = ({ home }) => ({
//   testData: home.data,
// });
// const mapDispatchToProps = () => ({});

export default Home;
