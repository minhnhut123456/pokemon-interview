import {
  getAllType,
  getPokemonListWithoutType,
  getPokemonListWithTypes,
  parseNumber,
} from 'utils';
import { Pokemon } from 'types';
import Body from './_private/body';

interface PageProps {
  searchParams?: Promise<{ [key: string]: string }>;
}

const Index = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  // Safe parse type
  const typeParam = (() => {
    try {
      if (!params?.type) return [];
      if (Array.isArray(params.type)) {
        return params.type.flatMap((t) => t.split(','));
      }
      return params.type.split(',');
    } catch {
      return [];
    }
  })();
  const allType = (await getAllType())?.results;
  const activeTypeList = allType?.filter((type) => typeParam.includes(type.name));

  // Safe parse page
  let page = parseNumber(params?.page || '1');
  if (!page || page < 1) {
    page = 1;
  }

  // Get pokemon list
  let pokemonList: Pokemon[] = [];
  let total = 0;

  // We divide two case: have type filter or not because logic is different
  if (activeTypeList?.length > 0) {
    const result = await getPokemonListWithTypes({ page, typeList: activeTypeList });
    pokemonList = result.data;
    total = result.total;
  } else {
    const result = await getPokemonListWithoutType({ page });
    pokemonList = result.data;
    total = result.total;
  }

  return (
    <Body
      typeList={allType?.map((t) => t.name) || []}
      pokemonList={pokemonList}
      defaultTypeActiveList={activeTypeList?.map((t) => t.name) || []}
      defaultPage={page}
      total={total}
    />
  );
};

export default Index;
