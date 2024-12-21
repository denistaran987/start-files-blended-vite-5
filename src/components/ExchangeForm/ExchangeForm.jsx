import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { useDispatch } from 'react-redux';
import { fetchExchangeInfo } from '../../redux/currency/operations';

const validation = /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/;

const ExchangeForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const inputValue = form.elements.exchange.value.trim();
    const isValidValue = validation.test(inputValue);
    if (!isValidValue) {
      return;
    }
    const [amount, from, , to] = inputValue.split(' ');
    const valuesObj = {
      to,
      from,
      amount,
    };
    dispatch(fetchExchangeInfo(valuesObj));

    console.log(valuesObj);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        name="exchange"
        title="Request format 15 USD in UAH"
        className={styles.input}
      />
    </form>
  );
};

export default ExchangeForm;
