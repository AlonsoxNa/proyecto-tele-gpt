import "./Carrusel.css"

interface CarruselItemProps {
  image: string;
  label: string;
  text: string;
  type: string;
}


export const CarruselItem = ( { image, label, type }: CarruselItemProps ) => {

  return (
    <div className="carousel-container">
      {
        type === 'video'?
        <>
          <div className="bg-image" style={{ backgroundImage: `url(/src/assets/logo.png)`,backgroundColor:"gray" }}></div>
        </>
        :<></>
      }
      <div className="bg-image" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="carousel-container justify-content-center d-flex">
          {type === 'video' && (
               <video id={`video-${label}`} controls loop muted autoPlay className="z-2" >
                    <source src={image} type="video/mp4" />
                </video> 
          )}
          {type === 'image' && (
              <img src={image}  alt="" className="d-block h-100 z-2" />
              )}
      </div>
      <div className="carousel-content">
          <span className="titulo-publicacion">{label}</span>
        </div>
    </div>
  );
};

 {/* <div className="carousel-container justify-content-center d-flex">
        <img
          src={ image }
          className="d-block h-100 "
          alt="Coronel rene"
        />
      </div>
      
      <div className="carousel-caption d-none d-md-block">
        <h5>{ label }</h5>
        <p>{ text }</p>
      </div> */}