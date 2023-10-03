import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPurchase } from '../store/slices/purchasesSlide';

const Purchases = () => {
  const purchasesList = useSelector(state => state.purchases);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPurchase());
  }, [dispatch]);

  return (
    <main style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
      <h1
      style={{marginTop:"20px",
            width:"100%",
            backgroundColor:"#25496d",
            color:"white",
            padding:"5px",
            marginBottom:"20px"}}>Purchases</h1>
      <ul
      style={{display:"flex",
              flexDirection:"column",
              gap:"20px"}}>
        {purchasesList.map(article => (
          <li key={article.id}
          style={{display:"flex",
                  gap:"5px",
                  border:"2px solid",
                  padding:"10px",
                  maxHeight:"210px"}}>
            <div
            className='purchaseImgSection'>
              <img src={article.product.images?.[0].url}/>
            </div>
            
            <div
            style={{display:"flex",
                    justifyContent:"space-evenly",
                    alignItems:"center",
                    gap:"10px",
                    width:"100%"}}
            className='purchaseCard'>
                <h3>{article.product?.title}</h3>
                <h3 style={{textAlign:"center"}}>{article.product?.price}</h3>
                <h3 style={{textAlign:"center"}}>quantity: {article.quantity}</h3>
            </div>
          </li>
          
          
        ))}
      </ul>
    </main>
  );
};

export default Purchases;
