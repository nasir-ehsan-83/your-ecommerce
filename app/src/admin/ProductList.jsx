import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../api/axios.js";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        const res = await api.get("/products");
        setProducts(res.data);
    };

    const deleteProduct = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            alert("Product deleted successfully!");
            loadProducts();
        } catch (err) {
            console.error(`Error deleting product ${err}`);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div className = "max-w-4xl mx-auto mt-10">
            <div>
                <h2 className = "text-2xl font-bold">Product List</h2>
                <Link 
                    to = "/admin/products/add"
                    className = "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add New Product
                </Link>
            </div>
            <table className = "w-full table-auto border-collaps border border-gray-200">
                <thead>
                    <tr className = "bg-gray-100">
                        <th className = "border border-gray-200 px-4 py-2">ID</th>
                        <th className = "border border-gray-200 px-4 py-2">Title</th>
                        <th className = "border border-gray-200 px-4 py-2">Price</th>
                        <th className = "border border-gray-200 px-4 py-2">Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product) => (
                            <tr key = {product.id} className = "text-center">
                                <td className = "border border-gray-200 px-4 py-2">product.title</td>
                                <td className = "border border-gray-200 px-4 py-2">product.price</td>
                                <td className = "border border-gray-200 px-4 py-2">product.stock</td>
                                <td className = "border border-gray-200 px-4 py-2">
                                    <Link
                                        to = {`/admin/products/update/${product.id}`} 
                                        className = ""
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick = { () => deleteProduct(product.id) }
                                        className = "text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;