import './App.css';
import react, { useState } from 'react'
import axios from 'axios';

function App() {

  const API_URL = "http://localhost:3001"

  const [image,setImage] = useState({
    link : ""
  })

  const getImage = (e) => {
      let imageFormObj = new FormData();
      imageFormObj.append("imageName", "coinsearchersimage-" + Date.now());
      imageFormObj.append("imageData", e.target.files[0]);

      // stores a readable instance of 
      // the image being uploaded using multer
      setImage({
        link: URL.createObjectURL(e.target.files[0])
      });

    }

    const uploadImage = () =>{
      if(image.link!== ''){
        axios.post(`${API_URL}/image/upload`, image.link)
        .then((data) => {
          if (data.data.success) {
            alert("Image has been successfully uploaded");
          }
        })
        .catch((err) => {
          alert("Error while uploading image");
        });
      }else{
        console.log("image is null")
      }
      
    }

  return (
    <div className="App">
      <div className="maindiv">
        <div className="main-container">
        <h3 className="main-heading"> React Upload files:</h3>

        <div className="image-container">
          <div className="process">
            <p className="process__details">Uploading a user selected image to our node server</p>

            <img src={image.link} alt="upload-image" className="process__image" />
            <input type="file" className="process__upload-btn" onChange = {(e) => getImage(e)} />
            <div className="submit" onClick={()=>{uploadImage()}}>upload</div>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}

export default App;
