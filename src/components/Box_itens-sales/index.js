/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MdDeleteForever, MdCreate, MdForward, MdReply } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { formatPrice } from '../../util/format';

import {
  resetDataSale,
  removeToItemRequest,
} from '../../store/module/sale/actions';

import api from '../../services/api';

import { Container, ButttonGoPayment, Loading } from './styles';

function BoxItensSale({ button }) {
  const { dataSale, itens } = useSelector((state) => state.saleData);
  const { company } = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  async function deleteToItem(id) {
    confirmAlert({
      title: 'REMOVER ITEM',
      message: '  DESEJA REALMENTE REMOVER ESTE ITEM?',
      buttons: [
        {
          label: 'SIM',
          onClick: () => {
            dispatch(removeToItemRequest(id));
          },
        },
        {
          label: 'NÃO',
          onClick: () => {},
        },
      ],
    });
  }

  async function deleteSale() {
    confirmAlert({
      title: 'Cancelar Venda',
      message: 'Deseja realmente cancelar esta venda?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            await api.delete(
              `company/${company.id}/point_sales/${dataSale.point_sale_id}`
            );

            dispatch(resetDataSale());
          },
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <Container>
      <div className="box-top">
        <header>
          <div className="header-box-left">
            <strong>VENDA:</strong>
            <span>{dataSale ? `#${dataSale.id}` : ''}</span>
          </div>

          <button type="button" onClick={deleteSale}>
            <MdDeleteForever size={25} color="#f0f0f0" />
          </button>
        </header>

        {itens.loading ? (
          <Loading>
            <FaSpinner color="#ab0000" size={20} />
          </Loading>
        ) : (
          <main>
            <ul>
              {itens.dataItem.length >= 1 &&
                itens.dataItem.map((item) => (
                  <li>
                    <div className="box-item-description">
                      <span>
                        {item.amount && item.product
                          ? `${item.amount}X  #${item.product.id}`
                          : ''}
                      </span>

                      <div>
                        <strong>
                          {item.product
                            ? item.product.description.length > 22
                              ? `${item.product.description
                                  .toUpperCase()
                                  .substr(0, 22)}...`
                              : item.product.description.toUpperCase()
                            : ''}
                        </strong>

                        <span>
                          {item.discount ? `${item.discount}% DESC` : ''}
                        </span>
                      </div>
                    </div>

                    <div className="box-item-price">
                      <span>
                        {item.product
                          ? formatPrice(item.product.retail_price)
                          : 'R$0,00'}
                      </span>

                      <strong>
                        {item.total ? formatPrice(item.total) : 'R$0,00'}
                      </strong>
                    </div>

                    <div className="box-item-actions">
                      <button type="button">
                        <MdCreate size={20} color="#333" />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteToItem(item.id)}
                      >
                        <MdDeleteForever size={20} color="#ff0f0f" />
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </main>
        )}
      </div>

      <footer>
        <div className="box-subtotal">
          <div className="subtotal-box-left">
            <div className="label-block">
              <strong>SUBTOTAL:</strong>
              <span>R$320,00</span>
            </div>

            <div className="label-block">
              <strong>DESCONTO:</strong>
              <span>0,00%</span>
            </div>
          </div>

          <div className="subtotal-box-right">
            <strong>TOTAL A PAGAR</strong>
            <span>R$320,00</span>
          </div>
        </div>

        {button === 0 ? (
          <ButttonGoPayment type="button" color="#8bc53d" fontSize={25}>
            <MdForward size={40} color="#fff" />
            <strong>RECEBER COMPRA</strong>
          </ButttonGoPayment>
        ) : (
          <ButttonGoPayment type="button" color="#00bfdd" fontSize={18}>
            <MdReply size={40} color="#fff" />
            <strong>CONTINUAR COMPRANDO</strong>
          </ButttonGoPayment>
        )}
      </footer>
    </Container>
  );
}

export default BoxItensSale;

BoxItensSale.propTypes = {
  button: PropTypes.number,
};

BoxItensSale.defaultProps = {
  button: 0,
};
