import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { NavLink, Link, Redirect } from 'react-router-dom'
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
  Search,
} from 'semantic-ui-react'
import _ from 'lodash';

import { boardType, terrainType } from '../../constants'

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

const src = 'https://www.mellowboards.com/out/pictures/zmbwysiwygeditor/Blog-Posts/mellow-electric-skateboard-what-is-an-electric-skateboard-1.jpg';

class Home extends Component {
  constructor() {
    super()

    this.state = { link: false, fixed: false }


    this.state = {
      link: false,
      fixed: false,
      boardType: 'skateboard',
    }


    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleOnBoardTypeSelect = this.handleOnBoardTypeSelect.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleNavClickAllProducts = this.handleNavClickAllProducts.bind(this);
    this.handleOnTextSearchChange = this.handleOnTextSearchChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  handleOnBoardTypeSelect(e, target) {
    this.props.onClearFilter()
    this.props.onFilterChange({ style: target.value, checked: true })
    this.setState({boardType: target.value})
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  handleResultSelect(event, data) {
    this.setState({ link: data.result.slug })
  }

  handleNavClick(event, data) {
    this.props.onClearFilter();
    this.props.onFilterChange({ style: data.name, checked: true });
  }

  handleNavClickAllProducts(event, data) {
    this.props.onClearFilter();
  }

  handleOnTextSearchChange(event, data) {
    this.props.fetchTextSearch(data.value)
  }

  renderBestDeals() {
    const { products } = this.props.products;

    const bestDeals = products.slice(0, 4).map((product, index) =>
      <Image bordered style={{width: '220px', height: '200px'}} src={product.image.source} />
    );

    return bestDeals;
  }

  render() {
    if (this.state.link) {
      return <Redirect push to={`/product/${this.state.link}`} />;
    }

    const renderedBestDeals = this.renderBestDeals();

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
            style={{ minHeight: 700, padding: '1em 0em', backgroundSize: 'cover', backgroundImage: "url('https://i.pinimg.com/originals/95/17/2c/95172c428ff98f0ec83d3e9679a863d5.jpg')" }}
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
                <Menu.Item as={NavLink} name='home' to='/'>
                  <img src='https://react.semantic-ui.com/logo.png' alt=''/>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/compare/top-electric-skateboards' name='skateboard' onClick={this.handleNavClickAllProducts}>
                  Electric Boards
                </Menu.Item>
                <Menu.Item as={NavLink} to='/compare/top-electric-longboards' name='longboard' onClick={this.handleNavClick}>
                  Electric Long Boards
                </Menu.Item>
                <Menu.Item as={NavLink} to='/compare/top-electric-pennyboards' name='pennyboard' onClick={this.handleNavClick}>
                  Electric Penny Boards
                </Menu.Item>
                <Menu.Item position='right'>
                  <Search
                    onSearchChange={_.debounce(this.handleOnTextSearchChange, 250, { leading: false })}
                    onResultSelect={this.handleResultSelect}
                    loading={this.props.fetching}
                    results={this.props.searchResults}
                    placeholder='Search...'
                  />
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
              <Link to={`/compare/top-electric-${this.state.boardType}s`}><Button size='big' color='green'>Find</Button></Link>
            </Container>
          </Segment>
        </Visibility>
        <Segment style={{ padding: '4em 0em' }} vertical>
          <Container>
          <Header as='h1' content="Explore Electric Skateboards"/>
            <Grid columns={4} container stackable>

              <Grid.Column>
                <br />
                <List link>
                  <Header as='h5' content='Top Brands'/>
                  <List.Item as={Link} to='/compare/top-boosted-electric-skateboards'><a href='/'>Boosted</a></List.Item>
                  <List.Item as={Link} to='/compare/top-evolve-electric-skateboards'><a href='/'>Evolve</a></List.Item>
                  <List.Item as={Link} to='/compare/top-inboard-electric-skateboards'>InBoard</List.Item>
                  <List.Item as={Link} to='/compare/top-halo-electric-skateboards'><a href='/'>Halo</a></List.Item>
                  <List.Item as={Link} to='/compare/top-soflow-skateboards'>So Flow</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
              <br />
                <List link>
                  <Header as='h5' content='Top Overall'/>
                  <List.Item as={Link} to='/compare/top-electric-longboards'>Electric Longboards</List.Item>
                  <List.Item as={Link} to='/compare/top-electric-pennyboards'>Electric Pennyboards</List.Item>
                  <br />
                  <List.Item as={Link} to='/compare/top-electric-skateboards-under-500'>Electric Skateboards Under 500</List.Item>
                  <List.Item as={Link} to='/compare/top-electric-skateboards-under-1000'>Electric Skateboards Under 1000</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
              <br />
                <List link>
                  <Header as='h5' content='Top Features'/>
                  <List.Item as={Link} to='/compare/top-boosted-electric-skateboards'>All Terrain</List.Item>
                  <List.Item as={Link} to='/compare/top-boosted-electric-skateboards'>Waterproof</List.Item>
                  <List.Item as={Link} to='/compare/top-boosted-electric-skateboards'>Travel Safe</List.Item>
                  <br />
                  <List.Item as={Link} to='/compare/top-boosted-electric-skateboards'>Fastest</List.Item>
                  <List.Item as={Link} to='/compare/top-boosted-electric-skateboards'>Longest Range</List.Item>
                  <List.Item as={Link} to='/compare/top-boosted-electric-skateboards'>Newest</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
              <br />
                <List link>
                <Header as='h5' content='Material Type'/>
                  <List.Item as={Link} to='/compare/top-boosted-electric-skateboards'>Bamboo</List.Item>
                  <List.Item as={Link} to='/compare/top-boosted-electric-skateboards'>Carbon Fiber</List.Item>
                  <List.Item as={Link} to='/compare/top-boosted-electric-skateboards'>Wood</List.Item>
                  <br />
                  <Header as='h5' content='Motor Type'/>
                  <List.Item as={Link} to='/compare/top-boosted-electric-skateboards'>Hub</List.Item>
                  <List.Item as={Link} to='/compare/top-boosted-electric-skateboards'>Belt</List.Item>
                </List>
              </Grid.Column>
            </Grid>
          </Container>
        </Segment>
        <Segment style={{ padding: '2em 0em'}} vertical>
          <Container>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Recent Best Deals
            </Header>
            <Image.Group size='small'>
              {renderedBestDeals}
            </Image.Group>
          </Container>
        </Segment>
      </Responsive>
    )
  }
}

export default Home;
