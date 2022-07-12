import React, { useState } from 'react'
import MaterialTable from 'material-table';
import { Table } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


const ProductsTable = () => {
    
    const productsData = [
        {
            name: "Bike",
            category: "Mobility",
            // minDuration: 2,
            // monthlyPrice: 50,
            // description: "A mountain bike",
            // deposit: 80,
            // discount: 2,
            // avgRating: 3,
            // numberRatings: 20
        }
    ];
    const columns = [
        {
            id: 1,
            title: "Name",
            field: "name",
        },
        {
            id: 2,
            title: "Category",
            field: "category",
        },
        // {
        //     title: "Minimum Duration",
        //     field: "minDuration",
        // },
        // {
        //     title: "Monthly Price",
        //     field: "monthlyPrice",
        // },
        // {
        //     title: "Description",
        //     field: "description",
        // },
        // {
        //     title: "Deposit",
        //     field: "deposit",
        // },
        // {
        //     title: "Discount",
        //     field: "discount",
        // },
        // {
        //     tile: "Average Rating",
        //     field: "avgRating",
        // },
        // {
        //     tile: "Number of Rating",
        //     field: "numberRatings",
        // },
    ]

  return (
    <div className="ProductsTable">
        <h2 className="dashboard-heading">Your Orders</h2>
        <MaterialTable columns={columns} data={productsData} />
    </div>
  )
}

export default ProductsTable