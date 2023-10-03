
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAddWishlistThunk, setRemoveWishlistThunk } from "../store/slices/wishlist";
import { setAddCardThunk } from "../store/slices/cartList";

function ArticleCard({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);

  const isLiked = wishlist.some((item) => item.id === data.id);

  const addToWishlist = () => {
    if (!isLiked) {
      dispatch(setAddWishlistThunk(data));
    } else {
      dispatch(setRemoveWishlistThunk(data.id));
    }
  };

  const addCart =(productId)=>{
        const data = {
          quantity: 1,
          productId
        }
        dispatch( setAddCardThunk( data ) )

    }

  return (
    <Card style={{ height: "100%" }}>
      <div style={{display:"flex", justifyContent:"flex-end", padding:"5px"}}>
      <Button
          variant={isLiked ? "danger" : "outline-danger"}
          onClick={addToWishlist}
          style={{
            fontSize: "1.5rem",
          }}
        >
          <i className={isLiked ? "bx bxs-heart" : "bx bx-heart"}></i>
        </Button>
      </div>
      <div style={{ width: "100%", maxHeight: "210px" }}>
        <Card.Img
          variant="top"
          src={data.images?.[0].url}
          style={{ height: "100%", objectFit: "contain" }}
        />
      </div>

      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Card.Title>{data.title}</Card.Title>
        <Card.Subtitle>{data.price}</Card.Subtitle>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Button
            onClick={() => navigate(`/articles/${data.id}`)}
            style={{ width: "44%" }}
            className="buthover"
          >
            <i className="bx bx-detail bx-sm"></i>
          </Button>
          <Button
            onClick={() => addCart(data.id)}
            style={{ width: "44%" }}
            className="buthover"
          >
            <i className="bx bxs-cart-alt bx-sm"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ArticleCard;
