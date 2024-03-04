import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastMsg from '../../../src/components/ToastMsg';
import './ProductsComponent.css';
import NavBar from '../../components/NavBar';

const ProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    details: {
      brand: '',
      model: '',
      color: '',
    },
    price: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    details: {
      model: '',
      color: '',
      brand: '',
    },
    price: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const authRes = await axios.post(
          'https://takehome-sequelize.onrender.com/api/auth/checkAuth',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(authRes.data);

        const productsResponse = await axios.get('https://takehome-sequelize.onrender.com/api/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error:', error.response.data);
        window.location.href = '/';
      }
    };

    fetchData();
  }, [isModalOpen, isCreateModalOpen, isDeleteModalOpen]);

  const handleEditProduct = (productId) => {
    setEditingProductId(productId);
    const productToEdit = products.find(product => product.id === productId);
    setEditedProduct(productToEdit);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    setDeleteProductId(productId);
    setIsDeleteModalOpen(true);
  };

  const handleSaveNewProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const  { price } = newProduct;
      if (isNaN(price)) {
        toast.error('Preço deve ser um valor numérico');
        throw new Error('Price must be a valid number');

      }
      const response = await axios.post('https://takehome-sequelize.onrender.com/api/products', newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts([...products, response.data]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error saving new product:', error.response.data);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const  { price } = editedProduct
      if (isNaN(price)) {
        toast.error('Preço deve ser um valor numérico');
       
        throw new Error('Price must be a valid number');
      }
      await axios.put(`https://takehome-sequelize.onrender.com/api/products/${editingProductId}`, editedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedProducts = products.map(product => {
        if (product.id === editingProductId) {
          return editedProduct;
        }
        return product;
      });
      setProducts(updatedProducts);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating product:', error.response.data);
    }
  };

  const confirmDeleteProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://takehome-sequelize.onrender.com/api/products/${deleteProductId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter(product => product.id !== deleteProductId));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting product:', error.response.data);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <> <ToastMsg />
    <NavBar />
    <div className="products-container">
      <h2>Produtos</h2>
      <input type="text" placeholder="Pesquisar por nome" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <button className="create-btn" onClick={() => setIsCreateModalOpen(true)}>Registrar Novo Produto</button>
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Marca: {product.details.brand}</p>
            <p>Modelo: {product.details.model}</p>
            <p>Cor: {product.details.color}</p>
            <p>Preço: {product.price}</p>
            <div className="btns">
            <button className="btn" onClick={() => handleEditProduct(product.id)}>Editar</button>
            <button className="btn" onClick={() => handleDeleteProduct(product.id)}>Deletar</button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <div className="modal">
          <h2>Editar Produto</h2>
          <label>Nome:</label>
          <input type="text" value={editedProduct.name} onChange={e => setEditedProduct({ ...editedProduct, name: e.target.value })} />
          <label>Marca:</label>
          <input type="text" value={editedProduct.details.brand} onChange={e => setEditedProduct({ ...editedProduct, details: { ...editedProduct.details, brand: e.target.value } })} />
          <label>Modelo:</label>
          <input type="text" value={editedProduct.details.model} onChange={e => setEditedProduct({ ...editedProduct, details: { ...editedProduct.details, model: e.target.value } })} />
          <label>Cor:</label>
          <input type="text" value={editedProduct.details.color} onChange={e => setEditedProduct({ ...editedProduct, details: { ...editedProduct.details, color: e.target.value } })} />
          <label>Preço:</label>
          <input type="text" value={editedProduct.price} onChange={e => setEditedProduct({ ...editedProduct, price: e.target.value })} />
          <button onClick={handleUpdateProduct}>Salvar</button>
          <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
        </div>
      )}
      {isCreateModalOpen && (
        <div className="modal">
          <h2>Registrar novo produto</h2>
          <label>Nome:</label>
          <input type="text" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
          <label>Marca:</label>
          <input type="text" value={newProduct.details.brand} onChange={e => setNewProduct({ ...newProduct, details: { ...newProduct.details, brand: e.target.value } })} />
          <label>Modelo:</label>
          <input type="text" value={newProduct.details.model} onChange={e => setNewProduct({ ...newProduct, details: { ...newProduct.details, model: e.target.value } })} />
          <label>Cor:</label>
          <input type="text" value={newProduct.details.color} onChange={e => setNewProduct({ ...newProduct, details: { ...newProduct.details, color: e.target.value } })} />
          <label>Preço:</label>
          <input type="text" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
          <button onClick={handleSaveNewProduct}>Salvar</button>
          <button onClick={() => setIsCreateModalOpen(false)}>Cancelar</button>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="modal">
          <h2>Confirmar remoção</h2>
          <p>Você tem certeza que desejar deletar o produto?</p>
          <button onClick={confirmDeleteProduct}>Sim</button>
          <button onClick={() => setIsDeleteModalOpen(false)}>Não</button>
        </div>
      )}
    </div></>
  );
};

export default ProductsComponent;
