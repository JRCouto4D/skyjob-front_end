/* eslint-disable no-nested-ternary */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';

import { formatPrice } from '../../../util/format';

import { Container, Content, TableItens } from './styles';

function Returns({ location }) {
  console.tron.log(location.state);
  const itens = location.state ? location.state.dataItens : [];
  const sale = location.state ? location.state.dataSale : null;

  const memoList = useMemo(() => {
    return (
      <TableItens>
        <li className="header">
          <strong>ID</strong>
          <strong>DESCRIÇÃO</strong>
          <strong>QUANTIDADE</strong>
          <strong>R$ VAREJO</strong>
          <strong>% DISCONTO</strong>
          <strong>R$ TOTAL</strong>
        </li>

        <div className="item-table">
          {itens.map((item) => (
            <li>
              <span>{item.id ? `#${item.id}` : ''}</span>
              <span>{item.product ? item.product.description : ''}</span>
              <span>{item.amount ? item.amount : ''}</span>
              <span>
                {item.retail_price ? formatPrice(item.retail_price) : ''}
              </span>
              <span>{item.discount}</span>
              <span>{item.total ? formatPrice(item.total) : ''}</span>
            </li>
          ))}
        </div>
      </TableItens>
    );
  }, [itens]);

  return (
    <Container>
      <Content>
        <header>
          <strong>DEVOLUÇÃO</strong>
          <h1>DE VENDAS</h1>
        </header>

        <div className="body">
          <div className="label-block">
            <strong>ID</strong>
            <span>{sale ? `#${sale.id}` : ''}</span>
          </div>

          <div className="label-block">
            <strong>TIPO:</strong>
            <span>
              {sale ? (sale.type_sale === 1 ? 'VAREJO' : 'ATACADO') : ''}
            </span>
          </div>

          <div className="label-block">
            <strong>CLIENTE:</strong>
            <span>{sale.customer ? sale.customer.name : ''}</span>
          </div>

          <div className="label-block">
            <strong>CPF/CNPJ</strong>
            <span>
              {sale.customer
                ? sale.customer.type === 1
                  ? sale.customer.cpf
                  : sale.customer.cnpj
                : ''}
            </span>
          </div>

          <div className="label-block">
            <strong>TOTAL</strong>
            <span>{sale ? formatPrice(sale.total) : ''}</span>
          </div>

          <div className="label-block">
            <strong>PAGAMENTO</strong>
            <span>
              {sale
                ? sale.payment === 2 && sale.installments
                  ? `CRÉDIDO (${sale.installments})`
                  : sale.payment === 1
                  ? 'À VISTA'
                  : sale.payment === 3
                  ? 'CARTÃO DÉBITO'
                  : ''
                : ''}
            </span>
          </div>

          <div className="label-block">
            <strong>DATA</strong>
            <span>
              {sale.complete_at
                ? format(parseISO(sale.complete_at), 'dd/MM/yyyy')
                : ''}
            </span>
          </div>

          <div className="label-block">
            <strong>HORÁRIO</strong>
            <span>
              {sale.complete_at
                ? format(parseISO(sale.complete_at), "HH: mm 'hs'")
                : ''}
            </span>
          </div>
        </div>

        <strong
          style={{
            marginTop: 15,
            marginBottom: 5,
            fontSize: 18,
            color: '#999',
            fontWeight: 'normal',
          }}
        >
          ITENS DA VENDA
        </strong>
        <hr />

        {memoList}

        <footer>
          <button type="button" className="cancel-button">
            CANCELAR
          </button>
          <button type="button" className="confirm-button">
            CONFIRMAR DEVOLUÇÃO
          </button>
        </footer>
      </Content>
    </Container>
  );
}

export default Returns;

Returns.propTypes = {
  location: PropTypes.shape(),
};

Returns.defaultProps = {
  location: null,
};
