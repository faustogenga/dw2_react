import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import { Navbar } from '../components/Navbar'
import { collectionAssignation, onFindAll, onInsert, onFindProductinReviews, onFindVendorinReviews} from '../CRUD/app';
import { productInformation } from './Productitem'
import { useNavigate } from "react-router-dom";
import { Footer } from './Footer';
import StarRating from './StarRating';
import VendorStarRating from './VendorStarRating';


const ViewProductItem = ({ loggedIn, user, logOut, isVendor }) => {
  const navigate = useNavigate();

  const [Availability, setAvailability] = useState('');
  const [averageRating, setAverageRating] = useState(0);
  const [averageVendorRating, setAverageVendorRating] = useState(0);

  useEffect(() => {
    if (user && user.email) {
      availabilityCheck();
      calculateAverageRating();
      calculateAverageVendorRating();
    }
  }, [user]);

  const calculateAverageRating = async () => {
    if (productInformation && productInformation.id) {
      collectionAssignation('CustomerReviews');
      const result = await onFindProductinReviews(productInformation.id);

      if (result && result.length > 0) {
        const totalReviews = result.length;
        const totalRating = result.reduce(
          (sum, doc) => sum + doc.data().customer_rating,
          0
        );
        const averageRating = totalRating / totalReviews;
        setAverageRating(averageRating);
      } else {
        // No se encontraron valoraciones.
        setAverageRating(0);
      }
    }
  };

  const calculateAverageVendorRating = async () => {
    if (productInformation && productInformation.id) {
      collectionAssignation('CustomerReviews');
      const result = await onFindVendorinReviews(productInformation.vendor);

      if (result && result.length > 0) {
        const totalReviews = result.length;
        const totalRating = result.reduce(
          (sum, doc) => sum + doc.data().customer_rating,
          0
        );
        const averageVendorRating = totalRating / totalReviews;
        setAverageVendorRating(averageVendorRating);
      } else {
        // No se encontraron valoraciones.
        setAverageVendorRating(0);
      }
    }
  };


  const availabilityCheck = () => {
    if (productInformation?.stock > 0) {
      setAvailability("Disponible");
    }
    else {
      setAvailability("No Disponible");
    }
  }

  const addToFirebaseCart = async () => {
    const product = {
      product_id: productInformation.id,
      image: productInformation.img,
      name: productInformation.name,
      price: productInformation.price,
      quantity: 1,
      vendor: productInformation.vendor,
      userEmail: user.email,
      stock: productInformation.stock,
    };

    try {
      collectionAssignation('CustomerCart');
      const productsCart = await onFindAll();
      const productsArray = Object.values(productsCart.docs);
      console.log(productsArray);
      console.log(product.id);
      if (productsArray.some(doc => doc.data().product_id === product.product_id)) {
        Swal.fire({
          title: "¡Producto ya esta en el carrito!",
          text: "Producto ya esta agregado correctamente a tu carrito.",
          icon: "success"
        });
      } else {
        await onInsert(product);
        Swal.fire({
          title: "¡Buena elección!",
          text: "Producto agregado correctamente a tu carrito.",
          icon: "success"
        });
        navigate("/productscatalog");
      }

    } catch (error) {
      Swal.fire({
        title: "Tu producto no ha podido ser agregado a tu carrito.",
        text: error.message,
        icon: "Error"
      });
    };
  }

  const onClickAddShoppingCart = () => {
    if (Availability === "Disponible") {
      addToFirebaseCart();
    }
    else {
      Swal.fire({
        title: "Error",
        text: "El producto seleccionado no se encuentra disponible",
        icon: "error"
      })
    }
  }

  if (!productInformation) {
    return navigate("/")
  } else
    return (
      <>
        <Navbar
          loggedIn={loggedIn}
          user={user}
          logOut={logOut}
          isVendor={isVendor}
        />
        <div style={{
          display: "flex",
          backgroundImage: "url(https://c1.wallpaperflare.com/path/56/434/430/background-photos-grass-green-33d94cf5f7ef88102f0d4710b4b2c840.jpg)",
          backgroundSize: "cover"
        }}>
          <div className='container bg-white mt-5 mb-5' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div className='position-relative'>
              <button
                type='button'
                style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                className='btn btn-warning m-1'
                onClick={(() => navigate("/productscatalog"))}
              >
                Volver
              </button>
              <img alt='Produt_Image' style={{ width: '90%', height: '100%' }} src={productInformation.img}></img>
            </div>
            <div style={{
              marginTop: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start", // Alinea los elementos a la izquierda
              fontSize: "16px",     // Tamaño de fuente predeterminado
            }}>
              <p style={{ fontSize: '33px', fontWeight: 'bold', marginBottom: "10px" }}>{productInformation.name}</p>
              <div style={{display: "flex", flexDirection: "column", alignItems: "start", fontSize: "16px" }}>
                {/* Otros detalles del producto */}
                <p><strong>Promedio de Valoración:</strong> <StarRating rating={averageRating} /> </p>

              </div>
              <p><strong>Descripción:</strong> {productInformation.description}</p>
              <p><strong>Precio:</strong> ${productInformation.price}</p>
              <p><strong>Talla:</strong> {productInformation.size}</p>
              <p><strong>Correo registrado del vendedor:</strong> {productInformation.vendor}</p>
              <div style={{display: "flex", flexDirection: "column", alignItems: "start", fontSize: "16px" }}>
                {/* Otros detalles del producto */}
                <p><strong>Valoración del Vendedor:</strong> <VendorStarRating rating={averageVendorRating} /></p>
              </div>
              <p><strong>Categoría:</strong> {productInformation.category}</p>
              <div className='d-flex'>
                <strong>Estado:</strong>
                {Availability === "Disponible" ? (
                  <div className='mx-1 rounded px-1' style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold', marginBottom: "10px" }}>{Availability}</div>
                ) : (
                  <div className='mx-1 rounded px-1' style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold', marginBottom: "10px" }}>{Availability}</div>
                )}
              </div>
              <p><strong>Cantidad:</strong> {productInformation.stock}</p>
              <button type='button' style={{ marginTop: "10px" }} className='btn btn-info' onClick={onClickAddShoppingCart}>Agregar al carrito</button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
}

export default ViewProductItem