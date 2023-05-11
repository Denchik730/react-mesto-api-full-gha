
const MenuMobile = (props) => {
  return (
    <section className={`menu-mobile ${props.isMobileMenuOpen && 'menu-mobile_opened'}`}>
      <h2 className="menu-mobile__email">{props.emailUser}</h2>
      <button onClick={props.handleSignout} className="menu-mobile__sign-out">Выйти</button>
    </section>
  );
};

export default MenuMobile;
