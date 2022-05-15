import styles from "./styles.module.scss";
import {getStripe} from "../../services/stripejs.service";
import {api} from "../../services/api.service";

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {

    async function handleSubscribe() {
        try {
            const response = await api.post('/subscribe');
            const { sessionId } = response.data;

            const stripe = await getStripe();
            await stripe.redirectToCheckout({ sessionId });
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Inscreva-se agora
        </button>
    )
}