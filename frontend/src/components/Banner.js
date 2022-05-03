import { Nav, Navbar, NavDropdown } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import { Container } from "react-bootstrap"
import { useContext } from "react"
import { Store } from "../Store"
import { SlideDown } from "react-slidedown"
import SearchBox from "./SearchBox"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getError } from "../utils"
import axios from "axios"
import React, { useState, useEffect, useRef } from "react"
import { CSSTransition } from "react-transition-group"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGears,
  faRightFromBracket,
  faRightToBracket,
  faShoppingBasket,
  faTruck,
  faUser,
} from "@fortawesome/free-solid-svg-icons"

function Banner() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { fullBox, cart, userInfo } = state

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" })
    localStorage.removeItem("userInfo")
    localStorage.removeItem("shippingAddress")
    localStorage.removeItem("paymentMethod")
    window.location.href = "/signin"
  }
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`)
        setCategories(data)
      } catch (err) {
        toast.error(getError(err))
      }
    }
    fetchCategories()
  }, [])
  return (
    <React.Fragment>
      <SlideDown className={"slide"}>
        <div className='redHeader'>
          <div className='container'>
            <div className='row justify-content-center py-2'>
              <div className='col-9 col-md-12 text-center'>
                <p className='text-color-light mb-0'>
                  We provide rental services on most products, please
                  <Link to='' className='text-color-light text-decoration-none'>
                    <strong> Contact Us </strong>
                  </Link>
                  for availablity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SlideDown>
      <Navbar className='py-0'>
        <header className='myHeader'>
          <div className='header-container container'>
            <div className='header-row align-items-center d-flex py-3'>
              <div className='header-column'>
                <div className='header-logo'>
                  <LinkContainer to='/'>
                    <Navbar.Brand>
                      <img
                        src='..\images\popupparty.png'
                        alt='Porto'
                        width='auto'
                        height='50'
                      />
                    </Navbar.Brand>
                  </LinkContainer>
                </div>
              </div>
              <div className='d-none d-lg-block w-100 ps-4 p-0'>
                <div className='justify-content-start'>
                  <Navbar>
                    <ul className='nav nav-pills flex-row' id='mainNav'>
                      <li className='navItem'>
                        <Link to='/'>Home</Link>
                      </li>
                      <li className='navItem'>
                        <Link to='/search?category=Gazebos'>Gazebos</Link>
                      </li>
                      <li className='navItem'>
                        <Link to='/search?category=Heaters'>Heaters</Link>
                      </li>
                      <li className='navItem'>
                        <Link to='/search?category=Furniture'>Furniture</Link>
                      </li>
                    </ul>
                  </Navbar>
                </div>
              </div>

              <Nav className='account justify-content-end w-100'>
                {userInfo ? (
                  <p className='account2'>{userInfo.name}</p>
                ) : (
                  <div></div>
                )}
                <MenuBarItem
                  icon={
                    <FontAwesomeIcon
                      className='w-10 h-10'
                      icon={faUser}
                    ></FontAwesomeIcon>
                  }
                >
                  <MenuDropdown></MenuDropdown>
                </MenuBarItem>
                <Link className='menuBarItem' to='cart'>
                  <MenuBarItem
                    icon={
                      <FontAwesomeIcon
                        className='w-10 h-10'
                        icon={faShoppingBasket}
                      ></FontAwesomeIcon>
                    }
                  ></MenuBarItem>
                </Link>
                {userInfo && userInfo.isAdmin && (
                  <div>
                    <NavDropdown title='Admin'>
                      <LinkContainer to='/admin/dashboard'>
                        <NavDropdown.Item className='list-item2'>
                          Dashboard
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/products'>
                        <NavDropdown.Item className='list-item2'>
                          Products
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orders'>
                        <NavDropdown.Item className='list-item2'>
                          Orders
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/users'>
                        <NavDropdown.Item className='list-item2'>
                          Users
                        </NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  </div>
                )}
              </Nav>
            </div>
          </div>
        </header>
      </Navbar>
      <Navbar bg='quaternary' className='searchBar' expand='lg'>
        <Container>
          <div className='col searchsides' id='basic-navbar-nav'>
            <SearchBox />
          </div>
        </Container>
      </Navbar>
    </React.Fragment>
  )

  function MenuBarItem(props) {
    const [open, setOpen] = useState(false)

    return (
      <li className='menuBarItem'>
        <p onClick={() => setOpen(!open)} className='icon-button'>
          {props.icon}
        </p>
        {open && props.children}
      </li>
    )
  }

  function MenuDropdown() {
    const [activeMenu, setActiveMenu] = useState("main")
    const [menuHeight, setMenuHeight] = useState(null)
    const dropdownRef = useRef(null)

    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    function calcHeight(el) {
      const height = el.offsetHeight
      setMenuHeight(height)
    }

    function DropdownItem(props) {
      return (
        <p
          className='menu-item'
          onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
        >
          <span className='icon-button'>{props.leftIcon}</span>
          {props.children}
          <span className='icon-right'>{props.rightIcon}</span>
        </p>
      )
    }

    return (
      <div
        className='dropdown1'
        style={{ height: menuHeight }}
        ref={dropdownRef}
      >
        <CSSTransition
          in={activeMenu === "main"}
          timeout={500}
          classNames='menu-primary'
          unmountOnExit
          onEnter={calcHeight}
        >
          <div className='menu'>
            {userInfo ? (
              <div>
                <p className='menuName'>User: {userInfo.name}</p>
                <Link to='orderhistory'>
                  <DropdownItem
                    leftIcon={
                      <FontAwesomeIcon
                        className='w-10 h-10'
                        icon={faTruck}
                      ></FontAwesomeIcon>
                    }
                  >
                    My Orders
                  </DropdownItem>
                </Link>
                <Link to='cart'>
                  <DropdownItem
                    leftIcon={
                      <FontAwesomeIcon
                        className='w-10 h-10'
                        icon={faGears}
                      ></FontAwesomeIcon>
                    }
                  >
                    User Settings
                  </DropdownItem>
                </Link>
                <Link to='#signout' onClick={signoutHandler}>
                  <DropdownItem
                    leftIcon={
                      <FontAwesomeIcon
                        className='w-10 h-10'
                        icon={faRightFromBracket}
                      ></FontAwesomeIcon>
                    }
                  >
                    Log out
                  </DropdownItem>
                </Link>
              </div>
            ) : (
              <div>
                <div>
                  <Link to='/signin'>
                    <DropdownItem
                      leftIcon={
                        <FontAwesomeIcon
                          className='w-10 h-10'
                          icon={faRightToBracket}
                        ></FontAwesomeIcon>
                      }
                    >
                      Log in
                    </DropdownItem>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </CSSTransition>
      </div>
    )
  }
}
export default Banner
