import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../common/interfaces/Interfaces";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      sx={{
        margin: "8px",
        width: "350px",
        transition: "transform 0.15s ease-in-out",
        "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
        position: "relative",
      }}
    >
      {product.discount > 0 && (
        <div className="discount">{product.discount}% off</div>
      )}
      <Link
        to={{
          pathname: `/products/${product._id}`,
          state: { fromProductsPage: product },
        }}
        style={{ textDecoration: "none" }}
        key={product._id}
      >
        <div style={{ margin: 5, border: 20 }}>
          <CardMedia
            component="img"
            src={`data:image/png;base64,` + product.productImages[0]}
            style={{ maxHeight: 200 }}
            alt="Could not load image"
          />
          <CardContent>
            <Typography variant="h5" color="#ffb93f">
              €{product.monthlyPrice}
            </Typography>
            <br></br>
            <Typography variant="body1" color="text.primary">
              {product.name}
            </Typography>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
}
