import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { api } from "../api/axios.js";
import { all } from "axios";

const EditProduct = () => {
    const { id } = useParams;

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        imageURL: "",
        stock: ""
    });

    const allowedFields = ["title", "description", "price", "category", "imageURL", "stock"];

    const loadProducts = async () => {
        const res = api.get("/products");
        const product = res.data.find((p) => p.id === parseInt(id));

        setForm(product);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleChanges = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.patch(`/products/${id}`, form);
        alert("Product updated successfully!");
        navigate("/admin/products");
    };

    return (
        <div className = "max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
            <h2 className = "text-2xl font-bold mb-6"></h2>
            <form onSubmit = {handleSubmit} className = "space-y-3">
                {
                    allowedFields.map((key) => {
                        allowedFields.includes(key) &&
                        <input 
                            key = {key}
                            name = {key}
                            value = {form[key]}
                            onChange = {handleChanges}
                            placeholder = {key}
                            className = "w-full p-2 border border-gray-300 rounded"
                        />
                    })
                }
                <button
                    type = "submit"
                    className = "w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Update Product
                </button>
            </form>
        </div>
    )
};

export default EditProduct;