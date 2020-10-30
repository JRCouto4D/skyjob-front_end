import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MdDone } from 'react-icons/md';

import BoxPDV from '../../../../components/Box_point-sale';
import BoxItens from '../../../../components/Box_itens-sales2';
import BoxSetCustomer from '../../../../components/Box-set_customer';
import Payment1 from '../../../../components/Payment1';

import { completeToSaleRequest } from '../../../../store/module/sale/actions';

import {
  Container,
  BoxLeft,
  Content,
  OptionButton,
  PaymentSelect,
  Payment2,
  Payment3,
  Footer,
  BoxRight,
} from './styles';

function Payment() {
  const { dataSale } = useSelector((state) => state.saleData);
  const dispatch = useDispatch();

  const [customer, setCustomer] = useState(false);
  const [infoTrue, setInfoTrue] = useState(false);
  const [infoFalse, setInfoFalse] = useState(true);
  const [animation, setAnimation] = useState(0);
  const [installments, setInstallments] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState({
    id: 1,
    label: 'AVISTA',
  });

  const payment = [
    {
      id: 1,
      label: 'AVISTA',
    },
    {
      id: 2,
      label: 'CARTÃO CRÉDITO',
    },
    {
      id: 3,
      label: 'CARTÃO DÉBITO',
    },
  ];

  function handleInfoTrue() {
    setInfoTrue(true);
    setInfoFalse(false);
    setCustomer(true);
    setAnimation(0);
  }

  function handleInfoFalse() {
    setInfoFalse(true);
    setInfoTrue(false);
    setCustomer(false);
    setAnimation(0);
  }

  const renderSetCustomer = useMemo(
    () => (
      <BoxSetCustomer
        handleInfoFalse={() => handleInfoFalse()}
        animation={animation}
        setAnimation={() => {
          setAnimation(1);
        }}
      />
    ),
    [animation]
  );

  const renderPayment = useMemo(() => {
    if (selectedPayment.id === 1) {
      return (
        <Payment1>
          <strong>VALOR PAGO</strong>

          <div className="box-money" />
        </Payment1>
      );
    }

    if (selectedPayment.id === 2) {
      return (
        <Payment2>
          <h1>Payment 2</h1>
        </Payment2>
      );
    }

    if (selectedPayment.id === 3) {
      return (
        <Payment3>
          <h1>Payment 3</h1>
        </Payment3>
      );
    }
    return this;
  }, [selectedPayment]);

  function completeToSale() {
    const data = {
      payment: selectedPayment.id,
      sale_id: dataSale.id,
      installments,
    };

    confirmAlert({
      title: 'COMPLETAR A VENDA',
      message: 'DESEJA REALMENTE COMPLETAR A VENDA?',
      buttons: [
        {
          label: 'SIM',
          onClick: async () => {
            dispatch(completeToSaleRequest(data));
          },
        },
        {
          label: 'NÃO',
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <BoxPDV poup>
      <Container>
        <BoxLeft>
          <Content>
            <div className="box-info-customers">
              <h2>INFORMAR CLIENTE ?</h2>
              <div className="box-options">
                <OptionButton
                  type="button"
                  className="option-block"
                  poup={infoTrue}
                  onClick={handleInfoTrue}
                >
                  <div className="option-container">
                    <div className="option-content" />
                  </div>
                  <strong>SIM</strong>
                </OptionButton>

                <OptionButton
                  type="button"
                  className="option-block"
                  poup={infoFalse}
                  onClick={handleInfoFalse}
                >
                  <div className="option-container">
                    <div className="option-content" />
                  </div>
                  <strong>NÃO</strong>
                </OptionButton>
              </div>
            </div>

            <div className="box-payment">
              <strong>FORMA DE PAGAMENTO:</strong>
              <PaymentSelect
                value={selectedPayment}
                options={payment}
                getOptionValue={(op) => op.id}
                getOptionLabel={(op) => op.label}
                onChange={(value) => {
                  setSelectedPayment({
                    id: value.id,
                    label: value.label,
                  });
                }}
              />
            </div>

            {renderPayment}
          </Content>

          <Footer>
            <button type="button" onClick={completeToSale}>
              <strong>CONFIRMAR PAGAMENTO</strong>
              <MdDone color="#fff" size={25} />
            </button>
          </Footer>

          {customer && renderSetCustomer}
        </BoxLeft>
        <BoxRight>
          <BoxItens />
        </BoxRight>
      </Container>
    </BoxPDV>
  );
}

export default Payment;