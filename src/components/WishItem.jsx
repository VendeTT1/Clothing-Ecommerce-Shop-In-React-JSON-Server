// import React from "react";
// import { FaHeartCrack } from "react-icons/fa6";
// import { useDispatch } from "react-redux";
// import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
// import axios from "axios";
// import { store } from "../store";
// import { toast } from "react-toastify";


// const WishItem = ({ item, counter }) => {
//     const dispatch = useDispatch();

//     const removeFromWishlistHandler = async (product) => {
//       const getResponse = await axios.get(
//         `http://localhost:8080/user/${localStorage.getItem("id")}`
//       );
//       const userObj = getResponse.data;

//       console.log("this is user id:" + userObj)
//       userObj.userWishlist = userObj.userWishlist || [];
//       console.log(userObj.userWishlist);

//       // const newWishlist = userObj.userWishlist.filter(item => product.id !== item.id);
  
//       // userObj.userWishlist = newWishlist;
  
//       // const postResponse = await axios.put(
//       //   `http://localhost:8080/user/${localStorage.getItem("id")}`,
//       //   userObj
//       // );
//        const postResponse = await axios.delete(
//          `http://localhost:8080/user/${localStorage.getItem("id")}/remove/${objId}`
//        );
  
//       // Dispatch the addToWishlist action with the product data
//       // store.dispatch(removeFromWishlist({ userObj }));
//       toast.success("Product removed from the wishlist!");
  
//     }
   
//     return (
//     <tr className="hover cursor-pointer">
//       <th className="text-accent-content">{ counter + 1 }</th>
//       <td className="text-accent-content">{ item.title }</td>
//       <td className="text-accent-content">{ item.selectedSize }</td>
//       <td>
//         <button className="btn btn-xs btn-error text-sm" onClick={() => removeFromWishlistHandler(item)}>
//           <FaHeartCrack />
//           remove from the wishlist
//         </button>
//       </td>
//     </tr>
//   );
// };

// export default WishItem;
import React from "react";
import { FaHeartCrack } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import axios from "axios";
import { toast } from "react-toastify";

const WishItem = ({ item, counter }) => {
  const dispatch = useDispatch();

  const removeFromWishlistHandler = async (productId) => {
    try {
      console.log(productId);
      const response = await axios.delete(
        `http://localhost:8080/wishlist/${localStorage.getItem(
          "id"
        )}/remove/${productId}`
      );

      if (response.status === 204) {
        // Dispatch the removeFromWishlist action with the productId
        // dispatch(removeFromWishlist(productId));
        toast.success("Product removed from the wishlist!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product from the wishlist.");
    }
  };

  return (
    <tr className="hover cursor-pointer">
      <th className="text-accent-content">{counter + 1}</th>
      <td className="text-accent-content">{item.title}</td>
      <td className="text-accent-content">{item.selectedSize}</td>
      <td>
        <button
          className="btn btn-xs btn-error text-sm"
          onClick={() => removeFromWishlistHandler(item.id)}
        >
          <FaHeartCrack />
          remove from the wishlist
        </button>
      </td>
    </tr>
  );
};

export default WishItem;
