'use client';

import Item from './Item';
import styles from './styles.module.css';
import { useState } from 'react';

type Props = {
  defaultActiveList: string[];
  list: string[];
  onChange: (activeList: string[]) => void;
};

const ListType = ({ defaultActiveList, list, onChange }: Props) => {
  const [active, setActive] = useState(defaultActiveList);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Type: </div>
      {list.map((item) => (
        <Item
          key={item}
          name={item}
          active={active.includes(item)}
          toggle={() => {
            setActive((prev) => {
              const newActive = [...prev];
              if (prev.includes(item)) {
                newActive.splice(newActive.indexOf(item), 1);
              } else {
                newActive.push(item);
              }
              onChange(newActive);
              return newActive;
            });
          }}
        />
      ))}
    </div>
  );
};

export default ListType;
