import Popup from './Popup';

import registerSuccess from '../images/poup-register-success.png';
import registerError from '../images/poup-register-error.png';

const InfoTooltip = (props) => {
  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose} isWithContainer={true}>
      <img className="popup__info-tooltip-image" src={props.isSuccessRegister ? registerSuccess : registerError} alt="" />
        <h2 className="popup__title-form popup__title-form_type_infotooltip">
          {props.isSuccessRegister ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
    </Popup>
  );
};

export default InfoTooltip;
