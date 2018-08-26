import React, { Component } from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';
import ReactImageMagnify from 'react-image-magnify';

export default class ImageList extends Component {
  renderImages() {
    // const { additionalImages } = this.props.images;
    const { image } = this.props.images;

    const renderImages =
    // = additionalImages.map((image, index) =>
      <Image src={image} />;
    // );

    return renderImages;
  }

  render() {
    const { image } = this.props.images;
    this.renderedImages = this.renderImages();

    return (
      <Grid columns={2}>
        <Grid.Column width={3}>
          {this.renderedImages}
        </Grid.Column>
        <Grid.Column width={13}>
          <ReactImageMagnify {...{
            smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                src: image
            },
            largeImage: {
                src: image,
                width: 1200,
                height: 1800
            }
          }} />
        </Grid.Column>
      </Grid>
    );
  }
}

