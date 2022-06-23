import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import useViewport from "../../hooks/useViewPort";

type Props = {};

const images = [
  {
    src: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80",
  },
  {
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80",
  },
  {
    src: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/09c5ea6df1bd4be6baaaac5e003e7047_9366/Forum_Low_Shoes_White_FY7756_01_standard.jpg",
  },
];

const Cards = (props: Props) => {
  const { width } = useViewport();
  const breakpoint = 650;
  return (
    <div>
      <Card
        style={{
          display: width > breakpoint ? "flex" : "block",
        }}
      >
        {images.map((img, idx) => {
          return (
            <div style={{ margin: 5, border: 20 }} key={idx}>
              <CardMedia
                component="img"
                image={img.src}
                style={{ maxHeight: 200 }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Shoes for everyday wear. Great comfort
                </Typography>
              </CardContent>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default Cards;
