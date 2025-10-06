import { useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";

import { useCart } from '../../../hooks/CartContext.jsx'
import '../../Stripe/style.css'
import { api } from '../../../services/api.js'
import { toast } from "react-toastify";

export default function CheckoutForm() {
    const { cartProducts, clearCart } = useCart()
    const navigate = useNavigate()

    const stripe = useStripe();
    const elements = useElements();
    const { state: { dpmCheckerLink } } = useLocation()

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error('Stripe ou Elements com falha, Tente Novamente!')
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
            confirmParams: {

                return_url: "http://localhost:3000/complete",
            },
        });

        if (error) {
            setMessage(error.message);
            toast.error(error.message)
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {

            const products = cartProducts.map((product) => {
                return { id: product.id, quantity: product.quantity, price: product.price }
            })

            try {
                const { status } = await api.post(
                    '/orders', { products }, {
                    validateStatus: () => true
                }
                )

                if (status === 200 || status === 201) {


                    setTimeout(() => {
                        navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`)
                        clearCart()
                    }, 2000)

                    toast.success('Pedido Realizado com Sucesso')
                } else if (status === 409) {
                    toast.error('Falha ao realizar seu pedido')
                } else {
                    throw new Error()
                }
            } catch (err) {
                toast.error('Falha no Sistema! Tente Novamente')
            }
        } else {
            navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`)
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "accordion"
    }

    return (
        <div className="container">
            <form id="payment-form" onSubmit={handleSubmit}>

                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button disabled={isLoading || !stripe || !elements} id="submit" className="button">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pagar Agora"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
}
