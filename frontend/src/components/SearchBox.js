import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

export default function SearchBox() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const submitHandler = (e) => {
    e.preventDefault()
    navigate(query ? `/search/?query=${query}` : "/search")
  }

  return (
    <Form className='d-flex col-12' onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type='text'
          name='q'
          id='q'
          onChange={(e) => setQuery(e.target.value)}
          placeholder='search products...'
          aria-label='Search Products'
          aria-describedby='button-search'
        ></FormControl>
        <Button variant='outline-primary' type='submit' id='button-search'>
          <FontAwesomeIcon
            className='w-10 h-10'
            icon={faSearch}
          ></FontAwesomeIcon>
        </Button>
      </InputGroup>
    </Form>
  )
}
