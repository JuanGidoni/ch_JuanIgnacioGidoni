import { useRef, useEffect } from 'react'
import { FaCartPlus, FaSearch, FaDollarSign } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { Navbar, Nav, Form, Button, FormControl, NavDropdown } from 'react-bootstrap'
import logo from '../assets/logo.svg';
import { useDataContext } from '../Context/GeneralContext';

const Menu = () => {

    const searchRef = useRef();

    const { cart, total, setStatus, getDataResults, categories, totalItems, setTotalItems } = useDataContext()

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            searchItem(searchRef.current.value)
        }
    }
    const handleClickSearch = () => {
        searchItem(searchRef.current.value)
    }

    const searchItem = async (e) => {
        try {
            await getDataResults(e).then(
                () => {
                    searchRef.current.value = ''
                    searchRef.current.placeholder = `Busqueda realizada: ${e}`
                    searchRef.current.className = 'mr-sm-2 form-control border-success bg-dark text-success'
                    setStatus(`Busqueda realizada: ${e}`)
                }
            )
        } catch (error) {
            setStatus(error)
        }
    }

    return (
        <div className="pb-5">
            <Navbar bg="dark" variant="dark">
                <Navbar>
                    <Link to='/' className='navbar-brand'>
                        <img
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Logo, Juan Ignacio Gidoni"
                        />
                    Juan Ignacio Gidoni
                    </Link>
                </Navbar>
                <Nav className="ml-auto">
                    <Link to="/" className="nav-link">Home</Link>
                    <NavDropdown title="Categories" id="basic-nav-dropdown">
                        {categories && categories.length > 0 ? categories.map(
                            (v, i) => (
                            <Link to={`/category/${v.id}`} className="dropdown-item" key={i}>
                                {v.item.name.charAt(0).toUpperCase() + v.item.name.slice(1)}
                            </Link>
                            )
                        ) : 'No dropdown items found...'}
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <Link to="/cart" className="text-success text-decoration-none">
                        <Button variant="outline-success mr-2" className="d-flex flex-fill">
                            {totalItems}
                            <FaCartPlus className="ml-2" />
                        </Button>
                    </Link>

                    <Button disabled variant="outline-success mr-2" className="d-flex flex-fill">
                        {total}
                        <FaDollarSign className="ml-2" />
                    </Button>
                    <FormControl type="text" placeholder="Search Products.." className="mr-sm-2" ref={searchRef} onKeyDown={(e) => handleKeyDown(e)} />
                    <Button variant="outline-info" onClick={handleClickSearch}><FaSearch /></Button>
                </Form>
            </Navbar>
        </div>
    )
}

export default Menu
