import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productSlice";

export default function ProductAdmin() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <div className="card shadow p-3">

            <h3 className="text-center mb-3">Product Admin</h3>

            <div className="list-group">

                {products.slice(0, 5).map((p) => (

                    <div key={p.id} className="list-group-item">

                        <strong>{p.title}</strong>

                        <div>₹{p.price}</div>

                    </div>

                ))}

            </div>

        </div>
    );
}