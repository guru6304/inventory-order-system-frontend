import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/ProductApi";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await getProductById(id);

        setProduct(response.data.data);
      } catch (err) {
        alert(err.response?.data?.message || "Product Fetch Failed");
      }
    };

    fetchProductById();
  }, [id]);
  return (
    <div className="container-page">
      <div className="card product-details-card">
        <div className="card-body">
          {product && (
            <>
              <h2 className="mb-4">{product.name}</h2>

              <h4 className="text-success mb-3">₹ {product.price}</h4>

              <p>
                <span className="badge bg-primary">
                  Stock : {product.stock_quantity}
                </span>
              </p>

              <p>
                <span className="badge bg-secondary">
                  {product.category_name}
                </span>
              </p>

              <hr />

              <h5>Description</h5>

              <p className="description-text">{product.description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;
