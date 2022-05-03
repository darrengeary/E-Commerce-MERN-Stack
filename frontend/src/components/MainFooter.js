import React from "react"
import "react-toastify/dist/ReactToastify.css"
import "react-toastify/dist/ReactToastify.css"
import "../index.css"
import { ModalFooter, Container } from "react-bootstrap/"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

function MainFooter() {
  return (
    <ModalFooter className='footer mt-7'>
      <Container className='footer2'>
        <div className='pb-3'>
          <a href='https://github.com/darrengeary/' target='_blank'>
            <FontAwesomeIcon
              className='socialsLink'
              icon={faGithub}
            ></FontAwesomeIcon>
          </a>
          <a
            className='text-decoration-none'
            target='_blank'
            href='https://www.linkedin.com/in/darren-geary/'
          >
            <FontAwesomeIcon
              className='socialsLink'
              icon={faLinkedin}
            ></FontAwesomeIcon>
          </a>
        </div>
        <p>
          Developed by{" "}
          <a
            className='syfoLink'
            href='https://github.com/darrengeary/ECommerce-MERN-Stack'
            target='_blank'
          >
            Darren Geary
          </a>
        </p>
      </Container>
    </ModalFooter>
  )
}
export default MainFooter
