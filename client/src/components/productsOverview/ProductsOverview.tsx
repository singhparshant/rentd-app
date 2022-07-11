import SearchIcon from "@mui/icons-material/Search";
import {
  Card,
  CardContent,
  CardMedia,
  Pagination,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import useViewport from "../../hooks/useViewPort";
import useFilters from "../../zustand/useFilters";
import { Product } from "../common/interfaces/Interfaces";

export default function ProductsOverview() {
  const { width } = useViewport();
  const filters = useFilters((state) => state.filters);
  const setFilters = useFilters((state: any) => state.setFilters);
  const breakpoint = 550;

  const { products, loading, pages } = useProducts(filters);

  console.log("data", products);

  const handlePageClick = (d: any, page: any) => {
    setFilters("page", page);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: width > breakpoint ? "row" : "column",
          alignItems: width > breakpoint ? "" : "center",
          flexWrap: "wrap",
        }}
      >
        {loading ? (
          <CircularProgress
            sx={{
              marginLeft: "50%",
              marginTop: "20px",
              marginBottom: "20px",
              color: "#2b0245",
            }}
          />
        ) : products.length === 0 ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px",
            }}
          >
            <SearchIcon
              sx={{ height: "80px", width: "80px" }}
              fontSize="large"
            />
            <pre>Could not find any products</pre>
          </div>
        ) : (
          products.map((product: Product, idx: number) => {
            return (
              <Card
                sx={{
                  margin: "8px",
                  width: "350px",
                  transition: "transform 0.15s ease-in-out",
                  "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
                }}
              >
                <Link
                  to={{
                    pathname: `/products/${product._id}`,
                    state: { fromProductsPage: product },
                  }}
                  style={{ textDecoration: "none" }}
                  key={idx}
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
          })
        )}
      </div>
      <Box justifyContent={"center"} alignItems="center" display={"flex"}>
        <Pagination
          count={pages}
          defaultPage={1}
          onChange={handlePageClick}
          size="large"
          color="primary"
        />
      </Box>
    </>
  );
}
