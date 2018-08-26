import React, { Component } from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';

export default class ImageList extends Component {
  // renderImages() {
  //   const { additionalImages } = this.props.data;

  //   const renderImages = additionalImages.map((image, index) =>
  //     <Image key={index} src={image} />
  //   );

  //   return renderImages;
  // }

  render() {
    const { image } = this.props.data;
    // this.renderedImages = this.renderImages();

    return (
      <Grid columns={2}>
        <Grid.Column width={3}>
          {this.renderImages}
        </Grid.Column>
        <Grid.Column width={13}>
          <Image src={image} />
        </Grid.Column>
      </Grid>
    );
  }
}