import React, { Component } from 'react';

class PopupInfo extends Component {
  renderPropertyImage() {
    const { image, userImage } = this.props.info;
    const style = {
      img: {
        width: 200,
        height: 200
      }
    }
    if (image) {
      if (Array.isArray(image.url)) {
        return <img src={image.url[0]} alt='property' className='img-fluid' style={style.img} />
      } else {
        return <img src={image.url} alt='property' className='img-fluid' style={style.img} />
      }
    }

    if (userImage) {
      return <img src={`https://s3-us-west-1.amazonaws.com/rem-bucket-9818/${userImage.url}`} alt='property' className='img-fluid' style={style.img} />
    }
  }

  render() {
    const { yearBuilt, finishedSize: { value }, fullAddress, rooms: { bedrooms, bathrooms } } = this.props.info;
    const [street, city, statezip] = fullAddress.split(', ');
    return (
        <div className='row'>
          <div className='col-sm-4'>
            {this.renderPropertyImage()}
          </div>
          <div className='col-sm-8'>
            <p>{`${street}, ${city}, ${statezip}`}</p>
            <p>Size: {value} SqFt</p>
            <p>Year Built: {yearBuilt}</p>
            <p>Bedrooms: {bedrooms}</p>
            <p>Bathrooms: {bathrooms}</p>
          </div>
        </div>
      );
    }
  }

export default PopupInfo;
