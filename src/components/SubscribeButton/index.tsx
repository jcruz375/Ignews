import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string;
}

interface SubscriptionData{
  sessionId: string;
}

export function SubscribeButton({priceId}: SubscribeButtonProps) {
  const [session] = useSession();
  const router = useRouter();

  async function handleSubscripe(){
    if(!session) {
      signIn('github');
      return;
    };

    if(session.activeSubscription) {
      router.push('/posts');
      return;
    };

    try {
      const response = await api.post<SubscriptionData>('/subscribe');

      const {sessionId} = response.data;

      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({sessionId});
    } catch (err) {
      alert('erro no pagamento')
      console.log(err.message);
    }
  }
  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscripe}
    >
      Subscribe now
    </button>
  )
}