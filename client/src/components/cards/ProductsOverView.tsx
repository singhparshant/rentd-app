import { Card, CardContent, CardMedia, Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import useViewport from "../../hooks/useViewPort";
import useFilters from "../../zustand/useFilters";
import { Product } from "../common/interfaces/Interfaces";

type Props = {};
type imageDataType = {
  _id: string;
  source: string[];
};

const Cards = (props: Props) => {
  const { width } = useViewport();
  const filters = useFilters((state) => state.filters);
  const setFilters = useFilters((state: any) => state.setFilters);
  const breakpoint = 550;

  const { data, loading, error, pages } = useProducts(filters);

  const handlePageClick = (d: any, page: any) => {
    setFilters("page", page);
  };

  return (
    <>
      <div
        style={{
          display: width > breakpoint ? "flex" : "block",
          flexWrap: "wrap",
        }}
      >
        {loading ? (
          <h1>Wait bitch</h1>
        ) : (
          data &&
          data.data &&
          data.data.data &&
          data.data.data.map((product: Product, idx: number) => {
            return (
              <Card sx={{ margin: "8px", width: "350px" }}>
                <Link
                  to={{
                    pathname: `/products/${product._id}`,
                    state: { fromProductsPage: product },
                  }}
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
                      <Typography variant="body2" color="text.primary">
                        {product.monthlyPrice}€<br></br>
                        {product.description}
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
        <Pagination count={pages} defaultPage={1} onChange={handlePageClick} size="large" color="primary"/>
      </Box>
    </>
  );
};

export default Cards;
