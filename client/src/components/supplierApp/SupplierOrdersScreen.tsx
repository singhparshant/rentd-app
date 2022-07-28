import React from "react";
import { Redirect } from "react-router-dom";
import { useOrders } from "../../hooks/useOrders";
import useAuthState from "../../zustand/useAuthState";

type Props = {};

const SupplierOrdersScreen = (props: Props) => {
  const user = useAuthState((state: any) => state.user);
  const { orders, loading } = useOrders();

  if (!user) return <Redirect to="/login" />;
  console.log(orders);
  return <div>HELLO WORLD</div>;
  //   return loading ? (
  //     <CircularProgress
  //       sx={{
  //         marginLeft: "50%",
  //         marginTop: "20px",
  //         marginBottom: "20px",
  //         color: "#2b0245",
  //       }}
  //     />
  //   ) : (
  //     <div>
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           margin: 20,
  //         }}
  //       >
  //         <h1>Your orders</h1>
  //       </div>

  //       <div
  //         style={{
  //           display: "flex",
  //           flexDirection: "column",
  //           alignItems: "center",
  //         }}
  //       >
  //         {orders.length > 0 ? (
  //           <>
  //             {orders.map((order: any, index: number) => (
  //               <Link
  //                 to={{ pathname: `/orders/${order._id}`, state: { order } }}
  //                 style={{ textDecoration: "none", width: "60%", color: "black" }}
  //               >
  //                 <Card
  //                   sx={{
  //                     margin: "8px",
  //                     transition: "transform 0.15s ease-in-out",
  //                     "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  //                   }}
  //                 >
  //                   <div key={index} className="applicationCard">
  //                     <p>Order {index + 1}</p>

  //                     <div>
  //                       <div style={{ paddingBottom: 5 }}>
  //                         <b>total:</b> {order.amount} €
  //                       </div>
  //                       {order.createdAt && (
  //                         <span>
  //                           <b>created at: </b>
  //                           {parseDate(new Date(order.createdAt))}
  //                         </span>
  //                       )}
  //                     </div>

  //                     <img className="applicationImage" src={orderImage} alt="" />
  //                   </div>
  //                 </Card>
  //               </Link>
  //             ))}
  //           </>
  //         ) : (
  //           <></>
  //         )}
  //       </div>
  //     </div>
  //   );
};

export default SupplierOrdersScreen;
