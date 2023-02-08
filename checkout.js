import { loadStripe } from "@stripe/stripe-js";

export async function checkout({lineItems}){
    let stripePromise = null
    const getStripe = () =>{
        if(!stripePromise){
            stripePromise = loadStripe("pk_test_51MKflbE5dAr2BYachC9mdlclv0BJKE7FYyRHpagOwZWpEamwFMDVzq1yytbxT4fNLE7FUTEGGirsdPDwboLxztYV00d8HaNdGx")
        }
        return stripePromise
    }
    const stripe =await getStripe()

    await stripe.redirectToCheckout({
        mode:'subscription',
        lineItems,
        successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: window.location.origin
    })
}