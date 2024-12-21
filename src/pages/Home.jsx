import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import ExchangeForm from '../components/ExchangeForm/ExchangeForm';
import ExchangeInfo from '../components/ExchangeInfo/ExchangeInfo';
import { useSelector } from 'react-redux';
import {
  selectExchangeInfo,
  selectIsLoading,
} from '../redux/currency/selectors';
import Loader from '../components/Loader/Loader';

const Home = () => {
  const isError = false;
  const exchangeInfo = useSelector(selectExchangeInfo);
  const isLoading = useSelector(selectIsLoading);

  return (
    <Section>
      <Container>
        <Heading info title="What currencies do you want to exchange?🙂" />
        <ExchangeForm />
        {exchangeInfo && <ExchangeInfo />}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}
        {isLoading && <Loader />}
      </Container>
    </Section>
  );
};

export default Home;
