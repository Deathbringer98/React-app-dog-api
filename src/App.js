import React, { Component } from 'react';
import './App.css';
import Menu from './components/menu/Menu';
import Select from './components/select/Select';
import BreedImage from './components/breed-image/BreedImage';

class App extends Component {
  state = {
    breedsList: null,
    selectedBreed: null,
    imageCount: 1, // Set a default value
    error: false,
  };

  componentDidMount() {
    this.fetchAllBreeds();
  }

  fetchAllBreeds = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      if (response.ok) {
        const data = await response.json();
        this.setState({
          breedsList: Object.keys(data.message),
        });
      } else {
        this.setState({
          error: true,
        });
        alert('Sorry, can not display the data');
      }
    } catch (e) {
      this.setState({
        error: true,
      });
      alert('Sorry, can not display the data');
    }
  };

  selectHandler = (breed) => {
    this.setState({
      selectedBreed: breed,
    });
  };

  handleImageCountChange = (event) => {
    const count = parseInt(event.target.value, 10);
    this.setState({
      imageCount: count,
    });
  };

  render() {
    const { imageCount } = this.state;
    const labelStyle = {
      color: imageCount > 50 ? 'black' : 'white', // Change color based on the number of images
      // Add more styles as needed
    };

    return (
      <div className="App">
        <Menu />
        <Select
          breedsList={this.state.breedsList}
          onSelect={this.selectHandler}
          isError={this.state.error}
        />
        <label htmlFor="imageCount" style={labelStyle}>
          <center>Number of Images (1-100):</center>
        </label>
        <center><input
          type="number"
          id="imageCount"
          name="imageCount"
          min="0"
          max="101"
          value={this.state.imageCount}
          onChange={this.handleImageCountChange}
          required
        /></center>
        <BreedImage breed={this.state.selectedBreed} imageCount={this.state.imageCount} />
      </div>
    );
  }
}

export default App;
