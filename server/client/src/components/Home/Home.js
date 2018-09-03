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

const src = 'https://images.unsplash.com/photo-1506361797048-46a149213205?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=493e200df17b54d1ef10eb61e1df148a&w=1000&q=80'

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Find your Perfect Electric Board!'
      style={{
        fontSize: mobile ? '1em' : '2em',
        fontColor: 'black',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '5em',
      }}
    />
    <Dropdown placeholder='Board Type' closeOnBlur selection options={boardType} onChange={(x, y) => console.log(y.value)}/>{' '}
    <Dropdown
      placeholder='Terrain'
      closeOnBlur={false}
      selection
      options={terrainType}
    />
    <Button style={{marginLeft: '10px'}} size='big' color='green'>Find</Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  constructor(){
    super()

    this.state = { link: false }

    this.handleRedirect = this.handleRedirect.bind(this);
  }
  

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  handleRedirect() {
    this.setState({ link: true })
  }

  render() {
    const { children } = this.props
    const { fixed } = this.state

    if (this.state.link) {
      return <Redirect exact push to={`/compare`} />;
    }

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
              fixed={fixed ? 'top' : null}
              inverted={fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
              style={{border: 'none'}}
            >
              <Container>
                <Menu.Item>
                	<img src='https://react.semantic-ui.com/logo.png' />
              	</Menu.Item>
                <Menu.Item as='a'><Link to='/compare' style={{color: '#000'}}>Electric Boards</Link></Menu.Item>
                <Menu.Item as='a'><Link to='/compare' style={{color: '#000'}}>Electric Longboards</Link></Menu.Item>
                <Menu.Item as='a'><Link to='/compare' style={{color: '#000'}}>Electric Penny Boards</Link></Menu.Item>
                <Menu.Item position='right'>
                  <Input icon={{ name: 'search', circular: true, link: true }} placeholder='Search...' />
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
            <Menu.Item as='a' active>
              Home
            </Menu.Item>
            <Menu.Item as='a'>Work</Menu.Item>
            <Menu.Item as='a'>Company</Menu.Item>
            <Menu.Item as='a'>Careers</Menu.Item>
            <Menu.Item as='a'>Log in</Menu.Item>
            <Menu.Item as='a'>Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: '100vh' }}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>
                      Log in
                    </Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const Home = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Grid>
          <Grid.Column width={4}>
            <List link>
              <List.Item as='a'><a href='/'>Boosted</a></List.Item>
              <List.Item as='a'>InBoard</List.Item>
              <List.Item as='a'>So Flow</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={4}>
            <List link>
              <List.Item as='a'>Best Electric Boards</List.Item>
              <List.Item as='a'>Best Electric Longboards</List.Item>
              <List.Item as='a'>Best Electric Pennyboards</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={4}>
            <List link>
              <List.Item as='a'>Top Electric Boards</List.Item>
              <List.Item as='a'>Top Electric Longboards</List.Item>
              <List.Item as='a'>Top Electric Pennyboards</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={4}>
            <List link>
              <List.Item as='a'>Fastest Electric Boards</List.Item>
              <List.Item as='a'>Top Travel Friendly Electric Boards</List.Item>
              <List.Item as='a'>Best Waterproof Electric Boards</List.Item>
            </List>
          </Grid.Column>
        </Grid>
        <Divider/>
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
  </ResponsiveContainer>
)
export default Home;