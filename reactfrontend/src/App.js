import './App.css';
import react, { useState } from 'react'
import axios from 'axios';

function App() {

  //const API_URL = "https://39568c37e8fd.ngrok.io"
  const API_URL = "http://localhost:3001"
  const [image,setImage] = useState({
    link : "", imageFormObj: null,
  })

  const [dataState, updateDataState] = useState({
    imagesAvailable: false,
    data : []
  })
  const getImage = (e) => {
      let _imageFormObj = new FormData();
      _imageFormObj.append("name", "coinsearchersimage-" + Date.now());
      _imageFormObj.append("url", e.target.files[0]);
      // stores a readable instance of 
      // the image being uploaded using multer
      setImage({
        link: URL.createObjectURL(e.target.files[0]),
        imageFormObj: _imageFormObj
      });

    }

    const uploadImage = () =>{
      console.log(image.imageFormObj)
      if(image.imageFormObj!== null){
        axios.post(`${API_URL}/image/upload`, image.imageFormObj)
        .then((data) => {
          if (data) {
            alert("Image has been successfully uploaded");
            getAllImages();
            setImage({
              link : "", imageFormObj: null,
            })
          }
        })
        .catch((err) => {
          alert("Error while uploading image");
        });
      }else{
        console.log("image is null")
      }
      
    }

    const getAllImages =() => {
      axios.get(`${API_URL}/images/all`).then((response)=>{
        console.log(response)
        if(response.status === 200){
            updateDataState({
              imagesAvailable: true,
              data : response.data.data
            })
        }
      })
      .catch((err)=>{console.log("error on getting images: "+err)})
    }

    const deleteImage = (name) => {
      if(window.confirm("confirm delete")){
        axios.delete(`${API_URL}/image/delete?name=${name}`)
      .then((response)=>{alert('image deleted'); getAllImages()})
      .catch((err)=> alert('an error occured'))
      }
    }

    console.log(dataState.data)

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

        <div className="image-container" >
         <div onClick={()=>getAllImages()} className="getBut">view images</div>
         <div className="image_show">
          
            {
              dataState.imagesAvailable && dataState.data.map((image, index)=><img onClick = {()=>deleteImage(image.name)} className="served_img"  key = {index} alt = "" src ={`${API_URL}/image?name=${image.name}`}/>)
            }
          </div>
         
        </div>

      </div>
      </div>
    </div>
  );
}

export default App;
