import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css"
import { SideNav, SideNavItem, Button } from "react-materialize";

// import { Link } from "react-router-dom";


class Nav extends Component {
  render() {
    return (
      // <SideNav
      //   trigger={<Button className="menuBtn" icon="menu" />}
      //   options={{ closeOnClick: true }}
      // >
      //   <SideNavItem userView
      //     user={{
      //       //background: 'img/office.jpg',
      //       //image: 'img/yuna.jpg',
      //       name: 'John Doe',
      //       email: 'jdandturk@gmail.com'
      //     }}
      //   />
      //   <SideNavItem href='#!icon' icon='cloud'>
      //     <Link
      //       to="/sessions"
      //       className={window.location.pathname === "/sessions" ? "nav-link active" : "nav-link"}
      //     >Sessions
      //     </Link>
      //   </SideNavItem>
      //   <SideNavItem href='#!second'>
      //     <Link
      //       to="/drinkory"
      //       className={window.location.pathname === "/drinkory" ? "nav-link active" : "nav-link"}
      //     >About
      //     </Link>
      //   </SideNavItem>
      //   <SideNavItem divider />
      //   <SideNavItem subheader>Subheader</SideNavItem>
      //   <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
      // </SideNav>
      <div></div>

    )
  }

};

export default Nav;

    //          For Side Bar Nav, still not sure how to implement, may need to NPM Matrialize to use properly
// componentDidMount() {
//   var elem = document.querySelector(".sidenav");
//   var instance = M.Sidenav.init(elem, {
//       edge: "left",
//       inDuration: 250
//   });
// }
// render() {
//   return (
//     <div>
//       <ul id="slide-out" className="sidenav">
//         <li />
//         <li>
//           <a href="#!">
//             <i className="material-icons">cloud</i>First Link
//             With Icon
//                     </a>
//         </li>
//         <li>
//           <a href="#!">Second Link</a>
//         </li>
//         <li>
//           <div className="divider" />
//         </li>
//         <li>
//           <a className="subheader">Subheader</a>
//         </li>
//         <li>
//           <a className="waves-effect" href="#!">
//             Third Link With Waves
//                     </a>
//         </li>
//       </ul>
//       <a href="#" data-target="slide-out" className="sidenav-trigger">
//         <i className="material-icons">menu</i>
//       </a>
//     </div>
//   );
// };