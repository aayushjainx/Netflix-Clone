import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import db from '../backend/firebase';
import { selectUser } from '../features/userSlice';
import '../styles/PlanScreen.css';
import { loadStripe } from '@stripe/stripe-js';
import { active, selectSubscription } from '../features/subscriptionSlice';

function PlanScreen() {
  const [products, setProducts] = useState();
  const user = useSelector(selectUser);
  const activesubs = useSelector(selectSubscription);
  const [subscription, setSubscription] = useState(activesubs);
  const dispatch = useDispatch();

  useEffect(() => {
    setSubscription(activesubs);
  }, []);

  useEffect(() => {
    db.collection('products')
      .where('active', '==', true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection('prices').get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);
  console.log(products, 'products');
  console.log(activesubs, 'subscription');

  const loadCheckout = async (priceId) => {
    const docRef = await db.collection('customers').doc(user.uid).collection('checkout_sessions').add({
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          'pk_test_51IIAt8JUBUHH0gzZ1jPPMo67sPNb2RAsEiorSSkUjXge52nVAKOv6Ie9LTPezIuehyMGagVBKbnKGb1OLr7aFCHQ00AE7d0QDQ'
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className='planScreen'>
      <br />
      {activesubs && <p>Renewal Date: {new Date(activesubs?.current_period_end * 1000).toLocaleDateString()}</p>}
      {products
        ? Object.entries(products).map(([productId, productData]) => {
            const isCurrPackage = productData.name?.toLowerCase().includes(activesubs?.role);
            return (
              <div
                className={`${isCurrPackage && 'plansScreen__plan--disabled'} plansScreen__plan`}
                key={productId}>
                <div className='planScreen__info'>
                  <h5>{productData.name}</h5>
                  <h6>{productData.description}</h6>
                </div>
                <button onClick={() => !isCurrPackage && loadCheckout(productData.prices.priceId)}>
                  {isCurrPackage ? 'Current Package' : 'Subscribe'}
                </button>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default PlanScreen;
