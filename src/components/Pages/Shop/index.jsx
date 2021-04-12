import Card from '../../Card'
import { Row, Col } from 'react-bootstrap'
import { useDataContext } from '../../Context/GeneralContext'

const Shop = () => {
    const {
        cart,
        setCart,
        total,
        setTotal,
        products,
        qty,
        setQty
        } = useDataContext()

    return (
        <div className="list-group">
            <Row>
                {products && products.length > 0 ? products.map((v, i) => (
                        <Col md="4" key={i}>
                            <Card key={i}
                                id={v.id}
                                image={v.thumbnail}
                                cart={cart}
                                setCart={setCart}
                                available_quantity={v.available_quantity}
                                price={v.price}
                                title={v.title}
                                total={total}
                                seller={v.seller}
                                setTotal={setTotal}
                                qty={qty}
                                setQty={setQty}
                            />
                        </Col>
                    )) : 'No has seleccionado ningun item o no existen productos'
                }
            </Row>
        </div>
    )
}

export default Shop
