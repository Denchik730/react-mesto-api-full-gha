import Popup from "./Popup";

function ImagePopup({card, onClose}) {
  return (
    <Popup isOpen={card} onClose={onClose} name={'image'} isWithContainer={false}>
      <figure className="popup__place">
        <img
          src={card ? card.link : '#'}
          className="popup__place-image"
          alt={`Изображение ${card ? card.name : ''}`}/>
        <figcaption className="popup__place-descr">{card ? card.name : ''}</figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;
