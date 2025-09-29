import Image from 'next/image';
import styles from './styles.module.css';
import { Pokemon } from 'types';
import { AssetEndpoint } from 'constant';

const Item = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className={styles.item}>
      <p>{pokemon.name}</p>
      <Image
        src={`${AssetEndpoint}/${pokemon.number}.gif`}
        alt={pokemon.name}
        width={80}
        height={80}
        style={{ objectFit: 'contain' }}
      />
      <p>Number: {pokemon.number}</p>
    </div>
  );
};

export default Item;
