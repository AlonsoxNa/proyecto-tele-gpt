interface CarruselItemProps {
  image: string;
  label: string;
  text: string;
}

export const CarruselItem = ( { image, label, text }: CarruselItemProps ) => {

  return (
    <div className="carousel-item active">
      <img
        src={ image }
        className="d-block w-100 vh-100"
        alt="Coronel rene"
      />
      <div className="carousel-caption d-none d-md-block">
        <h5>{ label }</h5>
        <p>{ text }</p>
      </div>
    </div>
  );
};