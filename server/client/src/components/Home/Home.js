import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Input,
} from 'semantic-ui-react'

import { boardType, terrainType } from '../../constants'

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

const src = "url('https://www.mellowboards.com/out/pictures/zmbwysiwygeditor/Blog-Posts/mellow-electric-skateboard-what-is-an-electric-skateboard-1.jpg')"

class Home extends Component {
  constructor() {
    super()
    
    this.state = { link: false, fixed: false }

    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleOnBoardTypeSelect = this.handleOnBoardTypeSelect.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleNavClickAllProducts = this.handleNavClickAllProducts.bind(this);
  }

  handleOnBoardTypeSelect(e, target) {
    this.props.onClearFilter()
    this.props.onFilterChange({ style: target.value, checked: true })
    this.setState({boardType: target.value})
  }
  
  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  handleRedirect() {
    this.setState({ link: true })
  }

  handleNavClick(event, data) {
    this.props.onClearFilter();
    this.props.onFilterChange({ style: data.name, checked: true });
  }

  handleNavClickAllProducts(event, data) {
    this.props.onClearFilter();
  }

  render() {
    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            as='div'
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em', backgroundImage: "url('https://i.pinimg.com/originals/95/17/2c/95172c428ff98f0ec83d3e9679a863d5.jpg')" }}
            vertical
          >
            <Menu
              fixed={this.state.fixed ? 'top' : null}
              inverted={this.state.fixed}
              pointing={!this.state.fixed}
              secondary={!this.state.fixed}
              size='large'
              style={{border: 'none'}}
            >
              <Container>
                <Menu.Item>
                  <img src='https://react.semantic-ui.com/logo.png' />
                </Menu.Item>
                <Menu.Item link onClick={this.handleNavClickAllProducts}>
                  <Link to='/compare'>Electric Boards</Link>
                </Menu.Item>
                <Menu.Item link name='longboard' onClick={this.handleNavClick}>
                  <Link to='/compare'>Electric Long Boards</Link>
                </Menu.Item>
                <Menu.Item link name='pennyboard' onClick={this.handleNavClick}>
                  <Link to='/compare'>Electric Penny Boards</Link>
                </Menu.Item>
                <Menu.Item position='right'>
                  <Input icon={{ name: 'search', circular: true, link: true }} placeholder='Search...' />
                </Menu.Item>
              </Container>
            </Menu>
            <Container text>
              <Header
                as='h1'
                inverted
                content='Find your Perfect Electric Skateboard!'
                style={{
                  fontSize: '2em',
                  fontWeight: 'normal',
                  marginBottom: 0,
                  marginTop: '5em',
                }}
              />
              <Dropdown
                placeholder='Board Type'
                selection
                options={boardType}
                onChange={this.handleOnBoardTypeSelect}
              />{' '}
              <Link to='/compare'><Button size='big' color='green'>Find</Button></Link>
            </Container>
          </Segment>
        </Visibility>
        <Segment style={{ padding: '4em 0em' }} vertical>
          <Container>
          <Header as='h2' content="Explore Electric Skateboards"/>
            <Grid columns={4} container stackable>
              <Grid.Column>
                <List link>
                  <List.Item as='a'><a href='/'>Boosted</a></List.Item>
                  <List.Item as='a'>InBoard</List.Item>
                  <List.Item as='a'>So Flow</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
                <List link>
                  <List.Item as='a'>Best Electric Boards</List.Item>
                  <List.Item as='a'>Best Electric Longboards</List.Item>
                  <List.Item as='a'>Best Electric Pennyboards</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
                <List link>
                  <List.Item as='a'>Top Electric Boards</List.Item>
                  <List.Item as='a'>Top Electric Longboards</List.Item>
                  <List.Item as='a'>Top Electric Pennyboards</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
                <List link>
                  <List.Item as='a'>Fastest Electric Boards</List.Item>
                  <List.Item as='a'>Top Travel Friendly Electric Boards</List.Item>
                  <List.Item as='a'>Best Waterproof Electric Boards</List.Item>
                </List>
              </Grid.Column>
            </Grid>
          </Container>
        </Segment>
        <Segment style={{ padding: '2em 0em' }} vertical>
          <Container text>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Did We Tell You About Our Bananas?
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
              it's really true. It took years of gene splicing and combinatory DNA research, but our
              bananas can really dance.
            </p>
            <Button as='a' size='large'>
              I'm Still Quite Interested
            </Button>
          </Container>
        </Segment>
      </Responsive>
    )
  }
}

export default Home;