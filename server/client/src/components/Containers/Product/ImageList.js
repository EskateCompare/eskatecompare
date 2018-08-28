import React, { Component } from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';
import ReactImageMagnify from 'react-image-magnify';

export default class ImageList extends Component {
  renderImages() {
    const { image, additionalImages } = this.props.images;

    const renderImages = additionalImages.map((image, index) =>
      <Image src={image.source} />
    );

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
                alt: '',
                isFluidWidth: true,
                src: image.source,
                isFluidWidth: true,
            },
            largeImage: {
                src: image.source,
                width: 1200,
                height: 1800,
                
            },
            isHintEnabled: true,
            lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
          }} />
        </Grid.Column>
      </Grid>
    );
  }
}

