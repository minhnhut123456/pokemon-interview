'use client';

import { Row, Col } from 'react-grid-system';
import Item from './Item';
import { Pokemon } from 'types';
import styles from './styles.module.css';
import clsx from 'clsx';
import { PageSize } from 'constant';

type Props = {
  list: Pokemon[];
  page: number;
  total: number;
  onChangePage: (page: number) => void;
};

const ListPokemon = ({ list, page, total, onChangePage }: Props) => {
  const maxItem = page * PageSize;
  const hasMore = list.length >= PageSize && maxItem < total;

  return (
    <div>
      <Row gutterWidth={24}>
        {list.map((pokemon) => (
          <Col key={pokemon.number} sm={4} md={3} lg={2} style={{ marginBottom: 24 }}>
            <Item pokemon={pokemon} />
          </Col>
        ))}
      </Row>

      <div className={styles.pagination}>
        {page > 1 && (
          <button onClick={() => onChangePage(page - 1)} className={clsx(styles.button)}>
            Previous
          </button>
        )}

        {hasMore && (
          <button onClick={() => onChangePage(page + 1)} className={clsx(styles.button)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ListPokemon;
