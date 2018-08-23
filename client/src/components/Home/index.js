import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

import { Grid, Header } from 'semantic-ui-react';

const mapStateToProps = state => ({
  ...state.main
})

const mapDispatchToProps = dispatch => ({
  onLoad: function(payload) {
    dispatch({ type: 'RETRIEVE_SINGLE_PRODUCT', payload})
  }
})

class Home extends React.Component {

  componentDidMount() {
    this.props.onLoad(agent.Eboards.single('mellow-board'))
  }

  render() {
    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column>
            <Header size='huge'>Home Page Whooo</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
