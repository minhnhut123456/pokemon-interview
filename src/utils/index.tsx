import axios from 'axios';
import { ApiEndpoint, PageSize } from '../constant';
import { Pokemon, RawPokemon } from '../types';

const api = axios.create({
  baseURL: ApiEndpoint,
  timeout: 20000,
});

export function parseNumber(value: string) {
  if (value.trim() !== '') {
    const n = Number(value);
    return !isNaN(n) ? n : null;
  }
  return null;
}

export function transformRawPokemon(rawPokemon: RawPokemon): Pokemon {
  const url = new URL(rawPokemon.url);
  const urlArr = url.pathname.split('/');
  const number = urlArr[urlArr.length - 2];

  return {
    name: rawPokemon.name,
    number: number || '',
  };
}

export const getAllType = async () => {
  const res = await api.get<{ results: { name: string; url: string }[] }>('/type');
  return res.data;
};

export const getPokemonListWithoutType = async ({ page }: { page: number }) => {
  try {
    const res = await api.get<{ results: RawPokemon[]; count: number }>(
      `/pokemon?limit=${PageSize}&offset=${PageSize * (page - 1)}`
    );
    if (res?.data?.results) {
      return {
        data: res.data.results.map(transformRawPokemon),
        total: res.data.count || 0,
      };
    }
    return {
      data: [],
      total: 0,
    };
  } catch (error) {
    console.error(error);
    return {
      data: [],
      total: 0,
    };
  }
};

export const getPokemonListWithTypes = async ({
  page,
  typeList,
}: {
  page: number;
  typeList: { name: string; url: string }[];
}) => {
  try {
    const promises = typeList.map((type) =>
      api.get<{ pokemon: { pokemon: RawPokemon }[]; name: string }>(`/type/${type.name}`)
    );
    const rawList = (await Promise.allSettled(promises))
      .filter((result) => result.status === 'fulfilled')
      .map((result) => ({
        pokemonList: result.value?.data?.pokemon.map((item) =>
          transformRawPokemon(item.pokemon)
        ),
        type: result.value?.data?.name,
      }));

    if (rawList.length === 0) {
      return {
        data: [],
        total: 0,
      };
    }

    if (rawList.length === 1) {
      return {
        data: rawList[0].pokemonList.slice((page - 1) * PageSize, page * PageSize),
        total: rawList[0].pokemonList.length,
      };
    }

    // In case we have more than one type, we must consider every pair (because every pokemon can have maximum 2 types),
    // and generate intersection for every pair, after that join these intersection to get final list
    const allIntersections: Pokemon[] = [];
    for (let i = 0; i < rawList.length; i++) {
      for (let j = i + 1; j < rawList.length; j++) {
        const a = rawList[i];
        const b = rawList[j];

        const bNumbers = new Set(b.pokemonList.map((p) => p.number));
        const intersection = a.pokemonList.filter((p) => bNumbers.has(p.number));

        allIntersections.push(...intersection);
      }
    }

    return {
      data: allIntersections.slice((page - 1) * PageSize, page * PageSize),
      total: allIntersections.length,
    };
  } catch (error) {
    console.error(error);
    return {
      data: [],
      total: 0,
    };
  }
};
