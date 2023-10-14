import { useState } from 'react';
import ProductsContext from '../Context/productsProvider';
import { useContext } from 'react';

const Card=(props)=>{
    const [showFullDescription, setShowFullDescription] = useState(false);

    const handleAddToCart=()=>{

    };

    const limitDescription = (desc) => {
        const words = desc.split(' ');
        if (!showFullDescription) {
            return words.slice(0, 25).join(' ') + '...';
        } else {
            return desc;
        }
    };

    return (
        <div className="product">
          <h2>{props.name}</h2>
          <p>
            {limitDescription(props.desc)}
            {!showFullDescription && (
                <button className='show 'onClick={() => setShowFullDescription(true)}>Show More</button>
            )}
            {showFullDescription && (
                <div>
                    <p>{props.desc}</p>
                    <button className='show' onClick={() => setShowFullDescription(false)}>Show Less</button>
                </div>
            )}
          </p>
          <p>
            <strong>{props.price}$</strong>
          </p>
          <button className="add-to-cart"onClick={handleAddToCart}>Add to Cart</button>
          {/* {showNotification && <Notification message='Item added to cart.' onClose={() => setShowNotification(false)}/>} */}
        </div>
    );
}

const Products=()=>{
    const productsContext = useContext(ProductsContext);
    const { products } = productsContext;

    console.log(productsContext.products);

    return(
        <div className='cards'>
            {products && products.patagonia && productsContext.products?.patagonia.map((item)=>{
                return <Card
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    desc={item.desc}
                    price={item.price}
                />
            })}
            {products && products.tentree && productsContext.products?.tentree.map((item)=>{
                return <Card
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    desc={item.desc}
                    price={item.price}
                />
            })}
        </div>
    );
};

export default Products;