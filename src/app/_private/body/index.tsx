'use client';

import styles from './styles.module.css';
import ListType from 'components/ListType';
import ListPokemon from 'components/ListPokemon';
import { Pokemon } from 'types';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import PageLoading from 'components/PageLoading';

type Props = {
  typeList: string[];
  pokemonList: Pokemon[];
  defaultTypeActiveList: string[];
  defaultPage: number;
  total: number;
};

const Body = ({
  typeList,
  pokemonList,
  defaultTypeActiveList,
  defaultPage = 1,
  total,
}: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // When type change, reset page to 1
  const handleTypeChange = (activeList: string[]) => {
    const params = new URLSearchParams();
    params.set('page', String(1));

    if (activeList.length > 0) {
      params.set('type', activeList.join(','));
    }

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', String(page));

    if (defaultTypeActiveList.length > 0) {
      params.set('type', defaultTypeActiveList.join(','));
    }

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  return (
    <div className={styles.container}>
      {isPending && <PageLoading />}
      <p className={styles.title}>Welcome to Pokemon world</p>
      <p className={styles.total}>Total count: {total}</p>
      <ListType
        defaultActiveList={defaultTypeActiveList}
        list={typeList}
        onChange={handleTypeChange}
      />
      <ListPokemon
        list={pokemonList}
        total={total}
        page={defaultPage}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default Body;
