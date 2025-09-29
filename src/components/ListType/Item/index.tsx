import styles from './styles.module.css';
import clsx from 'clsx';

type Props = {
  name: string;
  active: boolean;
  toggle: (item: string) => void;
};

const Item = ({ name, active, toggle }: Props) => {
  return (
    <div
      className={clsx(styles.item, active && styles.active)}
      onClick={() => toggle(name)}
    >
      {name}
    </div>
  );
};

export default Item;
