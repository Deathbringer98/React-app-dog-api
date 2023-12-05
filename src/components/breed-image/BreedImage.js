import React, { Component } from 'react';
import './breed-image.css';

class BreedImage extends Component {
  state = {
    imageUrls: Array.from({ length: this.props.imageCount }, (_, index) => require('../../assets/custom.jpg')),
    selectedBreed: null
  };

  componentDidUpdate(prevProps) {
    if (this.props.breed !== prevProps.breed || this.props.imageCount !== prevProps.imageCount) {
      this.setState({
        selectedBreed: this.props.breed
      });
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    try {
      const response = await fetch(
        `https://dog.ceo/api/breed/${this.props.breed}/images/random/${this.props.imageCount}`
      );
      const data = await response.json();

      if (data.status === 'success') {
        this.setState({
          imageUrls: data.message
        });
      } else {
        console.error('Error fetching dog images:', data.message);
        // Handle error if needed
      }
    } catch (error) {
      console.error('Error fetching dog images:', error.message);
      // Handle error if needed
    }
  };

  render() {
    return (
      <div className="image-container">
        {this.state.imageUrls.map((imageUrl, index) => (
          <img key={index} className="image-card" alt={`dog-${index}`} src={imageUrl} />
        ))}
      </div>
    );
  }
}

export default BreedImage;
