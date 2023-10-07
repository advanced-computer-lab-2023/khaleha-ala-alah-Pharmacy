import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import axios from 'axios';

import { setPageData, updatePageDada } from '../redux/page-data/actions';

import { IPageData } from '../interfaces/page';

export function usePageData(pageData: IPageData) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageData({ ...pageData, loaded: true }));
  }, [pageData, dispatch]);
}

export function useFetchPageData<T>(
  url: string,
  initialState: T = null,
  callback?: (T) => any
): [T, (data: T) => void] {
  const [data, setData] = useState<T>(initialState);
  const dispatch = useDispatch();

  async function getData() {
    const result = await axios.get(url);
    return result.data;
  }

  useEffect(() => {
    getData()
      .then((data) => {
        if (callback) {
          callback(data);
        }

        setTimeout(() => dispatch(updatePageDada({ fulFilled: true, loaded: true })), 300);

        setData(data);
      })
      .catch(console.error);
  }, [url, dispatch]);

  return [data, setData];
}
