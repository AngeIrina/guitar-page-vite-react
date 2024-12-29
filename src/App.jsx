import { useState, useEffect } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";


function App() {
  
  const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

 useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);

  const addToCart = (item) => {
    const itemExist = cart.findIndex(guitar => guitar.id === item.id);
    if (itemExist >= 0) {
      const updateCart = [...cart];
      updateCart[itemExist].quantity++;
      setCart(updateCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const updateCart = cart.filter((item) => item.id !== id);
    setCart(updateCart);
  }

  const increaseQuantity = (id) => {
    const updateCart = cart.map((item) => {
      if (item.id === id) {
        item.quantity++;
      }
      return item;
    });
    setCart(updateCart);
  }

  const decreaseQuantity = (id) => {
    const updateCart = cart.map((item) => {
      if (item.id === id) {
        item.quantity--;
      }
      return item;
    });
    setCart(updateCart);
  }

  const removeAll = () => {
    setCart([]);
  }

  return (
    <>
      <Header cart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeAll={removeAll}/>
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              guitar={guitar}
              key={guitar.id}
              addToCart={() => addToCart(guitar)}
            />
          ))}
        </div>
      </main>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>removeFromCart
        </div>
      </footer>
    </>
  );
}

export default App;
