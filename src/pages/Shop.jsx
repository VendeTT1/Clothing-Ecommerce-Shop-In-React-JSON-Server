import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { nanoid } from "nanoid";
import React from "react";
import {
  Filters,
  Pagination,
  ProductElement,
  SectionTitle,
} from "../components";
import "../styles/Shop.css";

export const shopLoader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  let mydate = Date.parse(params.date);

  if (mydate && !isNaN(mydate)) {
    mydate = new Date(mydate).toISOString();
  } else {
    mydate = "";
  }

  const filterObj = {
    brand: params.brand ?? "all",
    category: params.category ?? "all",
    date: mydate ?? "",
    gender: params.gender ?? "all",
    order: params.order ?? "",
    price: params.price ?? "all",
    search: params.search ?? "",
    in_stock: params.stock !== undefined,
    current_page: Number(params.page) || 1,
  };

  let parameter =
    `?start=${(filterObj.current_page - 1) * 10}&limit=10` +
    (filterObj.brand !== "all" ? `&brandname=${filterObj.brand}` : "") +
    (filterObj.category !== "all" ? `&category=${filterObj.category}` : "") +
    (filterObj.gender !== "all" ? `&gender=${filterObj.gender}` : ``) +
    (filterObj.search !== ""
      ? `&q=${encodeURIComponent(filterObj.search)}`
      : ``) +
    (filterObj.order ? `&sort=price` : "") +
    (filterObj.in_stock ? `&isinstock` : "") +
    (filterObj.price !== "all" ? `&price=${filterObj.price}` : ``) +
    (filterObj.date ? `&productiondate=${filterObj.date}` : ``);

  try {
    const response = await axios(
      `http://localhost:8080/product/shop${parameter}`
    );

    let data = response.data;

    // Extract the content from the paginated response
    let products = data.content;
    console.log("this is the content :" + data);
    console.log("this is the content :" + products);

    // sorting in descending order
    if (
      filterObj.order &&
      !(filterObj.order === "asc" || filterObj.order === "price low")
    ) {
      products.sort((a, b) => b.price - a.price);
    }

    return {
      productsData: products,
      productsLength: products.length,
      page: filterObj.current_page,
    };
  } catch (error) {
    console.log(error.response);
  }

  return null;
};

const Shop = () => {
  const productLoaderData = useLoaderData();

  return (
    <>
      <SectionTitle title="Shop" path="Home | Shop" />
      <div className="max-w-7xl mx-auto mt-5">
        <Filters />
        {productLoaderData.productsData.length === 0 && (
          <h2 className="text-accent-content text-center text-4xl my-10">
            No products found for this filter
          </h2>
        )}
        <div className="grid grid-cols-4 px-2 gap-y-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 shop-products-grid">
          {productLoaderData.productsData.length !== 0 &&
            productLoaderData.productsData.map((product) => (
              <ProductElement
                key={nanoid()}
                id={product.id}
                title={product.name}
                image={product.imageurl}
                rating={product.rating}
                price={product.price}
                brandName={product.brandname}
              />
            ))}
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default Shop;
