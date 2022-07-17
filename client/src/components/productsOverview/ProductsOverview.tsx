import SearchIcon from "@mui/icons-material/Search";
import { Pagination } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import useProducts from "../../hooks/useProducts";
import useViewport from "../../hooks/useViewPort";
import useFilters from "../../zustand/useFilters";
import { Product } from "../common/interfaces/Interfaces";
import ProductCard from "./ProductCard";
import "./productsOverview.css";

export default function ProductsOverview() {
  const { width } = useViewport();
  const filters = useFilters((state) => state.filters);
  const setFilters = useFilters((state: any) => state.setFilters);
  const breakpoint = 550;

  const { products, loading, pages } = useProducts(filters);

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
          products.map((product: Product) => <ProductCard product={product} />)
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
