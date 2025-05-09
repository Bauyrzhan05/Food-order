import React from "react";
import { Route, Routes } from "react-router-dom";
import App2 from "./App2";
import DeleteFood from "../deleteFood";
import AddMenu from "../AddMenu";
import DeleteMenu from "../DeleteMenu";
import UpdateFood from "../updataFood";
import AddFood from "../addFood";

export function AdminRoutes() {


    return (
        <Routes>
            <Route path="/" element={<App2 />}>
                <Route path="/add-food" element={<AddFood/>} />
                <Route path="/food-list" element={<DeleteFood/>} /> 
                <Route path="/add-menu" element={<AddMenu/>} />
                <Route path="/menu-list" element={<DeleteMenu/>} />
                <Route path="/update-food/:id" element={<UpdateFood/>} />
            </Route>
        </Routes>
    );
}
