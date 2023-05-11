import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, children, isWithContainer }) => {

  useEffect(() => {

    if (!isOpen) return;

    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);

  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <section
      className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
      onClick={handleOverlay}
      >
      <div className={`${isWithContainer ? 'popup__container': ''} popup__container-${name}`}>
        {children}
        <button className="popup__close" type="button" onClick={onClose} />
      </div>
    </section>
  );
};

export default Popup;
