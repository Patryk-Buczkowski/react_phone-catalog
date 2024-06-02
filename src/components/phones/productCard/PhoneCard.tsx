import React from 'react';
import styles from './PhoneCard.module.scss';
import { Phone } from '../../types/Phone';

interface Props {
  product: Phone;
  discount?: boolean;
}

export const PhoneCard: React.FC<Props> = ({ product, discount }) => {
  const {
    capacity,
    priceDiscount,
    name,
    priceRegular,
    ram,
    screen,
    images
  } = product;
  console.log(images)

  return (
    <div className={styles['productCard']}>
      <img
        className={styles['productCard__picture']}
        src={`./${product.images[0]}`}
      />
      <p className={styles['productCard__product_name']}>{name}</p>
      {discount ? (
        <>
          <div className={styles['productCard__container']}>
            <span className={styles['productCard__container__price']}>${priceDiscount}</span>
            <span className={styles['productCard__container__price__reduce']}>${priceRegular}</span>
          </div>
        </>
      ) : (
        <div className={styles['productCard__container']}>
            <span className={styles['productCard__container__price']}>${priceRegular}</span>
            <span className={styles['productCard__container__price__empty']}></span>
          </div>
      )}

      <div className={styles['productCard__separator']}></div>

      <div className={styles['productCard__description']}>
        <p className={styles['productCard__description__paragraph']}>
          <span className={styles['productCard__description__paragraph__name']}>
            Screen
          </span>
          <span
            className={styles['productCard__description__paragraph__value']}
          >
            {screen}
          </span>
        </p>

        <p className={styles['productCard__description__paragraph']}>
          <span className={styles['productCard__description__paragraph__name']}>
            Capacity
          </span>
          <span
            className={styles['productCard__description__paragraph__value']}
          >
            {capacity}
          </span>
        </p>

        <p className={styles['productCard__description__paragraph']}>
          <span className={styles['productCard__description__paragraph__name']}>
            RAM
          </span>
          <span
            className={styles['productCard__description__paragraph__value']}
          >
            {ram}
          </span>
        </p>
      </div>

      <div className={styles['productCard__buttons']}>
        <div className={styles['productCard__buttons__add']}>Add to cart</div>
        <div className={styles['productCard__buttons__fav']}></div>
      </div>
    </div>
  );
};
