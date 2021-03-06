import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MdForward } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';

import api from '../../../services/api';
import history from '../../../services/history';

import { formatPrice } from '../../../util/format';

import left from '../../../assets/left.png';

import { Container, Content, Loading } from './styles';

function Reinforcement() {
  const { pdv } = useSelector((state) => state.statusPDV);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [inputData, setInputData] = useState('');

  function handleReinforcement() {
    try {
      if (inputData === '') {
        toast.error('INFORME O VALOR À SER INCLUÍDO DO CAIXA.');
        setErr(true);
        const inputMoney = document.getElementById('money');
        const boxInput = document.getElementById('box-input');
        inputMoney.focus();
        boxInput.style.borderColor = '#FF1E40';
        return;
      }

      confirmAlert({
        title: 'CONFIRMAR REFORÇO',
        message: `DESEJA REALMENTE INCLUIR O VALOR DE ${formatPrice(
          inputData
        )} NO CAIXA ${pdv.cash_register.description}?`,
        buttons: [
          {
            label: 'SIM',
            onClick: async () => {
              setLoading(true);

              await api.post('/point_sales/reinforcement', {
                point_sale_id: pdv.id,
                cash_value: inputData,
              });

              toast.success('OPERAÇÃO REALIZADA COM SUCESSO!');
              setInputData('');
              setLoading(false);
            },
          },
          {
            label: 'NÃO',
            onClick: () => {},
          },
        ],
      });
    } catch (error) {
      toast.error(
        `ALGO DEU ERRADO, POR FAVOR TENTE MAIS TARDE. ERRO: ${error}`
      );
      history.push('/operations');
    }
  }

  return (
    <Container>
      <Content>
        <header />
        <footer>
          <div className="box-body">
            <div className="box-left">
              {err ? (
                <strong style={{ color: '#FF1E40' }}>
                  VALOR EM DINHEIRO *
                </strong>
              ) : (
                <strong>VALOR EM DINHEIRO</strong>
              )}
              <div className="box-input" id="box-input" name="box-input">
                <strong>R$</strong>
                <Input
                  type="number"
                  id="money"
                  name="money"
                  placeholder="0.00"
                  value={inputData}
                  onChange={(e) => {
                    setInputData(e.target.value);
                    setErr(false);
                    const boxInput = document.getElementById('box-input');
                    boxInput.style.borderColor = '#ccc';
                  }}
                />
              </div>
            </div>

            <img src={left} alt="left" />

            <div className="box-label">
              <strong>REFORÇO NO CAIXA</strong>
              <span>DIGITE O VALOR QUE SERÁ INCLUÍDO DO CAIXA</span>
            </div>
          </div>

          <button type="button" onClick={handleReinforcement}>
            {loading ? (
              <Loading>
                <FaSpinner color="#fff" size={20} />
              </Loading>
            ) : (
              <>
                <MdForward size={45} color="#fff" />
                <strong>CONFIMAR REFORÇO</strong>
              </>
            )}
          </button>
        </footer>
      </Content>
    </Container>
  );
}

export default Reinforcement;
