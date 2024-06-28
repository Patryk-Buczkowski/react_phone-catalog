import { useContext, useEffect, useMemo } from 'react';
import { ContextApp } from '../../appContext/AppContext';
import Styles from './Phones.module.scss';
import { Pagination } from '../../pagination';
import { sortBy } from '../../functions/sortBy';
import { SortBy } from '../../types/SortBy';
import { Skeleton } from '../../skeletons/Skelton.tsx';
import { ProductCard } from '../productCard';
import { Crumbs } from '../breadCrumbs/Crumbs';

export const Phones: React.FC = () => {
  const {
    phonesTotalNumber,
    searchParams,
    setSearchParams,
    itemsPerPage,
    activePage,
    setActivePage,
    setItemsPerPage,
    products,
    phones,
    isLoadingPhones,
    selectedOption,
    setSelectedOption,
  } = useContext(ContextApp);

  // const [selectedOption, setSelectedOption] = useState<SortBy>('newest');

  const sortedPhones = sortBy(products, phones, selectedOption);

  const pagesTotalNumber = useMemo(() => {
    if (itemsPerPage === 'all') {
      return 1;
    }
    return Math.ceil(phonesTotalNumber / +itemsPerPage);
  }, [phonesTotalNumber, itemsPerPage]);

  const startFromElement = +itemsPerPage * activePage - +itemsPerPage;
  const endOnElement = Math.min(+itemsPerPage * activePage, phonesTotalNumber);

  const phonesOnPage =
    itemsPerPage === 'all'
      ? sortedPhones
      : sortedPhones.slice(startFromElement, endOnElement);

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value as SortBy);
    const getSortBy= searchParams.get('sortBY');

    searchParams.set('sortBy', selectedOption);

    if (getSortBy === 'newest') {
      searchParams.delete('sortBy')
    }
    setSearchParams(new URLSearchParams(searchParams));
  };

  const handleChangeItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(e.target.value);
    setActivePage(1);
    searchParams.set('perPage', itemsPerPage);
    searchParams.set('page', '1');
    setSearchParams(new URLSearchParams(searchParams));
  };

  const handlePageChange = (number: number) => {
    setActivePage(number);

    searchParams.set('page', activePage.toString());
    setSearchParams(new URLSearchParams(searchParams));
  };

  useEffect(() => {
    searchParams.set('sortBy', selectedOption);
    searchParams.set('perPage', itemsPerPage);
    searchParams.set('page', activePage.toString());
    console.log('activePage', activePage)
    setSearchParams(new URLSearchParams(searchParams))
  }, [itemsPerPage, activePage, selectedOption]);

  console.log('hej', searchParams.toString());



  return (
    <div className={Styles['phones']}>
      {isLoadingPhones && <Skeleton />}

      {!isLoadingPhones && (
        <>
          <Crumbs path={['phones']} />

          <div className={Styles['phones__head']}>
            <h1 className={Styles['phones__head__title']}>Mobile phones</h1>
            <p className={Styles['phones__head__paragraph']}>
              {phonesTotalNumber} models
            </p>
          </div>
          <div className={Styles['phones__filters']}>
            <div className={Styles['phones__filters__sort']}>
              <p className={Styles['phones__filters__sort__paragraph']}>
                Sort by
              </p>

              <select
                className={Styles['phones__filters__sort__select']}
                value={selectedOption}
                onChange={handleChangeSort}
              >
                <option value="newest">Newest</option>
                <option value="alphabetical">Alphabetically</option>
                <option value="cheapest">Cheapest</option>
              </select>
            </div>

            <div className={Styles['phones__filters__items']}>
              <p className={Styles['phones__filters__items__paragraph']}>
                Items on page
              </p>

              <select
                className={Styles['phones__filters__items__select']}
                value={itemsPerPage}
                onChange={handleChangeItems}
              >
                <option value="all">All</option>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
              </select>
            </div>
          </div>
          <div className={Styles['phones__container']}>
            {phonesOnPage.map(phone => {
              return (
                <ProductCard key={phone.id} type={'phones'} product={phone} />
              );
            })}
          </div>
          <div className={Styles['phones__choose_page']}>
            <Pagination
              pagesTotalNumber={pagesTotalNumber}
              activePage={activePage}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};
