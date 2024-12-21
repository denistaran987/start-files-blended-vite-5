import { useDispatch, useSelector } from 'react-redux';
import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import { useEffect } from 'react';
import { fetchRates } from '.././redux/currency/operations.js';
import { Wave } from 'react-animated-text';
import { selectRates } from '../redux/currency/selectors.js';

const Rates = () => {
  const dispatch = useDispatch();
  const rates = useSelector(selectRates);
  const isError = false;
  useEffect(() => {
    dispatch(fetchRates());
  }, [dispatch]);

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${'UAH'} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;
